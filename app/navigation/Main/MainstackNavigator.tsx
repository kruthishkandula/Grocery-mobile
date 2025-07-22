import CartScreen from '@/screens/tabs/Cart/CartScreen';
import ProductDetails from '@/screens/tabs/Home/ProductDetails';
import { createStackNavigator } from '@react-navigation/stack';
import Products from '../../screens/tabs/Home/Products';
import TabsLayout from './TabsLayout';
import { Platform } from 'react-native';

const Stack = createStackNavigator<any>();

export default function RootLayout() {
  return (
    <Stack.Navigator
      initialRouteName="homescreen"
      screenOptions={{
        headerShown: false,
        ...(Platform.OS !== 'web' && {
          cardStyleInterpolator: ({ current: { progress }, layouts }) => ({
            cardStyle: {
              // opacity: progress.interpolate({
              //   inputRange: [0, 1],
              //   outputRange: [0, 1],
              // }),
              transform: [
                // {
                //   perspective: 1000,
                // },
                {
                  rotateY: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['180deg', '0deg'],
                  }),
                },
                {
                  scale: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.1, 1],
                  }),
                }
              ],
            },
          }),
        }),
      }}
    >
      <Stack.Screen
        name="homescreen"
        component={TabsLayout}
        options={{
          animation: Platform.OS === 'web' ? 'none' : 'default'
        }}
      />
      <Stack.Screen
        name="Products"
        component={Products}
        options={{
          animation: Platform.OS === 'web' ? 'none' : 'default'
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          animation: Platform.OS === 'web' ? 'none' : 'default'
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          animation: Platform.OS === 'web' ? 'none' : 'default'
        }}
      />
    </Stack.Navigator>
  );
}
