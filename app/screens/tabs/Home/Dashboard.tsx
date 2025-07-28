import DashboardSectionHeader from '@/components/atom/Header/DashboardSectionHeader';
import CategoryItem1 from '@/components/molecule/Card/CategoryItem1';
import ProductItem1 from '@/components/molecule/Card/Product/ProductItem1';
import { useAuth } from '@/context/AuthContext';
import { dashboard_cms } from '@/fixtures/dashboard_cms';
import { useAddressStore } from '@/store/address/addressStore';
import { gpsw } from '@/style/theme';
import { useThemeContextActions } from '@/Themes';
import { getThemeColors } from '@/Themes/theme-config';
import { IconSymbol, Text } from '@atom';
import SearchBar from '@molecule/SearchBar';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
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

export default function Dashboard() {
    const { theme } = useThemeContextActions();
    const colors = getThemeColors(theme);
    const scrollX = useRef(new Animated.Value(0)).current;
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { loading: authLoading, userLoggedIn } = useAuth();
    const { addresses, selectedAddressId } = useAddressStore();
    const { navigate } = useNavigation<any>();
    const { top, bottom } = useSafeAreaInsets()

    let selected_address = addresses.find(address => address.id === selectedAddressId);

    console.log('selected_address', selected_address)

    // const { data, isLoading, error, refetch: refetchCategories } = useFetchAllCategories({
    //     enabled: !authLoading && userLoggedIn,
    // });


    const refetch = async () => {
        setIsRefreshing(true);
        try {
            // await Promise.all([refetchCategories()]);
        } finally {
            setIsRefreshing(false);
        }
    };

    if (authLoading) return null; // Or a splash/loader
    // if (isLoading) return <DynamicLoader message={'Loading...'} />;
    // if (error) return <DynamicError error={error} onRetry={refetch} />;


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
                                    onPress={() => {
                                        navigate(item?.link, item)
                                    }}
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

            case "product":
                return (
                    <View key={section.key} className='bg-bg my-2'>
                        <DashboardSectionHeader section={section} />
                        <FlatList
                            data={getSectionData(section)}
                            renderItem={({ item }) => <ProductItem1
                                item={item}
                                style={{
                                    width: 140,
                                    backgroundColor: colors?.shadingLight,
                                }}
                                imageStyle={{
                                    maxHeight: '40%',
                                    width: '100%',
                                    borderRadius: 8,
                                }}
                            />}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                )
            default:
                return null;
        }
    };

    return (
        <View className="bg-bg2 pb-5 flex-1 justify-start">
            {/* Header */}
            <LinearGradient style={{ borderBottomLeftRadius: 40, borderBottomRightRadius: 40, paddingTop: top, paddingBottom: 0 }} start={{ x: 2, y: 2 }} colors={[colors?.primary, colors?.bg, colors?.secondary]} >
                <View style={{ padding: 20, elevation: 4, shadowColor: '#333', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 }} className='flex-col gap-2'>
                    {/* header & notifications section */}
                    <View className='flex flex-row justify-between'>
                        <Text variant='bold18' className='text-[30px] font-[800] text-text1'>Grocery Plus</Text>
                        <IconSymbol name='bell' iconSet='FontAwesome5' size={24} color={colors?.text1} />
                    </View>

                    {/* location section */}
                    <TouchableOpacity key={`location`} className='flex flex-row justify-between mt-4' onPress={() => {
                        navigate('Address')
                    }} >
                        <View className='flex-row items-center gap-3'>
                            <View className='bg-secondary p-2 rounded-full'>
                                <IconSymbol name='location-outline' size={24} color={colors?.text1} />
                            </View>
                            <View className='flex-col' >
                                <View className='flex-row items-center' >
                                    <Text style={{ color: colors?.text1, fontSize: gpsw(12) }} className='font-[300] text-text1'>Deliver to{' '}<Text variant='medium14' style={{ color: colors?.text1, fontSize: gpsw(16) }} className='font-[600] text-text1'>{selected_address?.label}</Text></Text>
                                </View>
                                <Text variant='medium14' style={{ color: colors?.shading, fontSize: gpsw(12) }} className='text-[12px] font-[600] text-text1'>{selected_address?.addressLine1}, {selected_address?.city}</Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <IconSymbol name='chevron-right' iconSet='FontAwesome6' size={24} color={colors?.white} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            {/* body */}
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 80,
                }}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refetch} />} className='flex-1 mx-4 gap-2 pt-2'>
                <>
                    <SearchBar />
                    {dashboard_cms
                        .filter(section => section.enabled)
                        .sort((a, b) => a.order - b.order)
                        .map((section) => {
                            return (
                                renderSection(section as DashboardSection)
                            )
                        })}
                </>
            </ScrollView>
        </View >
    );
}