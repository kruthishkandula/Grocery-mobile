// Example: App.tsx or your main entry
import KeyboardWrapper from '@/components/atom/Wrapper/KeyboardWrapper';
import { useAuth } from '@/context/AuthContext';
import { navigationRef } from '@/navigation/RootNavRef';
import AdminWebview from '@/screens/admin/AdminWebview';
import { Theme } from '@/Themes';
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useEffect, useRef, useState } from 'react';
import AuthNavigator from './Auth/AuthNavigator';
import { linking } from './linking';
import RootLayout from './Main/MainstackNavigator';

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
    </Theme>
  );
}

export default RootNavigator;