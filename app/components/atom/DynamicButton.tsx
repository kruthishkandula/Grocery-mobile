import React, { useRef } from 'react';
import { Pressable, Text, Animated, View, ActivityIndicator } from 'react-native';

interface DynamicButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  className?: string;
}

const DynamicButton: React.FC<DynamicButtonProps> = ({ title, onPress, loading, className = '' }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        className={`bg-blue-600 rounded-lg py-3 items-center justify-center ${className}`}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={loading}
        android_ripple={{ color: '#2563eb' }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-lg font-semibold">{title}</Text>
        )}
      </Pressable>
    </Animated.View>
  );
};

export default DynamicButton;
