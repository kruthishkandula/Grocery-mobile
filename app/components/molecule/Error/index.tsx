import React from 'react';
import { View, Text, Button } from 'react-native';

type Props = {
  error?: any;
  onRetry: () => void;
};

export default function DynamicError({ error, onRetry }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 }}>
      <Text style={{ color: 'red', fontSize: 16, marginBottom: 12 }}>
        {error?.message || 'Something went wrong.'}
      </Text>
      <Button title="Retry" onPress={onRetry} />
    </View>
  );
}