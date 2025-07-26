import { ThemedSafeArea } from '@/components/atom';
import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';

const paymentMethods = ['Credit Card', 'UPI', 'Cash on Delivery'];

export default function Payment({ route, navigation }: any) {
  const { total, currency, currencySymbol } = route.params;
  const [selected, setSelected] = useState(paymentMethods[0]);

  const handlePayment = () => {
    // Implement payment logic here (API call, etc.)
    alert(`Paid ${currencySymbol}${total} (${currency}) via ${selected}`);
    navigation.popToTop();
  };

  return (
    <ThemedSafeArea>
      <View className="flex-1 bg-white p-4">
        <Text className="text-xl font-bold mb-4">Select Payment Method</Text>
        {paymentMethods.map(method => (
          <TouchableOpacity
            key={method}
            className={`py-2 px-4 mb-2 rounded ${selected === method ? 'bg-blue-200' : 'bg-gray-100'}`}
            onPress={() => setSelected(method)}
          >
            <Text className="text-base">{method}</Text>
          </TouchableOpacity>
        ))}
        <Text className="mt-4 mb-2 font-bold text-lg">
          Total: {currencySymbol}{total} {currency}
        </Text>
        <Button title="Pay Now" onPress={handlePayment} color="#16a34a" />
      </View>
    </ThemedSafeArea>
  );
}