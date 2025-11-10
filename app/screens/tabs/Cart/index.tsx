import CheckoutScreen from '@/screens/tabs/Cart/CheckoutScreen';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CartScreen from './CartScreen';
import Payment from './Payment';
import OrderSuccessScreen from './order/OrderSuccessScreen';

const CartStack = createStackNavigator<any>();


export default function CartNav() {
  return (
    <CartStack.Navigator screenOptions={{ headerShown: false }}>
      <CartStack.Screen name="CartScreen" component={CartScreen} />
      <CartStack.Screen name="Checkout" component={CheckoutScreen} />
      <CartStack.Screen name="Payment" component={Payment} />
    </CartStack.Navigator>
  );
}