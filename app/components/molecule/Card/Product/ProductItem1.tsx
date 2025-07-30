import { CachedImage, IconSymbol, Text } from '@/components/atom';
import useTheme from '@/hooks/useTheme';
import { navigate } from '@/navigation/RootNavRef';
import { useCartStore } from '@/store/cart/cartStore';
import { useWishlistStore } from '@/store/whishlist/wishlistStore';
import { gpsw } from '@/style/theme';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { ImageProps, Modal, TouchableOpacity, View, ViewStyle } from 'react-native';

export interface ProductItem1Props {
    item: any;
    imageStyle?: ImageProps; // Optional style for the image
    style?: ViewStyle; // Optional style for the component
}

const getCartItem = (productId: string, cartDataItems: any) => {
    return cartDataItems.find((item: any) => item.id == productId);
};


export default function ProductItem1({ item, style, imageStyle }: ProductItem1Props) {
    const { colors } = useTheme();

    const [variantModalVisible, setVariantModalVisible] = useState(false);
    const [variantOptions, setVariantOptions] = useState<any[]>([]);
    const [variantProduct, setVariantProduct] = useState<any>(null);

    const {
        items: cartItems,
        setQuantity,
        removeItem,
    } = useCartStore();

    const {
        items: wishlistItems,
        addWishlistItem,
        removeWishlistItem,
    } = useWishlistStore();

    let cartItem = getCartItem(item.id, cartItems);
    let hasVariants = item.variants && item.variants.length > 0;
    let isWishlistItem = wishlistItems.find((i: any) => i.id === item.id);


    const handleAddToCart = (item: any) => {
        let existing_cart_item = getCartItem(item.id, cartItems);
        console.log('existing_cart_item---', existing_cart_item)
        // return;
        // If item already exists in cart, you can handle it here

        if (existing_cart_item) {
            setQuantity({
                ...existing_cart_item,
                quantity: existing_cart_item.quantity + 1,
            });
        } else {
            setQuantity({
                id: item.id,
                quantity: 1,
                product: item,
            })
        }
    };

    const handleDecrement = ({ id: productId }: { id: string }) => {
        let existing_cart_item = getCartItem(productId, cartItems);
        // If item already exists in cart, you can handle it here
        console.log('existing_cart_item', existing_cart_item, productId)
        if (existing_cart_item && existing_cart_item?.quantity > 1) {
            setQuantity({
                ...existing_cart_item,
                quantity: existing_cart_item.quantity - 1,
            });
        } else {
            removeItem(productId)
        }
    };

    return (
        <>
            <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => navigate('ProductDetails', item)}
                className="flex-1 flex-col bg-bg rounded-xl shadow-sm mx-[10px] p-2 justify-between"
                style={[{ maxWidth: 170 }, style]}
            >
                <CachedImage
                    name={item.images?.[0].url}
                    height={130}
                    style={[{ borderRadius: 8, backgroundColor: colors.bg, width: '100%' }, imageStyle]}
                    contentFit="cover"
                />

                <View className="flex-1">
                    <Text numberOfLines={1} style={{
                        maxWidth: '100%',
                        fontSize: gpsw(12)
                    }} variant='medium14' className="text-text1">{item.name}</Text>

                    <View className="flex-col items-start ">
                        <Text numberOfLines={1} style={{
                            maxWidth: '100%',
                            fontSize: gpsw(14)
                        }} variant='bold18' className="text-tertiary">
                            {item.currencySymbol}
                            {item.discountPrice ?? item.basePrice}/{item.weightUnit}
                        </Text>
                        {item.discountPrice && item.discountPrice < item.basePrice && (
                            <Text numberOfLines={1} style={{
                                maxWidth: '100%',
                                fontSize: gpsw(10),
                            }} variant='regular14' className="text-text1 ml-2 line-through">
                                {item.currencySymbol}
                                {item.basePrice}
                                /{item.weightUnit}
                            </Text>
                        )}
                    </View>
                </View>

                {/* Cart Controls */}
                <View style={{ maxWidth: 150 }} className="flex-1 p-2 w-full flex-row items-center justify-between">
                    {cartItem ? (
                        <>
                            <TouchableOpacity
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                className="bg-primary px-2 py-1"
                                onPress={(e) => {
                                    Haptics.selectionAsync()
                                    e.stopPropagation(); handleDecrement(item)
                                }}
                            >
                                <Text className="text-lg text-text2 font-bold">-</Text>
                            </TouchableOpacity>
                            <Text variant='bold18' style={{
                                fontSize: gpsw(16),
                            }} className="m-2">{cartItem.quantity}</Text>
                            <TouchableOpacity
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                className="bg-primary px-2 py-1"
                                onPress={(e) => {
                                    Haptics.selectionAsync()
                                    e.stopPropagation(); handleAddToCart(item)
                                }}
                            >
                                <Text className="text-xl text-text2 font-bold">+</Text>
                            </TouchableOpacity>
                        </>
                    ) : hasVariants ? (
                        <TouchableOpacity
                            className="flex flex-row bg-primary px-[16px] py-[10px] rounded-[7px] items-center justify-center flex-1"
                            onPress={(e) => {
                                Haptics.selectionAsync()
                                e.stopPropagation(); handleAddToCart(item)
                            }}
                        >
                            <IconSymbol name="cart" size={16} color="#fff" />
                            <Text className="text-white ml-2">Select Variant</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            className="flex flex-row bg-primary px-[16px] py-[10px] rounded-[7px] items-center justify-center flex-1"
                            onPress={(e) => {
                                Haptics.selectionAsync()
                                e.stopPropagation(); handleAddToCart(item)
                            }}
                        >
                            <IconSymbol name="cart" size={16} color="#fff" />
                            <Text variant='light12' numberOfLines={1} style={{ maxWidth: '100%', fontSize: gpsw(10) }} className="text-white ml-2">Add to Cart</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Wishlist Controls */}
                <TouchableOpacity
                    className="flex bg-[rgba(255,255,255,0.2)] absolute top-3 right-2 flex-row px-[8px] py-[8px] rounded-[7px] items-center justify-center flex-1"
                    onPress={(e) => {
                        isWishlistItem ? removeWishlistItem(item.id) : addWishlistItem({
                            id: item.id,
                            product: item,
                        })
                    }}
                >
                    <IconSymbol name={isWishlistItem ? "heart-fill" : "heart"} iconSet={'Octicons'} size={24} color={isWishlistItem ? "red" : "red"} />
                </TouchableOpacity>
            </TouchableOpacity>

            {/* Variant Modal */}
            <Modal
                visible={variantModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setVariantModalVisible(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 20, minWidth: 300 }}>
                        <Text className="text-lg font-bold mb-2">Choose a Variant</Text>
                        {variantOptions.map((variant) => (
                            <TouchableOpacity
                                key={variant.id}
                                className="mb-2 p-2 border rounded"
                                onPress={() => {
                                    handleAddToCart(variant);
                                    setVariantModalVisible(false);
                                }}
                            >
                                <Text>{variant.name} - ₹{variant.discountPrice ?? variant.price}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity onPress={() => setVariantModalVisible(false)} className="mt-2">
                            <Text className="text-red-500">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    )
}