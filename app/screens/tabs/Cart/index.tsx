import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CartScreen from './CartScreen';
import Checkout from './Checkout';
import Payment from './Payment';

const CartStack = createStackNavigator<any>();


export default function CartNav() {
  return (
    <CartStack.Navigator screenOptions={{ headerShown: false }}>
      <CartStack.Screen name="CartScreen" component={CartScreen} />
      <CartStack.Screen name="Checkout" component={Checkout} />
      <CartStack.Screen name="Payment" component={Payment} />
    </CartStack.Navigator>
  );
}