import { useFetchAllBanners } from '@/api/nodeapi/Banners/api';
import { useFetchAllCategories } from '@/api/nodeapi/Categories/api';
import DashboardSectionHeader from '@/components/atom/Header/DashboardSectionHeader';
import { useThemeContextActions } from '@/Themes';
import { getThemeColors } from '@/Themes/theme-config';
import { IconSymbol, Text } from '@atom';
import CategoryItem1 from '@/components/molecule/Card/CategoryItem1';
import DynamicError from '@molecule/Error';
import DynamicLoader from '@molecule/Loader';
import SearchBar from '@molecule/SearchBar';
import { Image } from 'expo-image';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, TouchableOpacity, View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { useAuth } from '@/context/AuthContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const dashboard_cms = [
    {
        key: "shop_by_category",
        title: "Shop By Category",
        type: "category",
        enabled: true,
        order: 1,
        showSeeAll: true,
        seeAllRoute: 'Categories',
        dataSource: "categories", // can be used to fetch data dynamically
    },
    {
        key: "offers",
        title: "Offers",
        type: "banner",
        enabled: true,
        order: 2,
        showSeeAll: false,
        seeAllRoute: '',
        dataSource: "offers", // can be used to fetch data dynamically
    },
    {
        key: "shop_by_products",
        title: "Shop By Products",
        type: "product",
        enabled: true,
        order: 3,
        showSeeAll: true,
        seeAllRoute: 'Products',
        dataSource: "products", // can be used to fetch data dynamically
    },
]

type dataSourceTypes = 'categories' | 'offers' | 'banners' | 'products';
type sectionTypes = 'category' | 'offer' | 'banner' | 'product';
type DashboardSection = {
    key: string;
    title: string;
    type: sectionTypes;
    dataSource: dataSourceTypes;
    enabled: boolean;
    showSeeAll: boolean;

}

export default function Dashboard() {
    const { theme } = useThemeContextActions();
    const colors = getThemeColors(theme);
    const scrollX = useRef(new Animated.Value(0)).current;
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { loading: authLoading, userLoggedIn } = useAuth();

    const { data, isLoading, error, refetch: refetchCategories } = useFetchAllCategories({
        enabled: !authLoading && userLoggedIn,
    });
    const { data: bannersData, isLoading: bannersLoading, error: bannersError, refetch: refetchBanners } = useFetchAllBanners({}, {
        enabled: !authLoading && userLoggedIn,
    });

    const refetch = async () => {
        setIsRefreshing(true);
        try {
            await Promise.all([refetchCategories(), refetchBanners()]);
        } finally {
            setIsRefreshing(false);
        }
    };

    if (authLoading) return null; // Or a splash/loader
    if (isLoading || bannersLoading) return <DynamicLoader message={'Loading...'} />;
    if (error) return <DynamicError error={error} onRetry={refetch} />;

    // Helper to get data for each section
    const getSectionData = (section: { dataSource: dataSourceTypes }) => {
        switch (section.dataSource) {
            case "categories":
                return data?.data || [];
            case "offers":
                return bannersData?.data || [];
            // case "products":
            //     return productsData?.data || [];
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
                    <View key={section.key} className='bg-bg my-2'>
                        <DashboardSectionHeader section={section} />
                        <FlatList
                            data={getSectionData(section)}
                            renderItem={({ item }) => <CategoryItem1 item={item} />}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ maxHeight: 160 }}
                        />
                    </View>
                );
            case "banner":
                const banners = getSectionData(section);
                return (
                    <View key={section.key} className='bg-bg'>
                        <DashboardSectionHeader section={section} />
                        <Animated.FlatList
                            data={banners}
                            contentContainerClassName={'gap-4'}
                            keyExtractor={(_, idx) => `banner-${idx}`}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    onPress={() => console.log('Banner clicked', item)}
                                >
                                    <View
                                        style={{
                                            width: SCREEN_WIDTH * 0.85,
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
                                            <Text className='text-white text-[16px] font-bold'>{item.title || 'Banner'}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                            snapToAlignment="center"
                            decelerationRate="fast"
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                { useNativeDriver: false }
                            )}
                        />
                        {/* Pagination Dots */}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
                            {banners.map((_: any, i: any) => {
                                const inputRange = [
                                    (i - 1) * SCREEN_WIDTH * 0.85,
                                    i * SCREEN_WIDTH * 0.85,
                                    (i + 1) * SCREEN_WIDTH * 0.85,
                                ];
                                const dotWidth = scrollX.interpolate({
                                    inputRange,
                                    outputRange: [8, 20, 8],
                                    extrapolate: 'clamp',
                                });
                                const opacity = scrollX.interpolate({
                                    inputRange,
                                    outputRange: [0.3, 1, 0.3],
                                    extrapolate: 'clamp',
                                });
                                return (
                                    <Animated.View
                                        key={i}
                                        style={{
                                            height: 8,
                                            borderRadius: 4,
                                            backgroundColor: colors?.fourth,
                                            marginHorizontal: 4,
                                            width: dotWidth,
                                            opacity,
                                        }}
                                    />
                                );
                            })}
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View className="bg-bg2 pb-5 flex-1 justify-start">
            {/* Header */}
            <View style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <View className='flex flex-row justify-between'>
                        <Text className='text-[30px] font-[800] text-text1'>Grocery Plus</Text>
                        <IconSymbol name='bell' iconSet='FontAwesome5' size={24} color={colors?.text1} />
                    </View>
                    <View key={`location`} className='flex flex-row justify-between mt-2'>
                        <View className='flex-row items-center gap-3'>
                            <View className='bg-secondary p-2 rounded-full'>
                                <IconSymbol name='location-outline' size={24} color={colors?.text1} />
                            </View>
                            <Text style={{ color: colors?.text1 }} className='text-[16px] font-[300] text-text1'>Deliver to</Text>
                            <Text style={{ color: colors?.text1 }} className='text-[16px] font-[600] text-text1'>123 Main St, City</Text>
                        </View>
                        <TouchableOpacity>
                            <IconSymbol name='chevron-right' iconSet='FontAwesome6' size={24} color={colors?.text1} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* body */}
            <View className='flex-1 mx-4 gap-2'>
                <SearchBar />
                {dashboard_cms
                    .filter(section => section.enabled)
                    .sort((a, b) => a.order - b.order)
                    .map((section) => {
                        return (
                            renderSection(section as DashboardSection)
                        )
                    })}
            </View>
        </View>
    );
}