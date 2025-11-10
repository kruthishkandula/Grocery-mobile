import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import IconSymbol from './IconSymbol';
import { useNavigation } from '@react-navigation/native';
import Text from './Text';
import useTheme from '@/hooks/useTheme';
import { gpsh } from '@/style/theme';

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
  const { colors } = useTheme()
  const { goBack } = useNavigation<any>();

  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-surfaceOverlay" style={[{
      shadowColor: colors.surfaceBase,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 0.84,
      elevation: 5,
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
            <IconSymbol name="arrow-back" size={24} color={colors?.textPrimary} />
          </TouchableOpacity>
        )}
        {leftComponent}
      </View>
      {/* Title */}
      <Text className="text-lg font-bold flex-1 text-start text-textPrimary" numberOfLines={2} ellipsizeMode="tail" style={{ maxWidth: '100%', textAlign: 'center', fontWeight: '700', fontSize: gpsh(12) }}>
        {title}
      </Text>
      {/* Right */}
      <View className="flex-row items-center">
        {variant === 'search' && (
          <TouchableOpacity>
            <IconSymbol name="search" size={22} color={colors?.textPrimary} />
          </TouchableOpacity>
        )}
        {rightComponent}
      </View>
    </View >
  );
}