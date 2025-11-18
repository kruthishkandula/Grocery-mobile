import Alert from '@/components/molecule/Alert';
import AnimatedSplash from '@/components/molecule/AnimatedSplash';
import { AuthProvider } from '@/context/AuthContext';
import { local_storage } from '@/storage';
import { persistor_list, SPLASH_SCREEN_TIMEOUT } from '@/utility/config';
import { ToastProvider } from '@atom';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { LogBox, Platform, StyleSheet } from 'react-native';
import { ClickOutsideProvider } from 'react-native-click-outside';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from '../navigation/RootNavigator';

// Only prevent auto hide on native platforms
if (Platform.OS !== 'web') {
    SplashScreen.preventAutoHideAsync();
}

export default function Base() {
    const [isSplashFinished, setIsSplashFinished] = useState(Platform.OS === 'web');
    const [isAppReady, setIsAppReady] = useState(Platform.OS === 'web');

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000,
                gcTime: 10 * 60 * 1000,
            },
            mutations: {
                retry: 1,
            },
        },
        queryCache: new QueryCache({
            onError: (error) => {
                console.error('Error in query:', error);
            },
        }),
        mutationCache: new MutationCache({
            onError: (error) => {
                console.error('Error in mutation:', error);
            },
        }),
    });

    const asyncStoragePersister = createAsyncStoragePersister({
        storage: local_storage,
        key: 'GROCERYPLUS_QUERY_CACHE',
    });

    // Improved safe wrapper: validate raw storage value, parse safely, and remove corrupted data
    const safeAsyncStoragePersister = {
        ...asyncStoragePersister,
        restoreClient: async () => {
            const key = 'GROCERYPLUS_QUERY_CACHE';
            try {
                // Read raw value directly from storage to inspect it
                const raw = await local_storage.getItem?.(key);

                if (raw == null) {
                    return undefined;
                }

                // If storage returned a non-string (some wrappers accidentally return objects),
                // treat it as corrupted and remove it.
                if (typeof raw !== 'string') {
                    console.warn('[Persist] persisted value is not a string — removing', raw);
                    await local_storage.removeItem?.(key);
                    return undefined;
                }

                // Quick sanity check: JSON should start with '{' or '[' or '"'
                const first = raw.trim()[0];
                if (!['{', '[', '"'].includes(first)) {
                    console.warn('[Persist] persisted value does not look like JSON — removing, first char:', first);
                    await local_storage.removeItem?.(key);
                    return undefined;
                }

                // Parse safely; if this throws, handle below and remove the corrupted key
                const parsed = JSON.parse(raw);
                return parsed;
            } catch (err) {
                console.warn('[Persist] restore failed — clearing persisted cache', err);
                try {
                    await local_storage.removeItem?.('GROCERYPLUS_QUERY_CACHE');
                } catch (removeErr) {
                    console.warn('[Persist] remove failed', removeErr);
                }
                return undefined;
            }
        },
        // Ensure removeClient exists and delegates to your storage API
        removeClient: async () => {
            try {
                await local_storage.removeItem?.('GROCERYPLUS_QUERY_CACHE');
            } catch (err) {
                console.warn('[Persist] removeClient failed', err);
            }
        },
    };

    useEffect(() => {
        if (Platform.OS === 'web') {
            return;
        }

        async function prepare() {
            try {
                await new Promise(resolve => setTimeout(resolve, SPLASH_SCREEN_TIMEOUT));
                setIsSplashFinished(true);
            } catch (e) {
                console.warn(e);
            } finally {
                setIsAppReady(true);
            }
        }

        prepare();
    }, []);

    useEffect(() => {
        console.log('[APP] Root layout mounted - startup complete');
    }, []);

    if (!isSplashFinished || !isAppReady) {
        return Platform.OS === 'web' ? null : <AnimatedSplash />;
    }

    // to ignore warnings
    LogBox.ignoreAllLogs();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <PersistQueryClientProvider
                    client={queryClient}
                    persistOptions={{
                        persister: safeAsyncStoragePersister,
                        dehydrateOptions: {
                            shouldDehydrateQuery: query =>
                                persistor_list.includes(query.queryKey[0] as string),
                        },
                    }}>
                    <AuthProvider>
                        <ToastProvider>
                            <ClickOutsideProvider>
                                <RootNavigator />
                            </ClickOutsideProvider>
                            <Alert />
                        </ToastProvider>
                    </AuthProvider>
                </PersistQueryClientProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}


const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        backgroundColor: '#d9f99d',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
    },
    logo: {
        width: 250,
        height: 250,
        borderRadius: 20,
    },
    appContainer: {
        flex: 1,
        backgroundColor: '#f0f4f7',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    appText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    appSubText: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
    },
});
