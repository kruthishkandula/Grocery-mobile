import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type OrderCardProps = {
    order: any;
};

const OrderCard = ({ order }: OrderCardProps) => {
    const { navigate } = useNavigation<any>();
    const status = order.status || order.c;
    const statusColor = status === 'pending' ? '#e67e22' : '#27ae60';
    const statusBg = status === 'pending' ? '#fff5e5' : '#e5fff5';

    return (
        <TouchableOpacity
            onPress={() => navigate('OrderDetails', { order: order })}
            style={styles.card}
            activeOpacity={0.85}
        >
            <View style={styles.headerRow}>
                <Text style={styles.orderId}>Order #{order.id}</Text>
                <Text style={[styles.status, { backgroundColor: statusBg, color: statusColor }]}>
                    {status?.toUpperCase()}
                </Text>
            </View>
            <Text style={styles.amount}>Total: <Text style={styles.amountValue}>{order.currencySymbol}{order.total_amount}</Text></Text>
            <View style={styles.address}>
                <Text style={styles.addressTitle}>Delivery Address:</Text>
                <Text style={styles.addressText}>{order.delivery_address?.addressLine1 || 'N/A'}</Text>
                <Text style={styles.addressText}>
                    {order.delivery_address?.city || ''}{order.delivery_address?.city ? ', ' : ''}
                    {order.delivery_address?.state || ''}{order.delivery_address?.postalCode ? ' - ' : ''}
                    {order.delivery_address?.postalCode || ''}
                </Text>
            </View>
            <View style={styles.itemsSection}>
                {order.items.slice(0, 2).map(item => (
                    <View key={item.id} style={styles.itemRow}>
                        {item.product?.images?.[0]?.url ? (
                            <Image
                                source={{ uri: item.product.images[0].url }}
                                style={styles.itemImage}
                            />
                        ) : (
                            <View style={styles.itemImagePlaceholder} />
                        )}
                        <View style={{ flex: 1 }}>
                            <Text style={styles.itemName}>{item.product?.name || 'Product'}</Text>
                            <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
                        </View>
                        <Text style={styles.itemPrice}>{order.currencySymbol}{item.price}</Text>
                    </View>
                ))}
                {order.items.length > 2 && (
                    <Text style={styles.moreItems}>+{order.items.length - 2} more items</Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 18,
        marginBottom: 14,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    orderId: {
        fontWeight: 'bold',
        fontSize: 17,
        color: '#222',
    },
    status: {
        fontSize: 13,
        fontWeight: 'bold',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 8,
        overflow: 'hidden',
        minWidth: 70,
        textAlign: 'center',
    },
    amount: {
        fontSize: 15,
        color: '#888',
        marginBottom: 4,
    },
    amountValue: {
        fontWeight: 'bold',
        color: '#e53e3e',
        fontSize: 16,
    },
    address: {
        marginBottom: 10,
        marginTop: 2,
    },
    addressTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 2,
    },
    addressText: {
        fontSize: 13,
        color: '#555',
    },
    itemsSection: {
        backgroundColor: '#f7f7fa',
        borderRadius: 10,
        padding: 8,
        marginTop: 6,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    itemImage: {
        width: 36,
        height: 36,
        borderRadius: 8,
        marginRight: 10,
        backgroundColor: '#eee',
    },
    itemImagePlaceholder: {
        width: 36,
        height: 36,
        borderRadius: 8,
        marginRight: 10,
        backgroundColor: '#eee',
    },
    itemName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#222',
    },
    itemQty: {
        fontSize: 12,
        color: '#888',
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: '600',
        color: '#222',
        marginLeft: 8,
    },
    moreItems: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
        marginLeft: 4,
    },
});

export default OrderCard;