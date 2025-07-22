import React from 'react';
import { FlatList, Image, View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface BasicCarouselProps {
  images: { id: string | number; url: string }[];
  imageHeight?: number;
  borderRadius?: number;
}

const BasicCarousel: React.FC<BasicCarouselProps> = ({ images, imageHeight = 250, borderRadius = 8 }) => {
  return (
    <FlatList
      data={images}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ marginRight: 12 }}>
          <Image
            source={{ uri: item.url }}
            style={{ width: width - 40, height: imageHeight, borderRadius, backgroundColor: '#f5f5f5' }}
            resizeMode="cover"
          />
        </View>
      )}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    />
  );
};

export default BasicCarousel;
