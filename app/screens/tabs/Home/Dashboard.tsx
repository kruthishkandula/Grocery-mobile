import { useFetchDashboardData } from '@/api/nodeapi/Dashboard/api';
import DashboardSectionHeader from '@/components/atom/Header/DashboardSectionHeader';
import CategoryItem1 from '@/components/molecule/Card/CategoryItem1';
import ProductItem1 from '@/components/molecule/Card/Product/ProductItem1';
import DynamicError from '@/components/molecule/Error';
import DynamicLoader from '@/components/molecule/Loader';
import { useAuth } from '@/context/AuthContext';
import { useAddressStore } from '@/store/address/addressStore';
import { gpsw } from '@/style/theme';
import { useThemeContextActions } from '@/Themes';
import { getThemeColors, Themes } from '@/Themes/theme-config';
import { generateTailwindColorsConfig } from '@/Themes/theme-helper';
import { IconSymbol, Text } from '@atom';
import SearchBar from '@molecule/SearchBar';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, TouchableOpacity, View } from 'react-native';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type dataSourceTypes = 'categories' | 'offers' | 'banners' | 'products';
type sectionTypes = 'category' | 'offer' | 'banner' | 'product';
type DashboardSection = {
    key: string;
    title: string;
    type: sectionTypes;
    dataSource: dataSourceTypes;
    enabled: boolean;
    showSeeAll: boolean;
    data_source: any;
}

generateTailwindColorsConfig();

