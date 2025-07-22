import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';

type SafeAreaContainerProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: Edge[];
  withBackground?: boolean;
};

/**
 * A wrapper component that handles safe area insets consistently across the app.
 * @param children - The content to render within the safe area
 * @param style - Additional styles to apply to the container
 * @param edges - Which edges to apply safe area padding to
 * @param withBackground - Whether to use the theme background color
 */
export default function SafeAreaContainer({
  children,
  style,
  edges = ['top', 'right', 'left'],
  withBackground = true,
}: SafeAreaContainerProps) {
  
  return (
    <SafeAreaView
      edges={edges}
      style={[
        styles.container,
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});