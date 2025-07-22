import useTheme from '@/hooks/useTheme';
import { useCartStore } from '@/store/cart/cartStore';
import { CMS_URL } from '@/utility/config';
import { convertToFloat } from '@/utility/utility';
import { Button, CachedImage, DynamicHeader, IconSymbol } from '@atom';
import Details from '@molecule/Card/Details';
import DynamicLoader from '@molecule/Loader';

import React from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import EmptyCart from './EmptyCart';


const getImageUrl = (image: string) => {
  if (image) {
    if (image?.startsWith("/uploads/")) {
      return `${CMS_URL}${image}`; // Replace with your base URL
    }
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image;
    }
  }
  return `https://example.com/image`; // Replace with your base URL
}

export default function CartScreen({ navigation }: any) {
  const { colors } = useTheme();
  let delivery_fee_caluclation = [
    {
      min: 0,
      max: 99,
      fee: 30,
    },
    {
      min: 100,
      max: 199,
      fee: 20,
    },
    {
      min: 200,
      max: 299,
      fee: 10,
    },
    {
      min: 300,
      max: Infinity,
      fee: 0,
    }
  ]

  // Zustand cart store for local state only
  const { items: cartItems, loading: isCartLoading, setQuantity, removeItem, clearCart } = useCartStore();
  const currency = cartItems?.[0]?.currency || 'INR';
  const currencySymbol = cartItems?.[0]?.currency_symbol || '₹';


  const subtotal = cartItems?.reduce((sum: number, item: any) => {
    return (
      sum + (parseFloat(item?.product?.discount_price || 0) * parseInt(item?.quantity || 0))
    );
  }, 0);

  let calculatedDeliveryFee = delivery_fee_caluclation.find(fee => {
    return subtotal >= fee.min && subtotal <= fee.max;
  });

  const deliveryFee = calculatedDeliveryFee?.fee || 0;
  const surgeFee = 0;
  const couponDiscount = 0;
  const total = subtotal + deliveryFee + surgeFee - couponDiscount;

  if (isCartLoading) {
    return (
      <DynamicLoader message='Loading your cart...' />
    )
  }

  return (
    <View className="flex-1">
      <DynamicHeader title='Your Cart' rightComponent={<TouchableOpacity onPress={() => clearCart()}>
        <View className="flex items-center flex-row">
          <IconSymbol name="delete" size={24} color="#000" />
        </View>
      </TouchableOpacity>} />
      <View className="flex-1 bg-white p-4">
        {isCartLoading ? (
          <View className='flex-1 justify-center items-center'>
            <ActivityIndicator size="large" color={colors?.primary} />
            <Text>Loading...</Text>
          </View>
        ) : (
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              if (item?.quantity > 0 && !item?.product) {
                return null;
              }
              let product_details = {
                ...item,
                quantity: (typeof item?.quantity === 'string' ? parseInt(item?.quantity) : item?.quantity) || 1,
                ...(item?.product && { ...item?.product } || {}),
              }

              return (
                <View className="flex-row justify-between items-center py-2 border-b border-gray-100">
                  <View className="flex-row items-center">
                    {product_details?.all_images && (
                      <CachedImage
                        name={getImageUrl(product_details?.all_images?.[0]?.url)}
                        style={{ width: 48, height: 48, borderRadius: 8, marginRight: 12 }}
                      />
                    )}
                    <View>
                      <Text className="font-semibold">{product_details?.name}</Text>
                      <Text className="text-xs text-gray-500">
                        {currencySymbol}{product_details?.discount_price}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {product_details?.short_description}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-col items-end gap-5">
                    <View className="flex-row items-center">
                      <TouchableOpacity
                        className="bg-gray-200 rounded-full px-2"
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
                        <Text className="text-lg font-bold">-</Text>
                      </TouchableOpacity>
                      <Text className="mx-2">{item.quantity}</Text>
                      <TouchableOpacity
                        className="bg-gray-200 rounded-full px-2"
                        onPress={() =>
                          setQuantity({
                            id: item.id,
                            quantity: (typeof item.quantity === 'string' ? parseInt(item.quantity) : item
                              .quantity) + 1,
                            product: item.product,
                          })
                        }
                      >
                        <Text className="text-lg font-bold">+</Text>
                      </TouchableOpacity>
                    </View>
                    <Text className="ml-4 font-semibold">
                      {currencySymbol} {convertToFloat((product_details?.discount_price || 0) * item.quantity)}
                    </Text>
                  </View>
                </View>
              )
            }}
            ListEmptyComponent={<EmptyCart width={'100%'} style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }} />}
            contentContainerClassName='gap-4'
          />
        )}


        {
          cartItems.length > 0 && (
            <View className="bg-gray-50 rounded-lg p-4 shadow">
              <Details
                top={{
                  'subtotal': subtotal.toFixed(2),
                  'delivery_fee': deliveryFee == 0 ? 'Free' : deliveryFee.toFixed(2),
                  'surge_fee': surgeFee.toFixed(2),
                }}
                bottom={{
                  'coupon_discount': couponDiscount.toFixed(2),
                  'total': total.toFixed(2),
                }}
                mapData={{
                  'subtotal': 'Sub total',
                  'delivery_fee': 'Delivery Fee',
                  'surge_fee': 'Surge Fee',
                  'coupon_discount': 'Coupon Discount',
                  'total': 'Total',
                }}
              />
              <Button
                title='Checkout'
                className='text-pink-900 mt-4'
                onPress={() => navigation.navigate('Checkout', { total, currency, currencySymbol })}
              />
            </View>
          )
        }
      </View>
    </View>
  );
}
