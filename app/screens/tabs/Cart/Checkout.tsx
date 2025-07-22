import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';

export default function Checkout({ route, navigation }: any) {
  const { total, currency, currencySymbol } = route.params;

  // You can add address/coupon logic here

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-4">Checkout</Text>
      <Text className="mb-2 text-base">Order Total: {currencySymbol}{total} {currency}</Text>
      {/* Example: Add address or coupon fields here */}
      <TextInput placeholder="Enter delivery address" className="border p-2 mb-3 rounded" />
      <Button
        title="Next: Payment"
        onPress={() => navigation.navigate('Payment', { total, currency, currencySymbol })}
        color="#2563eb"
      />
    </View>
  );
}