import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useWishlistStore } from '@/store/whishlist/wishlistStore';
import ProductItem1 from '@/components/molecule/Card/Product/ProductItem1';
import { DynamicHeader, ThemedSafeArea } from '@/components/atom';

const FavouriteProducts = () => {
    const { items, loading } = useWishlistStore();

    console.log('items', items)

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>Loading favourites...</Text>
            </View>
        );
    }

    return (
        <ThemedSafeArea>
            <View className="flex-1 bg-white">
                <DynamicHeader variant="back" title="Favourite Products" />
                <View className="flex-1 bg-shadingLight px-4 pt-4">
                    <FlatList
                        data={items}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <ProductItem1
                                item={item.product || item}
                                style={{ marginBottom: 16, alignItems: 'center' }}
                            />
                        )}
                        style={{ flexGrow: 1 }}
                        contentContainerStyle={{ paddingBottom: 16 }}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        horizontal={false}
                        ListEmptyComponent={
                            <Text className="text-center text-gray-400 mt-8">
                                No favourite products found.
                            </Text>
                        }
                    />
                </View>
            </View>
        </ThemedSafeArea>
    );
};

export default FavouriteProducts;
