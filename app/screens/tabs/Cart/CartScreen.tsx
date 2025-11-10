import useTheme from '@/hooks/useTheme';
import { useCartStore } from '@/store/cart/cartStore';
import { Button, DynamicHeader, IconSymbol, Text, ThemedSafeArea } from '@atom';
import Details from '@molecule/Card/Details';
import DynamicLoader from '@molecule/Loader';

import CartItem1 from '@/components/molecule/Card/Cart/CartItem1';
import React from 'react';
import { ActivityIndicator, FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import EmptyCart from './EmptyCart';


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


  const DeliverySummary = () => {
    return (
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
    )
  }

  if (isCartLoading) {
    return (
      <DynamicLoader message='Loading your cart...' />
    )
  }

  return (
    <ThemedSafeArea>
      <View className="flex-1">
        <DynamicHeader title='Your Cart' rightComponent={<TouchableOpacity onPress={() => navigation.navigate('FavouriteProducts')}>
          <View className="flex items-center flex-row">
            <IconSymbol name="favorite-outline" size={22} color={colors.textPrimary} />
          </View>
        </TouchableOpacity>} />
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="flex-1 bg-surfaceBase p-4 ">
          <>
            {cartItems.length > 0 && <TouchableOpacity className='flex self-end mb-2 bg-info p-2 rounded-lg' onPress={() => clearCart()}>
              <View className="flex items-center flex-row">
                <IconSymbol name="delete" size={20} color={colors.textPrimary} />
                <Text className="ml-2 text-textPrimary">Clear Cart</Text>
              </View>
            </TouchableOpacity>}
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
                <View className="bg-surfaceElevated rounded-lg p-4  mt-4 shadow">
                  <DeliverySummary />
                  <Button
                    title='Checkout'
                    className='text-pink-900 mt-4'
                    onPress={() => navigation.navigate('Checkout', {
                      total, currency, currencySymbol, top: {
                        'subtotal': subtotal.toFixed(2),
                        'delivery_fee': deliveryFee == 0 ? 'Free' : deliveryFee.toFixed(2),
                        'surge_fee': surgeFee.toFixed(2),
                      }, DeliverySummary
                    })}
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
