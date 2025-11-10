import useTheme from '@/hooks/useTheme';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, Image, StyleSheet, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface FeaturedCarouselProps {
    images: { id: string | number; url: string }[];
    imageHeight?: number;
    borderRadius?: number;
    gap?: number;
    carouselWidth?: number;
}

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({
    images,
    imageHeight = 250,
    borderRadius = 8,
    gap = 0,
    carouselWidth,
}) => {
    const { colors } = useTheme();
    const [activeIndex, setActiveIndex] = useState(0);

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index);
        }
    }).current;
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    const scrollX = useRef(new Animated.Value(0)).current;
    const itemWidth = carouselWidth || (screenWidth - 40) * 1;
    const sidePadding = (screenWidth - itemWidth) / 2;
    const imageLeftSize = 0.8;
    const imageRightSize = 0.8;

    return (
        <View>
            <Animated.FlatList
                data={images}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                snapToInterval={itemWidth + gap}
                decelerationRate="fast"
                bounces={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewConfigRef.current}
                contentContainerStyle={{ height: 350, paddingHorizontal: sidePadding, alignItems: 'center' }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                renderItem={({ item, index }) => {
                    const inputRange = [
                        (index - 1) * (itemWidth + gap),
                        index * (itemWidth + gap),
                        (index + 1) * (itemWidth + gap),
                    ];
                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [imageLeftSize, 1, imageRightSize],
                        extrapolate: 'clamp',
                    });
                    return (
                        <Animated.View style={{
                            width: itemWidth,
                            marginRight: gap,
                            transform: [{ scale }],
                        }}>
                            <Image
                                source={{ uri: item.url }}
                                style={{ width: '100%', height: imageHeight, borderRadius, backgroundColor: '#f5f5f5' }}
                                resizeMode="cover"
                            />
                        </Animated.View>
                    );
                }}
            />
            {/* Indicators */}
            {images?.length > 1 && <View style={styles.indicatorContainer}>
                {images.map((_, idx) => (
                    <View
                        key={idx}
                        style={[styles.dot, activeIndex === idx && styles.activeDot, { backgroundColor: activeIndex === idx ? colors.accent : colors.textPrimary }]}
                    />
                ))}
            </View>}
        </View>
    );
};


const styles = StyleSheet.create({
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
    activeDot: {
        width: 20,
        height: 8,
        borderRadius: 6,
    },
});

export default FeaturedCarousel;
