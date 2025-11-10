import FeaturedCarousel from '@/components/atom/Carousel/FeaturedCarousel';
import OverlayLoader from '@/components/molecule/Loader/OverLayLoader';
import useTheme from '@/hooks/useTheme';
import { useCartStore } from '@/store/cart/cartStore';
import { CMS_URL } from '@/utility/config';
import { DynamicHeader, IconSymbol, Text, ThemedSafeArea } from '@atom';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

export default function ProductDetails() {
  const { params } = useRoute<any>();
  const { goBack } = useNavigation<any>();
  const { colors } = useTheme();
  const { items: cartItems, setQuantity, removeItem, loading: cartLoading, products: productCache } = useCartStore();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    setProduct(params);
  }, [params]);

  const cartItem = cartItems.find((item: any) => item.product_variant_id == product?.id || item.id == product?.id);

  const handleAddToCart = () => {
    if (cartItem) {
      setQuantity({
        ...cartItem,
        quantity: Number(cartItem.quantity) + 1,
      });
    } else {
      setQuantity({
        id: product?.id,
        quantity: 1,
        product: product,
      });
    }
  };
  const handleDecrement = () => {
    if (cartItem && cartItem.quantity > 1) {
      setQuantity({
        ...cartItem,
        quantity: cartItem.quantity - 1,
      });
    } else if (cartItem && cartItem.quantity === 1) {
      removeItem(cartItem.id);
    }
  };

  // Helper to get full image url
  const getImageUrl = (url: string) => url?.startsWith('/') ? `${CMS_URL}${url}` : url;

  // Prepare images for carousels
  const carouselImages = (product?.images || []).map((img: any) => ({
    id: img.id,
    url: getImageUrl(img.url),
  }));


  return (
    <ThemedSafeArea>
      <DynamicHeader title={product?.name} style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }} />
      < ScrollView className="flex-1 bg-surfaceBase" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <FeaturedCarousel images={carouselImages} imageHeight={250} borderRadius={12} />

        {/* Product Details */}
        <View className="p-4">
          <Text variant='bold18' className="text-[28px] font-extrabold text-textPrimary mb-2">{product?.name}</Text>
          <Text className="text-[18px] text-textSecondary mb-2">{product?.shortDescription}</Text>

          {/* Price Section */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className='text-[28px] text-text1 text-textPrimary' >
              {product?.weight || 1} {product?.weightUnit}
            </Text>
            <View className="flex-1 items-end">
              <Text variant='bold18' className="mb-2 text-[29px] text-accent  text-tertiary">
                {product?.currencySymbol}{product?.discountPrice ?? product?.basePrice}
              </Text>

              {product?.discountPrice && product?.discountPrice < product?.basePrice && (
                <Text className="text-base italic text-textPrimary line-through mb-2">
                  {product?.currencySymbol}{product?.basePrice}
                </Text>
              )}
            </View>
          </View>

          {/* Cart Controls */}
          <View className="flex-row justify-end items-center gap-4 mb-6">
            {cartItem ? (
              <>
                <TouchableOpacity
                  className="bg-primary rounded-md px-3 py-2"
                  onPress={handleDecrement}
                >
                  <Text className="text-lg text-textPrimary font-bold">-</Text>
                </TouchableOpacity>
                <Text className="mx-2 text-textPrimary">{cartItem.quantity}</Text>
                <TouchableOpacity
                  className="bg-primary rounded-md px-3 py-2"
                  onPress={handleAddToCart}
                >
                  <Text className="text-lg text-textPrimary font-bold">+</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity className="flex flex-row bg-primary px-6 py-3 rounded-lg items-center justify-center flex-1" onPress={handleAddToCart}>
                <IconSymbol name="cart" size={20} color={colors.textInverse} />
                <Text className="text-textInverse ml-2">Add to Cart</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Description */}
          <Text className="text-[16px] font-light text-left text-textSecondary mb-4">{product?.description}</Text>

        </View>
      </ScrollView>
      <OverlayLoader open={cartLoading} text={`Updating Cart...`} />
    </ThemedSafeArea>
  );
}