// Separate component for Banner to isolate useEffect
const BannerCarousel = ({ section, colors, navigate }: { section: DashboardSection, colors: any, navigate: any }) => {
    const bannerFlatListRef = useRef<FlatList>(null);
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    const paddingHorizontal = 16;
    const BANNER_WIDTH = SCREEN_WIDTH - (2 * paddingHorizontal);

    const banners = section?.data_source?.data || [];

    // Auto scroll function with proper alignment
    const startAutoScroll = useCallback((bannersData: any[]) => {
        if (bannersData.length <= 1) return;

        autoScrollTimer.current = setInterval(() => {
            setCurrentBannerIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % bannersData.length;

                // Use scrollToOffset for better alignment control
                const offsetX = nextIndex * BANNER_WIDTH;
                bannerFlatListRef.current?.scrollToOffset({
                    offset: offsetX,
                    animated: true,
                });

                return nextIndex;
            });
        }, 2000);
    }, [BANNER_WIDTH]);

    const stopAutoScroll = useCallback(() => {
        if (autoScrollTimer.current) {
            clearInterval(autoScrollTimer.current);
            autoScrollTimer.current = null;
        }
    }, []);

    // Initialize auto scroll when component mounts
    useEffect(() => {
        if (banners.length > 1) {
            setCurrentBannerIndex(0);
            startAutoScroll(banners);
        }

        return () => stopAutoScroll();
    }, [banners.length, startAutoScroll, stopAutoScroll]);

    return (
        <View key={section.key} className='bg-surfaceBase'>
            <View className='mx-4' >
                <DashboardSectionHeader section={section} />
            </View>
            <View style={{ height: 180 }}>
                <Animated.FlatList
                    ref={bannerFlatListRef}
                    data={banners}
                    keyExtractor={(item, idx) => `banner-${idx}-${item.id || idx}`}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => {
                                navigate(item?.link, item)
                            }}
                            style={{
                                width: BANNER_WIDTH,
                                paddingHorizontal: paddingHorizontal,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <View
                                style={{
                                    width: BANNER_WIDTH - (2 * paddingHorizontal),
                                    height: 140,
                                    borderRadius: 16,
                                    overflow: 'hidden',
                                    backgroundColor: '#f3f4f6',
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.15,
                                    shadowRadius: 6,
                                    elevation: 3,
                                    marginVertical: 8,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Image
                                    source={{ uri: item?.imageUrl }}
                                    style={{ width: '100%', height: '100%' }}
                                    contentFit='cover'
                                />
                                <View style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    backgroundColor: 'rgba(0,0,0,0.3)',
                                    padding: 8,
                                }}>
                                    <Text className='text-white text-[16px] font-bold'>
                                        {item.title || 'Banner'}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    snapToAlignment="center"
                    snapToInterval={BANNER_WIDTH}
                    decelerationRate="fast"
                    contentContainerStyle={{
                        alignItems: 'center',
                    }}
                    getItemLayout={(data, index) => ({
                        length: BANNER_WIDTH,
                        offset: BANNER_WIDTH * index,
                        index,
                    })}
                    onMomentumScrollEnd={(event) => {
                        const contentOffset = event.nativeEvent.contentOffset.x;
                        const index = Math.round(contentOffset / BANNER_WIDTH);
                        setCurrentBannerIndex(index % banners.length);
                    }}
                    onScrollBeginDrag={() => {
                        stopAutoScroll();
                    }}
                    onScrollEndDrag={() => {
                        if (banners.length > 1) {
                            // Small delay to ensure scroll has settled
                            setTimeout(() => {
                                startAutoScroll(banners);
                            }, 100);
                        }
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                />
            </View>

            {/* Pagination Dots */}
            {banners.length > 1 && (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 8,
                    paddingBottom: 16
                }}>
                    {banners.map((_, i) => (
                        <View
                            key={i}
                            style={{
                                height: 8,
                                width: currentBannerIndex === i ? 20 : 8,
                                borderRadius: 4,
                                backgroundColor: currentBannerIndex === i ? colors?.secondary : colors?.textPrimary,
                                marginHorizontal: 4,
                                opacity: currentBannerIndex === i ? 1 : 0.3,
                            }}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

export default function Dashboard() {
    const { theme } = useThemeContextActions();
    const colors = getThemeColors(theme);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { loading: authLoading, userLoggedIn } = useAuth();
    const { addresses, selectedAddressId } = useAddressStore();
    const { navigate } = useNavigation<any>();
    const { top, bottom } = useSafeAreaInsets();

    const { data, isLoading, error, refetch: refetchDashboard } = useFetchDashboardData();
    const dashboard_cms = data?.data || [];
    const selected_address = addresses.find(address => address.id === selectedAddressId);

    const refetch = async () => {
        setIsRefreshing(true);
        try {
            await Promise.all([refetchDashboard()]);
        } finally {
            setIsRefreshing(false);
        }
    };

    if (isLoading) {
        return (<DynamicLoader message="Loading Dashboard..." />);
    }
    if (error) return <DynamicError error={error} onRetry={refetch} />;

    // Helper to get data for each section
    const getSectionData = (section: { dataSource: dataSourceTypes, data_source: any }) => {
        switch (section.dataSource) {
            case "categories":
                return section?.data_source?.data || [];
            case "offers":
                return section?.data_source?.data || [];
            case "products":
                return section?.data_source?.data || [];
            default:
                return [];
        }
    };

    // Helper to render each section
    const renderSection = (section: DashboardSection) => {
        if (!section.enabled) return null;

        switch (section.type) {
            case "category":
                return (
                    <View key={section.key} className='mx-4'>
                        <DashboardSectionHeader section={section} />
                        <FlatList
                            data={getSectionData(section)}
                            renderItem={({ item }) => <CategoryItem1 item={item} style={{
                                backgroundColor: colors.surfaceElevated
                            }} />}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ maxHeight: 160, gap: 10 }}
                        />
                    </View>
                );
            case "banner":
                return <BannerCarousel section={section} colors={colors} navigate={navigate} />;
            case "product":
                return (
                    <View key={section.key} className='my-2 mx-4'>
                        <DashboardSectionHeader section={section} />
                        <FlatList
                            data={getSectionData(section)}
                            renderItem={({ item }) => (
                                <ProductItem1
                                    item={item}
                                    style={{
                                        width: 140,
                                        backgroundColor: colors?.surfaceElevated,
                                    }}
                                    imageStyle={{
                                        maxHeight: '40%',
                                        width: '100%',
                                        borderRadius: 8,
                                    }}
                                />
                            )}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                );
            default:
                return null;
        }
    };

    console.log('dashboard_cms', JSON.stringify(dashboard_cms))

    return (
        <View className="bg-surfaceBase pb-5 flex-1 justify-start">
            {/* Header */}
            <LinearGradient
                style={{
                    borderBottomLeftRadius: 40,
                    borderBottomRightRadius: 40,
                    paddingTop: top,
                    paddingBottom: 0
                }}
                start={{ x: 2, y: 2 }}
                colors={[colors.surfaceOverlay, colors.surfaceOverlay, colors.surfaceOverlay]} 
            >
                <View
                    style={{
                        padding: 20,
                        elevation: 4,
                        shadowColor: '#333',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4
                    }}
                    className='flex-col gap-2'
                >
                    {/* header & notifications section */}
                    <View className='flex flex-row justify-between'>
                        <Text variant='bold18' className='text-[30px] font-[800] text-textPrimary'>
                            Grocery Plus
                        </Text>
                        <IconSymbol name='bell' iconSet='FontAwesome5' size={24} color={colors?.textPrimary} />
                    </View>

                    {/* location section */}
                    <TouchableOpacity
                        key="location"
                        className='flex flex-row justify-between mt-4'
                        onPress={() => navigate('Address')}
                    >
                        <View className='flex-row items-center gap-3'>
                            <View className='bg-secondary p-2 rounded-full'>
                                <IconSymbol name='location-outline' size={24} color={colors.textInverse} />
                            </View>
                            <View className='flex-col max-w-[80%]'>
                                <View className='flex-row items-center'>
                                    <Text
                                        style={{ fontSize: gpsw(12) }}
                                        className='font-[300] text-textPrimary'
                                    >
                                        Deliver to{' '}
                                        <Text
                                            variant='bold18'
                                            style={{ fontSize: gpsw(12) }}
                                            className='font-[600] text-textPrimary'
                                        >
                                            {selected_address?.label}
                                        </Text>
                                    </Text>
                                </View>
                                {selected_address ? (
                                    <Text
                                        variant='medium14'
                                        style={{ fontSize: gpsw(12) }}
                                        className='text-[12px] font-[600] text-textSecondary'
                                    >
                                        {selected_address?.addressLine1}, {selected_address?.city}
                                    </Text>
                                ) : (
                                    <Text
                                        variant='medium14'
                                        style={{ fontSize: gpsw(12) }}
                                        className='text-[12px] font-[600] text-textPrimary'
                                    >
                                        Select Delivery Address
                                    </Text>
                                )}
                            </View>
                        </View>
                        <TouchableOpacity>
                            <IconSymbol name='chevron-right' iconSet='FontAwesome6' size={24} color={colors.textPrimary} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            {/* body */}
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 120,
                }}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refetch} />}
                className='flex-1 gap-2 pt-2'
            >
                <View className='mx-4' >
                    <SearchBar />
                </View>
                {dashboard_cms
                    .filter((section: any) => section.enabled)
                    .sort((a: any, b: any) => a.order - b.order)
                    .map((section: any) => renderSection(section as DashboardSection))
                }
            </ScrollView>
        </View>
    );
}