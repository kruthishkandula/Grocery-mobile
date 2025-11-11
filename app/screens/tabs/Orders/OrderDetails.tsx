import { Button, DynamicHeader, ThemedSafeArea } from '@/components/atom';
import { goBack } from '@/navigation/RootNavRef';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function OrderDetails() {
    const route = useRoute<any>();
    const { order } = route.params;

    return (
        <ThemedSafeArea>
            <View className='flex-grow flex bg-surfaceBase' >
                <DynamicHeader title='Order Details' />
                <ScrollView style={styles.container} contentContainerClassName='pb-4' showsVerticalScrollIndicator={false}>
                    {/* Order Info Card */}
                    <View className='border border-textPrimary' style={[styles.card]}>
                        <Text className='text-textPrimary' style={styles.orderId}>Order #{order.id}</Text>
                        <Text className='text-textPrimary' style={[styles.status, order.status === 'pending' ? styles.statusPending : styles.statusOther]}>
                            {order.status?.toUpperCase() || order.c?.toUpperCase()}
                        </Text>
                        <Text className='text-textPrimary' style={styles.totalLabel}>Total</Text>
                        <Text className='text-textPrimary' style={styles.amount}>{order.currencySymbol}{order.total_amount.toFixed(2)}</Text>
                        <Text className='text-textPrimary' style={styles.payment}>Payment: <Text className='text-textPrimary' style={styles.paymentMethod}>{order.payment_method?.toUpperCase()}</Text></Text>
                    </View>

                    {/* Address Card */}
                    <View style={styles.card}>
                        <Text className='text-textPrimary' style={styles.sectionTitle}>Delivery Address</Text>
                        <Text className='text-textSecondary' style={styles.addressText}>
                            {order.delivery_address?.addressLine1 || 'N/A'}
                        </Text>
                        <Text className='text-textSecondary' style={styles.addressText}>
                            {order.delivery_address?.city || ''} {order.delivery_address?.state || ''} {order.delivery_address?.postalCode || ''}
                        </Text>
                    </View>

                    {/* Items Card */}
                    <View style={styles.card}>
                        <Text className='text-textPrimary' style={styles.sectionTitle}>Items</Text>
                        {order.items && order.items.length > 0 ? (
                            <FlatList
                                data={order.items}
                                keyExtractor={(item, idx) => item.id ? String(item.id) : String(idx)}
                                renderItem={({ item }) => (
                                    <View className='bg-surfaceElevated' style={styles.itemRow}>
                                        {item.product?.images?.[0]?.url ? (
                                            <Image source={{ uri: item.product.images[0].url }} style={styles.itemImage} />
                                        ) : (
                                            <View style={styles.itemImagePlaceholder} />
                                        )}
                                        <View style={{ flex: 1 }}>
                                            <Text className='text-textPrimary' style={styles.itemName}>{item.product?.name || 'Product'}</Text>
                                            <Text className='text-textPrimary' style={styles.itemQty}>Qty: {item.quantity}</Text>
                                        </View>
                                        <Text className='text-textPrimary' style={styles.itemPrice}>{order.currencySymbol}{item.price}</Text>
                                    </View>
                                )}
                                scrollEnabled={false}
                            />
                        ) : (
                            <Text style={styles.emptyText}>No items found in this order.</Text>
                        )}
                    </View>
                    <View className='mt-auto' >
                        <Button variant='primary' title="Done" onPress={() => goBack()} />
                    </View>
                </ScrollView>
            </View>
        </ThemedSafeArea>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
    },
    card: {
        borderRadius: 24,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        // shadowColor: '#000',
        // shadowOpacity: 0.06,
        // shadowRadius: 8,
        // shadowOffset: { width: 0, height: 2 },
        // elevation: 2,
    },
    orderId: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    status: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 8,
        overflow: 'hidden',
    },
    statusPending: {
        backgroundColor: '#fff5e5',
        color: '#e67e22',
    },
    statusOther: {
        color: '#27ae60',
    },
    totalLabel: {
        fontSize: 13,
        marginBottom: 2,
        marginTop: 2,
    },
    amount: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    payment: {
        fontSize: 14,
        marginBottom: 2,
    },
    paymentMethod: {
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    addressText: {
        fontSize: 14,
        marginBottom: 2,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 10,
        padding: 8,
    },
    itemImage: {
        width: 44,
        height: 44,
        borderRadius: 10,
        marginRight: 12,
    },
    itemImagePlaceholder: {
        width: 44,
        height: 44,
        borderRadius: 10,
        marginRight: 12,
    },
    itemName: {
        fontSize: 15,
        fontWeight: '500',
    },
    itemQty: {
        fontSize: 13,
        marginTop: 2,
    },
    itemPrice: {
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 8,
    },
    emptyText: {
        fontSize: 14,
        marginTop: 8,
    },
});