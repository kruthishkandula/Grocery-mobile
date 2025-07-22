// Example: App.tsx or your main entry
import { useAuth } from '@/context/AuthContext';
import useTheme from '@/hooks/useTheme';
import { navigationRef } from '@/navigation/RootNavRef';
import { Theme } from '@/Themes';
import KeyboardWrapper from '@atom/KeyboardWrapper';
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useEffect, useRef, useState } from 'react';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AuthNavigator from './Auth/AuthNavigator';
import { linking } from './linking';
import RootLayout from './Main/MainstackNavigator';
import AdminWebview from '@/screens/admin/AdminWebview';

function RootNavigator() {
  const routeNameRef = useRef<string | undefined>('');
  const { userLoggedIn, userDetails } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(userLoggedIn);
  const isAdmin = userDetails?.role === 'admin';

  // Use effect to handle auth state changes with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAuthenticated(userLoggedIn);
    }, 100);
    return () => clearTimeout(timer);
  }, [userLoggedIn]);

  const ThemedSafeArea = ({ children }: { children: React.ReactNode }) => {
    const { colors } = useTheme();
    const { top, bottom } = useSafeAreaInsets()

    return (
      <View style={{ flex: 1, paddingTop: Platform.OS === 'web' ? 0 : top, paddingBottom: Platform.OS === 'web' ? 0 : bottom, backgroundColor: colors?.bg }} >
        {children}
      </View>
    )
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  };


  console.log('isAuthenticated---', isAuthenticated)

  return (
    <Theme>
      <ThemedSafeArea>
        <KeyboardWrapper>
          <NavigationContainer
            ref={navigationRef}
            linking={linking}
            theme={theme}
            onReady={() => {
              routeNameRef.current = navigationRef.getCurrentRoute()?.name;
            }}
            onStateChange={async () => {
              if (__DEV__) {
                const currentRouteName = navigationRef.getCurrentRoute()?.name;
                console.log('currentRouteName', currentRouteName);
              }
            }}>
            {isAuthenticated ? (
              isAdmin ? (
                <AdminWebview />
              ) : (
                <RootLayout />
              )
            ) : (
              <AuthNavigator />
            )}
          </NavigationContainer>
        </KeyboardWrapper>
      </ThemedSafeArea>
    </Theme>
  );
}

export default RootNavigator;