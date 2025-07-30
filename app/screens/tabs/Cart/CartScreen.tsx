import useTheme from '@/hooks/useTheme';
import { useCartStore } from '@/store/cart/cartStore';
import { CMS_URL } from '@/utility/config';
import { convertToFloat } from '@/utility/utility';
import { Button, CachedImage, DynamicHeader, IconSymbol, Text, ThemedSafeArea } from '@atom';
import Details from '@molecule/Card/Details';
import DynamicLoader from '@molecule/Loader';

import React from 'react';
import { ActivityIndicator, FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import EmptyCart from './EmptyCart';
import { gpsw } from '@/style/theme';
import CartItem1 from '@/components/molecule/Card/Cart/CartItem1';


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
  const currencySymbol = cartItems?.[0]?.currencySymbol || '₹';


  const subtotal = cartItems?.reduce((sum: number, item: any) => {
    return (
      sum + (parseFloat(item?.product?.discountPrice || 0) * parseInt(item?.quantity || 0))
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
    <ThemedSafeArea>
      <View className="flex-1">
        <DynamicHeader title='Your Cart' rightComponent={<TouchableOpacity onPress={() => clearCart()}>
          <View className="flex items-center flex-row">
            <IconSymbol name="delete" size={24} color="#000" />
          </View>
        </TouchableOpacity>} />
        <ScrollView className="flex-1 bg-white p-4">
          <>
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
                renderItem={({ item }) => <CartItem1 item={item} />}
                ListEmptyComponent={<EmptyCart />}
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
          </>
        </ScrollView>
      </View>
    </ThemedSafeArea>
  );
}
