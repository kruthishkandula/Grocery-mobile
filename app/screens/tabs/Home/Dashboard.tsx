import { useFetchAllBanners } from '@/api/nodeapi/Banners';
import { useFetchAllCategories } from '@/api/nodeapi/Categories';
import { gpsh } from '@/style/theme';
import { useThemeContextActions } from '@/Themes';
import { getThemeColors } from '@/Themes/theme-config';
import { IconSymbol, Text } from '@atom';
import CategoryItem1 from '@molecule/CategoryItem1';
import DynamicError from '@molecule/Error';
import DynamicLoader from '@molecule/Loader';
import SearchBar from '@molecule/SearchBar';
import React from 'react';
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';

export default function Dashboard() {
    const { theme } = useThemeContextActions();
    const colors = getThemeColors(theme);

    const { data, isLoading, error, refetch: refetchCategories } = useFetchAllCategories()
    // const { data: bannersData, isLoading: bannersLoading, error: bannersError, refetch: refetchBanners } = useFetchAllBanners();

    const [isRefreshing, setIsRefreshing] = React.useState(false);

    const refetch = async () => {
        setIsRefreshing(true);
        try {
            await Promise.all([refetchCategories(),
                // refetchBanners()
            ]);
        } finally {
            setIsRefreshing(false);
        }
    };

    if (isLoading) return <DynamicLoader />;
    if (error) return <DynamicError error={error} onRetry={refetch} />;

    return (
        <View className="bg-shadingLight pb-5 flex-1 justify-start">
            {/* Header Container - defines the shape and clips children */}
            <View
                style={{
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                }}
            >
                {/* Content Container - holds the actual header text and icons, with padding */}
                <View style={{ padding: 20, }}>
                    {/* Header */}
                    <View className='flex flex-row justify-between'>
                        <Text className='text-[30px] font-[800] text-text1'>Grocery Plus</Text>
                        <IconSymbol name='bell' iconSet='FontAwesome5' size={24} color={colors?.text1} />
                    </View>

                    {/* Location */}
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



            <FlatList
                ListHeaderComponent={() => {
                    return (
                        <>
                            <SearchBar />
                            {/* Banners Section */}
                            {/* <View className='w-full ml-[-20]' >
                                {bannersLoading ? (
                                    <DynamicLoader message="Loading banners..." />
                                ) : bannersError ? (
                                    <DynamicError error={bannersError} onRetry={refetchBanners} />
                                ) : (
                                    <ScrollableBanners banners={bannersData?.data || []} />
                                )}
                            </View> */}
                        </>
                    )
                }}
                data={data?.data || []}
                renderItem={({ item }) => <CategoryItem1 item={item} />}
                numColumns={2}
                contentContainerClassName='p-5 gap-4'
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: gpsh(40) }}
                className='bg-bg '
                bounces
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={refetch}
                        tintColor={colors?.secondary}
                        title={'Fetching Dashboard...'}
                        titleColor={colors?.text1}
                    />
                }
            />
        </View>
    );
}