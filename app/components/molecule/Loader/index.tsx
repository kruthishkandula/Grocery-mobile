import useTheme from '@/hooks/useTheme';
import { Text } from '@atom';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function DynamicLoader({ message }: { message?: string }) {
  const { colors } = useTheme();

  return (
    <View className='flex-1 justify-center items-center bg-surfaceBase'>
      <ActivityIndicator size="large" color={colors?.primary} />
      {message && <Text variant='medium14' className='text-textPrimary mt-2'>{message}</Text>}
    </View>
  );
}