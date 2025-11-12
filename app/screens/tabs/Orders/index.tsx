import { Button, DynamicHeader, ThemedSafeArea } from '@/components/atom';
import OrderCard from '@/components/molecule/Card/Order/OrderCard';
import { navigate } from '@/navigation/RootNavRef';
import { useOrderStore } from '@/store/order/orderStore';
import { useWishlistStore } from '@/store/whishlist/wishlistStore';
import React from 'react';
import { FlatList, Text, View } from 'react-native';

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
                        renderItem={({ item }) => <OrderCard order={item} />}
                        style={{ flexGrow: 1 }}
                        contentContainerStyle={{ paddingBottom: 20, gap: 10 }}
                        showsVerticalScrollIndicator={false}
                        horizontal={false}
                        ListEmptyComponent={
                            <View className='w-100 h-full justify-center items-center gap-2 pt-40'>
                                <Text className="text-center text-2xl font-bold text-textSecondary mt-8">
                                    No Orders found.
                                </Text>
                                <Button title='Order Now' onPress={() => {
                                    navigate('Products')
                                }} />
                            </View>
                        }
                    />
                </View>
            </View>
        </ThemedSafeArea>
    );
};

export default Orders;
