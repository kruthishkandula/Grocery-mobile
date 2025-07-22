import FeaturedCarousel from '@/components/atom/Carousel/FeaturedCarousel';
import OverlayLoader from '@/components/molecule/Loader/OverLayLoader';
import useTheme from '@/hooks/useTheme';
import { useCartStore } from '@/store/cart/cartStore';
import { CMS_URL } from '@/utility/config';
import { DynamicHeader, IconSymbol, Text } from '@atom';
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
  const carouselImages = (product?.all_images || []).map((img: any) => ({
    id: img.id,
    url: getImageUrl(img.url),
  }));


  return (
    <View className='flex-1'>
      <DynamicHeader title={product?.name} style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }} />
      < ScrollView className="flex-1 bg-shadingLight" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <FeaturedCarousel images={carouselImages} imageHeight={250} borderRadius={12} />

        {/* Product Details */}
        <View className="p-4">
          <Text className="text-[24px] font-extrabold mb-2">{product?.name}</Text>
          <Text className="text-[18px] text-[#3E3E3E] mb-2">{product?.short_description}</Text>

          {/* Price Section */}
          <View className="flex-row items-center justify-between my-4">
            <Text className='text-[29px] text-text1' >
              {product?.weight || 1} {product?.weight_unit}
            </Text>
            <View className="flex-1 items-end">
              <Text className="font-extrabold mb-2 text-[29px] text-primary">
                {product?.currency_symbol}{product?.discount_price ?? product?.base_price}
              </Text>

              {product?.discount_price && product?.discount_price < product?.base_price && (
                <Text className="text-base text-gray-400 line-through mb-2">
                  {product?.currency_symbol}{product?.base_price}
                </Text>
              )}
            </View>
          </View>

          {/* Description */}
          <Text className="text-[16px] font-light text-left text-[#3E3E3E] mb-4">{product?.description}</Text>

          {/* Cart Controls */}
          <View className="flex-row justify-end items-center gap-4 mt-4">
            {cartItem ? (
              <>
                <TouchableOpacity className="bg-gray-200 rounded-full px-3 py-1" onPress={handleDecrement}>
                  {/* <Text className="text-lg font-bold">-</Text> */}
                  <IconSymbol name='circle-minus' color={colors.text1} iconSet='FontAwesome6' />
                </TouchableOpacity>
                <Text className="text-[24px] mx-2">{cartItem.quantity}</Text>
                <TouchableOpacity className="bg-gray-200 rounded-full px-3 py-1" onPress={handleAddToCart}>
                  <IconSymbol name='circle-plus' color={colors.text1} iconSet='FontAwesome6' />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity className="flex flex-row bg-primary px-6 py-3 rounded-lg items-center justify-center flex-1" onPress={handleAddToCart}>
                <IconSymbol name="cart" size={20} color="#fff" />
                <Text className="text-white ml-2">Add to Cart</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
      <OverlayLoader open={cartLoading} text={`Updating Cart...`} />
    </View>
  );
}
