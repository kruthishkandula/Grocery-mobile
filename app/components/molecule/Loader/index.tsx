import { Text } from '@atom';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function DynamicLoader({ message }: { message?: string }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 }}>
      <ActivityIndicator size="large" color="#888" />
      {message && <Text style={{ marginTop: 12, color: '#888' }}>{message}</Text>}
    </View>
  );
}