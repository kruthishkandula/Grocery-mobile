import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Text as RNText, Dimensions, Animated, Pressable, Modal } from 'react-native';
import Banner from './Banner';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { gpsw } from '@/style/theme';
import { useThemeContextActions } from '@/Themes';
import { getThemeColors } from '@/Themes/theme-config';

interface ScrollableBannersProps {
    banners: any[];
}

const { width: screenWidth } = Dimensions.get('window');

const DOT_SIZE = 8;
const DOT_SPACING = 8;

const ScrollableBanners: React.FC<ScrollableBannersProps> = ({ banners }) => {
    const [showAll, setShowAll] = useState(false);
    const [webViewUrl, setWebViewUrl] = useState<string | null>(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation<any>();

    const { theme } = useThemeContextActions();
    const colors = getThemeColors(theme);

    const visibleBanners = showAll ? banners : banners.slice(0, 3);
    const isSingleBanner = visibleBanners.length === 1;

    const handleBannerPress = (banner: any) => {
        if (banner.route) {
            navigation.navigate(banner.route);
        } else if (banner.link_url) {
            setWebViewUrl(banner.link_url);
        }
    };

    return (
        <View>
            <Animated.ScrollView
                horizontal
                pagingEnabled={!isSingleBanner}
                scrollEnabled={!isSingleBanner}
                bounces={!isSingleBanner}
                showsHorizontalScrollIndicator={false}
                style={{ width: screenWidth, }}
                contentContainerStyle={{ paddingHorizontal: 0 }}
                onScroll={
                    !isSingleBanner
                        ? Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: false }
                        )
                        : undefined
                }
                scrollEventThrottle={16}
            >
                {visibleBanners.map((banner, idx) => (
                    <Pressable
                        key={banner.id}
                        onPress={() => handleBannerPress(banner)}
                        style={{ width: screenWidth, padding: 0, }}
                    >
                        <Banner
                            type={banner.bannery_type}
                            description={banner.description}
                            imageUrl={banner.image_url?.url}
                            style={{
                                padding: 0,
                                margin: 0,
                                width: '100%',
                                backgroundColor: 'transparent',
                            }}
                            textStyle={{ color: banner.text_color || '#222' }}
                        />
                    </Pressable>
                ))}
            </Animated.ScrollView>

            {/* Animated Dots - only if more than one banner */}
            {visibleBanners.length > 1 && (
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                    {visibleBanners.map((_, i) => {
                        const inputRange = [
                            (screenWidth - 40) * (i - 1),
                            (screenWidth - 40) * i,
                            (screenWidth - 40) * (i + 1),
                        ];
                        const scale = scrollX.interpolate({
                            inputRange,
                            outputRange: [1, 1.5, 1],
                            extrapolate: 'clamp',
                        });
                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.5, 1, 0.5],
                            extrapolate: 'clamp',
                        });
                        return (
                            <Animated.View
                                key={i}
                                style={{
                                    width: DOT_SIZE,
                                    height: DOT_SIZE,
                                    borderRadius: DOT_SIZE / 2,
                                    backgroundColor: colors.primary,
                                    marginHorizontal: DOT_SPACING / 2,
                                    transform: [{ scale }],
                                    opacity,
                                }}
                            />
                        );
                    })}
                </View>
            )}

            {/* See All / Show Less */}
            {banners.length > 3 && !showAll && (
                <TouchableOpacity onPress={() => setShowAll(true)} style={{ paddingHorizontal: 8, alignSelf: 'flex-end', marginTop: 8 }}>
                    <RNText style={{ color: '#007AFF', fontWeight: 'bold' }}>See All</RNText>
                </TouchableOpacity>
            )}
            {showAll && (
                <TouchableOpacity onPress={() => setShowAll(false)} style={{ paddingHorizontal: 8, alignSelf: 'flex-end', marginTop: 8 }}>
                    <RNText style={{ color: '#007AFF', fontWeight: 'bold' }}>Show Less</RNText>
                </TouchableOpacity>
            )}

            {/* WebView Modal */}
            <Modal visible={!!webViewUrl} animationType="slide" onRequestClose={() => setWebViewUrl(null)}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => setWebViewUrl(null)} style={{ padding: 16, backgroundColor: '#fff', alignItems: 'flex-end' }}>
                        <RNText style={{ color: '#007AFF', fontWeight: 'bold', fontSize: 18 }}>Close</RNText>
                    </TouchableOpacity>
                    <WebView source={{ uri: webViewUrl || '' }} style={{ flex: 1 }} />
                </View>
            </Modal>
        </View>
    );
};

export default ScrollableBanners;