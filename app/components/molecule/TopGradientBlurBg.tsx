import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { height, width } = Dimensions.get('window');
const TOP_HEIGHT = height * 0.3;

export default function TopGradientBlurBg() {
  return (
    <View style={styles.container} pointerEvents="none">
      <BlurView intensity={60} style={styles.blur} tint="light" />
      <LinearGradient
        colors={['rgba(252,252,252,1)', 'rgba(252,252,252,0)']}
        style={styles.gradient}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: TOP_HEIGHT,
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
});