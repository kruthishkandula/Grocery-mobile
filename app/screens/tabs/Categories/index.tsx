import { useThemeContextActions } from '@/Themes'
import { getThemeColors } from '@/Themes/theme-config'
import CategoryItem1 from '@molecule/CategoryItem1'
import React from 'react'
import { FlatList, View } from 'react-native'

import { useFetchAllCategories } from '@/api/nodeapi/Categories/api'
import DynamicHeader from '@atom/DynamicHeader'
import DynamicError from '@molecule/Error'
import DynamicLoader from '@molecule/Loader'

export default function Categories() {
    const { theme } = useThemeContextActions();
    const colors = getThemeColors(theme);

    const { data, isLoading, error, refetch: refetchCategories, } = useFetchAllCategories()



    if (isLoading) return <DynamicLoader />;
    if (error) return <DynamicError error={error} onRetry={refetchCategories} />;

    return (
        <View className='flex-1' >
            <DynamicHeader variant='back' title='Categories' />
            <FlatList
                //   ListHeaderComponent={SearchBar}
                data={data?.data || []}
                renderItem={({ item }) => <CategoryItem1 item={item} />}
                numColumns={2}
                contentContainerClassName='p-5 gap-4'
                className='bg-shadingLight'
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
                refreshing={isLoading}
            />
        </View>
    )
}