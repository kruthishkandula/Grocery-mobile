import AddressScreen from '@/screens/tabs/Address';
import CartScreen from '@/screens/tabs/Cart/CartScreen';
import CheckoutScreen from '@/screens/tabs/Cart/CheckoutScreen';
import ProductDetails from '@/screens/tabs/Home/ProductDetails';
import Offers from '@/screens/tabs/Offers';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import Products from '../../screens/tabs/Home/Products';
import TabsLayout from './TabsLayout';
import SearchResultsScreen from '@/screens/SearchResultsScreen';

const Stack = createStackNavigator<any>();

export default function RootLayout() {

  return (
    <Stack.Navigator
      initialRouteName="homescreen"
      screenOptions={{
        headerShown: false,
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
        name="SearchResults" 
        component={SearchResultsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="offers"
        component={Offers}
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
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          animation: Platform.OS === 'web' ? 'none' : 'default'
        }}
      />
      <Stack.Screen
        name="Address"
        component={AddressScreen}
        options={{
          animation: Platform.OS === 'web' ? 'none' : 'default'
        }}
      />
    </Stack.Navigator>
  );
}
