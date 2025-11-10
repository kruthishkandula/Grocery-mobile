import useTheme from '@/hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type OrderCardProps = {
    order: any;
};

const OrderCard = ({ order }: OrderCardProps) => {
    const { colors } = useTheme()
    const { navigate } = useNavigation<any>();
    const status = order.status || order.c;
    const statusColor = status === 'pending' ? colors.textPrimary : colors.textPrimary;
    const statusBg = status === 'pending' ? colors.warning : colors.success;

    return (
        <TouchableOpacity
            onPress={() => navigate('OrderDetails', { order: order })}
            style={[styles.card, { backgroundColor: colors.surfaceElevated }]}
            activeOpacity={0.85}
        >
            <View style={styles.headerRow}>
                <Text className='text-textPrimary'  style={styles.orderId}>Order #{order.id}</Text>
                <Text className='text-textPrimary' style={[styles.status, { backgroundColor: statusBg, color: statusColor }]}>
                    {status?.toUpperCase()}
                </Text>
            </View>
            <Text className='text-textPrimary' style={styles.amount}>Total: <Text style={styles.amountValue}>{order.currencySymbol}{order.total_amount.toFixed(2)}</Text></Text>
            <View style={styles.address}>
                <Text className='text-textPrimary' style={styles.addressTitle}>Delivery Address:</Text>
                <Text className='text-textPrimary' style={styles.addressText}>{order.delivery_address?.addressLine1 || 'N/A'}</Text>
                <Text className='text-textPrimary' style={styles.addressText}>
                    {order.delivery_address?.city || ''}{order.delivery_address?.city ? ', ' : ''}
                    {order.delivery_address?.state || ''}{order.delivery_address?.postalCode ? ' - ' : ''}
                    {order.delivery_address?.postalCode || ''}
                </Text>
            </View>
            <View style={[styles.itemsSection, { backgroundColor: colors.textInverse }]}>
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
                            <Text className='text-textPrimary' style={styles.itemName}>{item.product?.name || 'Product'}</Text>
                            <Text className='text-textPrimary' style={styles.itemQty}>Qty: {item.quantity}</Text>
                        </View>
                        <Text className='text-textPrimary' style={styles.itemPrice}>{order.currencySymbol}{item.price}</Text>
                    </View>
                ))}
                {order.items.length > 2 && (
                    <Text className='text-textSecondary' style={styles.moreItems}>+{order.items.length - 2} more items</Text>
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
        marginBottom: 4,
    },
    amountValue: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    address: {
        marginBottom: 10,
        marginTop: 2,
    },
    addressTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    addressText: {
        fontSize: 13,
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
    },
    itemName: {
        fontSize: 14,
        fontWeight: '500',
    },
    itemQty: {
        fontSize: 12,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
    },
    moreItems: {
        fontSize: 12,
        marginTop: 2,
        marginLeft: 4,
    },
});

export default OrderCard;