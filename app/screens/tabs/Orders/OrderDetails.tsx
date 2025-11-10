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
            <DynamicHeader title='Order Details' />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Order Info Card */}
                <View style={styles.card}>
                    <Text style={styles.orderId}>Order #{order.id}</Text>
                    <Text style={[styles.status, order.status === 'pending' ? styles.statusPending : styles.statusOther]}>
                        {order.status?.toUpperCase() || order.c?.toUpperCase()}
                    </Text>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.amount}>{order.currencySymbol}{order.total_amount}</Text>
                    <Text style={styles.payment}>Payment: <Text style={styles.paymentMethod}>{order.payment_method?.toUpperCase()}</Text></Text>
                </View>

                {/* Address Card */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Delivery Address</Text>
                    <Text style={styles.addressText}>
                        {order.delivery_address?.addressLine1 || 'N/A'}
                    </Text>
                    <Text style={styles.addressText}>
                        {order.delivery_address?.city || ''} {order.delivery_address?.state || ''} {order.delivery_address?.postalCode || ''}
                    </Text>
                </View>

                {/* Items Card */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Items</Text>
                    {order.items && order.items.length > 0 ? (
                        <FlatList
                            data={order.items}
                            keyExtractor={(item, idx) => item.id ? String(item.id) : String(idx)}
                            renderItem={({ item }) => (
                                <View style={styles.itemRow}>
                                    {item.product?.images?.[0]?.url ? (
                                        <Image source={{ uri: item.product.images[0].url }} style={styles.itemImage} />
                                    ) : (
                                        <View style={styles.itemImagePlaceholder} />
                                    )}
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.itemName}>{item.product?.name || 'Product'}</Text>
                                        <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
                                    </View>
                                    <Text style={styles.itemPrice}>{order.currencySymbol}{item.price}</Text>
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
        </ThemedSafeArea>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f8fa',
        padding: 16,
        flex: 1,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    orderId: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
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
        backgroundColor: '#e5fff5',
        color: '#27ae60',
    },
    totalLabel: {
        fontSize: 13,
        color: '#888',
        marginBottom: 2,
        marginTop: 2,
    },
    amount: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#e53e3e',
        marginBottom: 8,
    },
    payment: {
        fontSize: 14,
        color: '#444',
        marginBottom: 2,
    },
    paymentMethod: {
        fontWeight: 'bold',
        color: '#222',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    addressText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 2,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#f7f7f7',
        borderRadius: 10,
        padding: 8,
    },
    itemImage: {
        width: 44,
        height: 44,
        borderRadius: 10,
        marginRight: 12,
        backgroundColor: '#eee',
    },
    itemImagePlaceholder: {
        width: 44,
        height: 44,
        borderRadius: 10,
        marginRight: 12,
        backgroundColor: '#eee',
    },
    itemName: {
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
    },
    itemQty: {
        fontSize: 13,
        color: '#888',
        marginTop: 2,
    },
    itemPrice: {
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
        marginLeft: 8,
    },
    emptyText: {
        fontSize: 14,
        color: '#aaa',
        marginTop: 8,
    },
});