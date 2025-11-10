import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useWishlistStore } from '@/store/whishlist/wishlistStore';
import OrderCard from '@/components/molecule/Card/Order/OrderCard';
import { DynamicHeader, ThemedSafeArea } from '@/components/atom';
import { useOrderStore } from '@/store/order/orderStore';

const Orders = () => {
    const { items, loading } = useWishlistStore();
    const { orders } = useOrderStore();

    console.log('orders---', JSON.stringify(orders))

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>Loading orders...</Text>
            </View>
        );
    }

    return (
        <ThemedSafeArea>
            <View className="flex-1 bg-surfaceBase">
                <DynamicHeader variant="back" title="All Orders" />
                <View className="flex bg-shadingLight px-4 pt-4 pb-10">
                    <FlatList
                        data={orders}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => <OrderCard order={item} />}
                        style={{ flexGrow: 1 }}
                        contentContainerStyle={{ paddingBottom: 20, gap: 10 }}
                        showsVerticalScrollIndicator={false}
                        horizontal={false}
                        ListEmptyComponent={
                            <Text className="text-center text-textSecondary mt-8">
                                No favourite products found.
                            </Text>
                        }
                    />
                </View>
            </View>
        </ThemedSafeArea>
    );
};

export default Orders;
