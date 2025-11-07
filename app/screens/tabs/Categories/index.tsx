import { useThemeContextActions } from '@/Themes'
import { getThemeColors } from '@/Themes/theme-config'
import CategoryItem1 from '@/components/molecule/Card/CategoryItem1'
import React from 'react'
import { FlatList, View } from 'react-native'

import { useFetchAllCategories } from '@/api/nodeapi/Categories/api'
import DynamicHeader from '@atom/DynamicHeader'
import DynamicError from '@molecule/Error'
import DynamicLoader from '@molecule/Loader'
import CategoryItem2 from '@/components/molecule/Card/CategoryItem2'
import { ThemedSafeArea } from '@/components/atom'

export default function Categories() {
    const { theme } = useThemeContextActions();
    const colors = getThemeColors(theme);

    const { data, isLoading, error, refetch: refetchCategories, } = useFetchAllCategories()



    if (isLoading) return <DynamicLoader />;
    if (error) return <DynamicError error={error} onRetry={refetchCategories} />;

    return (
        <ThemedSafeArea>
            <View className='flex-1' >
                <DynamicHeader variant='back' title='Categories' />
                <FlatList
                    //   ListHeaderComponent={SearchBar}
                    data={data?.data || []}
                    renderItem={({ item }) => <CategoryItem2 item={item} />}
                    numColumns={2}
                    contentContainerClassName='p-5 gap-4'
                    className='bg-surfaceBase'
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    showsVerticalScrollIndicator={false}
                    refreshing={isLoading}
                />
            </View>
        </ThemedSafeArea>
    )
}