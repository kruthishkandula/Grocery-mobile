import { CachedImage } from '@/components/atom';
import useTheme from '@/hooks/useTheme';
import { navigate } from '@/navigation/RootNavRef';
import { useCartStore } from '@/store/cart/cartStore';
import { gpsw } from '@/style/theme';
import { convertToFloat } from '@/utility/utility';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export interface CartItem1Props {
    item: any
}

const CartItem1 = ({ item }: CartItem1Props) => {
    const { colors } = useTheme();
    const { setQuantity, removeItem } = useCartStore();
    const currencySymbol = item?.currencySymbol || '₹';


    if (item?.quantity > 0 && !item?.product) {
        return null;
    }
    let product_details = {
        ...item,
        quantity: (typeof item?.quantity === 'string' ? parseInt(item?.quantity) : item?.quantity) || 1,
        ...(item?.product && { ...item?.product } || {}),
    }

    return (
        <TouchableOpacity
            onPress={() => navigate('ProductDetails', product_details)}
            style={{
                shadowColor: colors.textPrimary,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                elevation: 2,
                backgroundColor: colors.surfaceElevated,
                borderRadius: 8,
                marginBottom: 8,
            }} className="flex-row justify-between items-center p-4 border-b border-borderSubtle">
            <View className="flex-row items-center">
                {product_details?.images && (
                    <CachedImage
                        name={product_details?.images?.[0]?.url}
                        style={{ width: 48, height: 48, borderRadius: 8, marginRight: 12 }}
                    />
                )}
                <View>
                    <Text className="font-semibold text-textPrimary">{product_details?.name}</Text>
                    <Text className="text-xs text-textSecondary">
                        {currencySymbol}{product_details?.discountPrice}
                    </Text>
                    <Text numberOfLines={3} style={{
                        maxWidth: gpsw(150)
                    }} className="text-xs text-textSecondary">
                        {product_details?.shortDescription}
                    </Text>
                </View>
            </View>

            {/* controllers */}
            <View className="flex-col items-end gap-5">
                <View className="flex-row items-center">
                    <TouchableOpacity
                        className="bg-primary rounded-md px-3"
                        onPress={() =>
                            Number(item.quantity) > 1
                                ? setQuantity({
                                    id: item.id,
                                    quantity: (typeof item.quantity === 'string' ? parseInt(item.quantity) : item
                                        .quantity) - 1,
                                    product: item.product,
                                })
                                : removeItem(item.id)
                        }
                    >
                        <Text className="text-lg text-textPrimary font-medium">-</Text>
                    </TouchableOpacity>
                    <Text className="mx-2 text-textPrimary">{item.quantity}</Text>
                    <TouchableOpacity
                        className="bg-primary rounded-md px-3"
                        onPress={() =>
                            setQuantity({
                                id: item.id,
                                quantity: (typeof item.quantity === 'string' ? parseInt(item.quantity) : item
                                    .quantity) + 1,
                                product: item.product,
                            })
                        }
                    >
                        <Text className="text-lg text-textPrimary font-medium">+</Text>
                    </TouchableOpacity>
                </View>

                <Text className="ml-4 text-accent font-semibold">
                    {currencySymbol} {convertToFloat((product_details?.discountPrice || 0) * item.quantity)}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default CartItem1