import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import IconSymbol from './IconSymbol';
import { useNavigation } from '@react-navigation/native';
import Text from './Text';

type Variant = 'default' | 'back' | 'search' | 'custom';

interface DynamicHeaderProps {
  title?: string;
  variant?: Variant;
  onBack?: () => void;
  rightComponent?: React.ReactNode;
  leftComponent?: React.ReactNode;
  style?: any;
}

export default function DynamicHeader({
  title,
  variant = 'back',
  onBack,
  rightComponent,
  leftComponent,
  style,
}: DynamicHeaderProps) {
  const { goBack } = useNavigation<any>();
  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-bg" style={[{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 0.84,
      elevation: 5,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    }, style]}>
      {/* Left */}
      <View className="flex-row items-center">
        {variant === 'back' && (
          <TouchableOpacity onPress={() => {
            if (onBack) {
              onBack();
              return;
            }
            goBack()
          }} className="mr-2" hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <IconSymbol name="arrow-back" size={24} color="#222" />
          </TouchableOpacity>
        )}
        {leftComponent}
      </View>
      {/* Title */}
      <Text className="text-lg font-bold flex-1 text-start" numberOfLines={2} ellipsizeMode="tail" style={{ maxWidth: '30%' }}>
        {title}
      </Text>
      {/* Right */}
      <View className="flex-row items-center">
        {variant === 'search' && (
          <TouchableOpacity>
            <IconSymbol name="search" size={22} color="#222" />
          </TouchableOpacity>
        )}
        {rightComponent}
      </View>
    </View >
  );
}