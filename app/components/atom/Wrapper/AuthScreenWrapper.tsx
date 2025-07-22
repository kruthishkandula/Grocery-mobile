import React from 'react';
import { View, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { ColorValue } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface AuthScreenWrapperProps {
  children: React.ReactNode;
  illustrationSource: any;
  gradientColors?: Readonly<[ColorValue, ColorValue, ...ColorValue[]]>;
  size?: number;
  width?: number;
  height?: number;
}

const AuthScreenWrapper: React.FC<AuthScreenWrapperProps> = ({ children, illustrationSource, gradientColors = ["#fff", "#fff"], width = 230, height = 230, size }) => {
  return (
    <LinearGradient colors={gradientColors} style={{ flex: 1, justifyContent: 'center' }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={10}
        enableOnAndroid={true}
      >
        <View className="items-center mt-16 mb-6">
          <Image source={illustrationSource} style={{ width: (size || width), height: (size || height), resizeMode: 'contain' }} />
        </View>
        {children}
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
};

export default AuthScreenWrapper;
