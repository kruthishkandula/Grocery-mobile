import { useFetchAllCategories } from '@/api/nodeapi/Categories/api';
import { useFetchProductsByCategory } from '@/api/nodeapi/Products/api';
import DynamicError from '@/components/molecule/Error';
import DynamicLoader from '@/components/molecule/Loader';
import OverlayLoader from '@/components/molecule/Loader/OverLayLoader';
import useTheme from '@/hooks/useTheme';
import { useCartStore } from '@/store/cart/cartStore';
import { useWishlistStore } from '@/store/whishlist/wishlistStore';
import { IconSymbol, Text } from '@atom';
import DynamicHeader from '@atom/DynamicHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Modal, RefreshControl, TouchableOpacity, View } from 'react-native';


export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { params } = useRoute<any>();
  const { goBack, navigate } = useNavigation<any>();
  const [categories, setCategories] = useState<any[]>([]);
  const { colors } = useTheme();
  const {
    items: cartItems,
    setQuantity,
    removeItem,
    loading: cartLoading,
    products: productCache,
  } = useCartStore();

  const {
    items: wishlistItems,
    addWishlistItem,
    removeWishlistItem,
  } = useWishlistStore();

  // Use cartItems as the source of truth for cart items
  const cartDataItems = cartItems || [];

  const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError, refetch: refetchCategories } = useFetchAllCategories();
  const { data: productsData, isLoading: productsLoading, error: productsError, refetch: refetchProducts } = useFetchProductsByCategory({ categoryId: selectedCategory });

  // Helper to get product image url
  const getProductImage = (item: any) => {
    const img = item.images?.[0];
    if (!img) return undefined;
    return img.formats?.medium?.url || img.formats?.small?.url || img.formats?.thumbnail?.url || img.url;
  };

  // Get cart item for a product
  const getCartItem = (productId: string) => {
    return cartDataItems.find((item: any) => item.id == productId);
  };

  // Use product cache for instant UI
  const getProductFromCache = (id: string) => productCache?.[id];

  // Handle add/increment/decrement using cartStore methods
  const handleAddToCart = (item: any) => {
    let existing_cart_item = getCartItem(item.id);
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
    let existing_cart_item = getCartItem(productId);
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

  console.log('selectedCategory', selectedCategory)

  // Category selection logic
  useEffect(() => {
    if (categoriesData?.data?.length > 0) {
      let selected_category_index = categoriesData?.data?.findIndex((i: any) => i?.id == params?.id);
      let id = categoriesData?.data?.[selected_category_index]?.id;
      let categories_data = categoriesData?.data || [];
      categories_data.push(...categories_data.splice(0, selected_category_index));
      setCategories(categories_data);
      if (categories && id) {
        setSelectedCategory(id);
        setActiveIndex(id);
      }
    }
  }, [categoriesData]);

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const refetch = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([refetchProducts()]);
    } finally {
      setIsRefreshing(false);
    }
  };


  if (categoriesLoading) return <DynamicLoader message={"Loading categories..."} />;
  if (categoriesError) return <DynamicError error={categoriesError} onRetry={refetchCategories} />;

  // Animated underline logic
  const handleTabPress = (index: number, id: string) => {
    setSelectedCategory(id);
    setActiveIndex(index);
  };

  const [variantModalVisible, setVariantModalVisible] = useState(false);
  const [variantOptions, setVariantOptions] = useState<any[]>([]);
  const [variantProduct, setVariantProduct] = useState<any>(null);

  return (
    <View className='flex-1 bg-shadingLight' >
      <DynamicHeader
        variant="back"
        title="Products"
        onBack={() => goBack()}
        rightComponent={
          <TouchableOpacity onPress={() => navigate('Cart')}>
            <View className="relative">
              <IconSymbol name="cart" size={28} color="#222" />
              {cartDataItems.length > 0 && (
                <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                  <Text className="text-xs text-white">{cartDataItems.length}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        }
      />
      <View className="flex-1 px-4 pt-4">
        {/* Category Tabs */}
        <View className="mb-4">
          <FlatList
            data={categories || []}
            horizontal
            keyExtractor={item => item.id?.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 4 }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                className={`px-4 py-2 mx-1 rounded-full ${selectedCategory === item.id ? 'bg-tertiary' : 'bg-outstand'}`}
                onPress={() => handleTabPress(index, item.id)}
                activeOpacity={0.8}
              >
                <Text className={`text-base ${selectedCategory === item.id ? 'text-white font-semibold' : 'text-gray-700'}`}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Products List */}
        {selectedCategory ? (
          productsLoading ? (
            <DynamicLoader />
          ) : productsError ? (
            <DynamicError error={productsError} onRetry={refetchProducts} />
          ) : (
            <FlatList
              data={(productsData?.data || []).map((item: { id: string; }) => getProductFromCache(item.id) || item)}
              keyExtractor={item => item.id?.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerClassName="justify-between gap-4"
              numColumns={2}
              refreshControl={<RefreshControl tintColor={colors?.primary} title={'Fetching Products...'} refreshing={isRefreshing} onRefresh={refetch} />}
              renderItem={({ item }) => {
                const cartItem = getCartItem(item.id);
                const hasVariants = item.variants && item.variants.length > 0;

                let isWishlistItem = wishlistItems.find((i: any) => i.id === item.id);

                console.log('isWishlistItem---', isWishlistItem)
                return (
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => navigate('ProductDetails', item)}
                    className="flex-[0.5] flex-col bg-bg rounded-xl shadow-sm mx-[10px] p-[10px] items-start"
                  >
                    <Image
                      source={{
                        uri: getProductImage(item)?.startsWith('/')
                          ? `http://localhost:3005${getProductImage(item)}`
                          : getProductImage(item),
                      }}
                      className="w-[160px] h-[130px] rounded-[8px] bg-bg"
                      resizeMode="cover"
                    />
                    <View className="flex-1 mt-[10px]">
                      <Text variant='medium16' className="text-text1">{item.name}</Text>
                      <View className="flex-row items-center mt-[10px]">
                        <Text className="text-[12px] font-bold text-red-500">
                          {item.currencySymbol}
                          {item.discountPrice ?? item.basePrice}
                        </Text>
                        {item.discountPrice && item.discountPrice < item.basePrice && (
                          <Text className="text-[10px] text-text1 ml-2 line-through">
                            {item.currencySymbol}
                            {item.basePrice}
                          </Text>
                        )}
                        <Text className="text-[10px] text-text1 ml-1">/{item.weightUnit}</Text>
                      </View>
                    </View>

                    {/* Cart Controls */}
                    <View className="flex w-full gap-[10px] my-[10px] flex-row items-center justify-between">
                      {cartItem ? (
                        <>
                          <TouchableOpacity
                            className="bg-gray-200 rounded-full px-2"
                            onPress={(e) => { e.stopPropagation(); handleDecrement(item) }}
                          >
                            <Text className="text-lg font-bold">-</Text>
                          </TouchableOpacity>
                          <Text className="mx-2">{cartItem.quantity}</Text>
                          <TouchableOpacity
                            className="bg-gray-200 rounded-full px-2"
                            onPress={(e) => { e.stopPropagation(); handleAddToCart(item) }}
                          >
                            <Text className="text-lg font-bold">+</Text>
                          </TouchableOpacity>
                        </>
                      ) : hasVariants ? (
                        <TouchableOpacity
                          className="flex flex-row bg-primary px-[16px] py-[10px] rounded-[7px] items-center justify-center flex-1"
                          onPress={(e) => { e.stopPropagation(); handleAddToCart(item) }}
                        >
                          <IconSymbol name="cart" size={16} color="#fff" />
                          <Text className="text-white ml-2">Select Variant</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          className="flex flex-row bg-primary px-[16px] py-[10px] rounded-[7px] items-center justify-center flex-1"
                          onPress={(e) => { e.stopPropagation(); handleAddToCart(item) }}
                        >
                          <IconSymbol name="cart" size={16} color="#fff" />
                          <Text className="text-white ml-2">Add to Cart</Text>
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
                      <IconSymbol name={isWishlistItem ? "heart-fill" : "heart"} iconSet={'Octicons'} size={24} color={isWishlistItem ? "red" : "#222"} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={
                <Text className="text-center text-gray-400 mt-8">
                  No products found for this category.
                </Text>
              }
            />
          )
        ) : (
          <Text className="text-center text-gray-400 mt-8">
            Select a category to view products.
          </Text>
        )}

        {/* Loader */}
        <OverlayLoader open={cartLoading} text={`Updating Cart...`} />

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
      </View>
    </View>
  );
}