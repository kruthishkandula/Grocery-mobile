import React, { useRef, useState } from 'react';
import { FlatList, Image, View, Dimensions, Animated, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

type AnimationType = 'none' | 'fade' | 'scale';

interface PagingCarouselProps {
  images: { id: string | number; url: string }[];
  imageHeight?: number;
  borderRadius?: number;
  animationType?: AnimationType;
}

const PagingCarousel: React.FC<PagingCarouselProps> = ({ images, imageHeight = 250, borderRadius = 8, animationType = 'none' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View>
      <Animated.FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
        renderItem={({ item, index }) => {
          let animatedStyle = {};
          if (animationType === 'fade') {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.5, 1, 0.5],
              extrapolate: 'clamp',
            });
            animatedStyle = { opacity };
          } else if (animationType === 'scale') {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.9, 1, 0.9],
              extrapolate: 'clamp',
            });
            animatedStyle = { transform: [{ scale }] };
          }
          return (
            <Animated.View style={[{ width, alignItems: 'center' }, animatedStyle]}>
              <Image
                source={{ uri: item.url }}
                style={{ width: width - 40, height: imageHeight, borderRadius, backgroundColor: '#f5f5f5' }}
                resizeMode="cover"
              />
            </Animated.View>
          );
        }}
        contentContainerStyle={{ paddingVertical: 20, }}
      />
      {/* Indicators */}
      <View style={styles.indicatorContainer}>
        {images.map((_, idx) => (
          <View
            key={idx}
            style={[styles.dot, activeIndex === idx && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#333',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default PagingCarousel;
