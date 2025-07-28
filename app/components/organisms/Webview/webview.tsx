import { DynamicHeader, ThemedSafeArea } from '@/components/atom';
import DynamicLoader from '@/components/molecule/Loader';
import { useAuth } from '@/context/AuthContext';
import useBackHandler from '@/hooks/useBackHandler';
import { getStringOrFallback } from '@/utility/utility';
import Box from '@atom/Box';
import { DarkStatusBar } from '@molecule/StatusBar';
import {
    useNavigation
} from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    Platform,
    RefreshControl,
    StyleSheet
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import ErrorScreen from '../ErrorScreen';
import { SecureWebView } from './securewebview';

export default function WebViewScreen({ link, header }: { link: string, header: string }) {
    // const { params } = useRoute() || {};
    let paramsLink = link || '';
    const { logout } = useAuth();
    const [url, setUrl] = useState<string | any>(paramsLink);
    const [error, setError] = useState<any>(false);
    const canGoBackRef = useRef(false);
    const currentRefUrl = useRef(link);
    const [isRefresh, setisRefresh] = useState(false);
    const webViewRef = useRef<any>(null);
    const { goBack, navigate } = useNavigation<any>();
    const [height, setHeight] = useState(Dimensions.get('screen').height);

    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleRetry = () => {
        setHasError(false);
        setErrorMessage('');
        setError(null);

        // Add a small delay before reloading
        setTimeout(() => {
            if (webViewRef.current) {
                webViewRef.current.reload();
            }
        }, 300);
    };

    const handleShouldStartLoadWithRequest = (event: any) => {
        const { url } = event;
        if (url === 'close://') {
            goBack();
            return false; // Return false to cancel the request
        }
        return true; // Allow loading other URLs
    };

    const handleBackPress = () => {
        if (!canGoBackRef.current) {
            goBack();
            return true;
        }
        if (webViewRef.current) webViewRef.current.goBack();
        return true;
    };

    const handleError = (syntheticEvent: any) => {
        const { nativeEvent } = syntheticEvent;
        console.log('nativeEvent', nativeEvent);

        // Set hasError to true to display the error screen
        setHasError(true);

        // Handle specific error types
        if (nativeEvent.code) {
            switch (nativeEvent.code) {
                case -1200: // SSL Error
                    setErrorMessage(
                        getStringOrFallback(
                            'Security certificate issue: This website has an invalid or expired security certificate. The connection cannot be established securely.',
                            'Unable to establish a secure connection. This website may have invalid security credentials.',
                        ),
                    );
                    break;
                case -1001: // Network timeout
                    setErrorMessage(
                        getStringOrFallback(
                            'The connection timed out. Please check your internet connection and try again.',
                            'Network request timed out.',
                        ),
                    );
                    break;
                case -1009: // No internet connection
                    setErrorMessage(
                        getStringOrFallback(
                            'No internet connection. Please check your network settings and try again.',
                            'The Internet connection appears to be offline.',
                        ),
                    );
                    break;
                default:
                    setErrorMessage(
                        getStringOrFallback(
                            nativeEvent.description,
                            'Failed to load the page. Please try again.',
                        ),
                    );
            }
        } else {
            setErrorMessage(
                getStringOrFallback(
                    nativeEvent.description,
                    'Failed to load the page. Please try again.',
                ),
            );
        }

        setError(nativeEvent);
    };

    // Add a function to track loading state
    const [isLoading, setIsLoading] = useState(true);

    const handleLoadStart = () => {
        setIsLoading(true);
    };

    const handleLoadEnd = () => {
        setIsLoading(false);
    };

    const onRefresh = () => {
        setisRefresh(true);
        webViewRef.current.reload();
        setisRefresh(false);
    };
    const [isEnabled, setEnabled] = useState(typeof onRefresh === 'function');

    useBackHandler(handleBackPress);

    const restoreScrollPosition = () => {
        if (webViewRef.current) {
            Platform.OS === 'android' &&
                webViewRef.current.injectJavaScript(`
        window.scrollTo(0, 0);
        true; // Need to return true to indicate that the script has been executed
      `);
        }
    };

    return (
        <ThemedSafeArea>
            <DarkStatusBar />
            {(header) && <DynamicHeader title={header} onBack={() => {
                logout();
            }} />}
            {!hasError ? (
                <ScrollView
                    onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
                    refreshControl={
                        <RefreshControl
                            onRefresh={onRefresh}
                            refreshing={isRefresh}
                            enabled={isEnabled}
                        />
                    }
                    style={styles.view}>
                    <SecureWebView
                        onScroll={(e) => {
                            setEnabled(
                                typeof onRefresh === 'function' &&
                                e.nativeEvent.contentOffset.y === 0,
                            );
                        }}
                        ref={(ref) => (webViewRef.current = ref)}
                        startInLoadingState={true}
                        onLoad={restoreScrollPosition}
                        onLoadStart={handleLoadStart}
                        onLoadEnd={handleLoadEnd}
                        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
                        source={{ uri: url }}
                        onNavigationStateChange={(navState: any) => {
                            canGoBackRef.current = navState.canGoBack;
                            currentRefUrl.current = navState.url;
                        }}
                        style={[styles.view, { height }]}
                        renderLoading={() => <DynamicLoader />}
                        onError={handleError}
                    />
                    {isLoading && <DynamicLoader />}
                </ScrollView>
            ) : (
                <Box className="flex-1">
                    <ErrorScreen errorMessage={errorMessage} onRetry={handleRetry} />
                </Box>
            )}
        </ThemedSafeArea>
    );
}

const styles = StyleSheet.create({
    view: { flex: 1, height: '100%' },
});
