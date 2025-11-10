import { useFetchAllCategories } from '@/api/nodeapi/Categories/api';
import { useFetchProductsByCategory } from '@/api/nodeapi/Products/api';
import Animation from '@/components/molecule/Animation';
import ProductItem1 from '@/components/molecule/Card/Product/ProductItem1';
import DynamicError from '@/components/molecule/Error';
import DynamicLoader from '@/components/molecule/Loader';
import OverlayLoader from '@/components/molecule/Loader/OverLayLoader';
import useTheme from '@/hooks/useTheme';
import { useCartStore } from '@/store/cart/cartStore';
import { IconSymbol, Text, ThemedSafeArea } from '@atom';
import DynamicHeader from '@atom/DynamicHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';


export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>("All");
  const { params } = useRoute<any>();
  const { goBack, navigate } = useNavigation<any>();
  const [categories, setCategories] = useState<any[]>([]);
  const { colors } = useTheme();
  const {
    items: cartDataItems = [],
    loading: cartLoading,
    products: productCache,
  } = useCartStore();

  const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError, refetch: refetchCategories } = useFetchAllCategories();
  const { data: productsData, isLoading: productsLoading, error: productsError, refetch: refetchProducts } = useFetchProductsByCategory({ categoryId: selectedCategory });

  // Use product cache for instant UI
  const getProductFromCache = (id: string) => productCache?.[id];


  console.log('productsData', productsData)

  // Category selection logic
  useEffect(() => {
    if (categoriesData?.data?.length > 0) {
      let selected_category_index = categoriesData?.data?.findIndex((i: any) => i?.id == params?.id);
      let id = categoriesData?.data?.[selected_category_index]?.id;
      let categories_data = categoriesData?.data || [];
      categories_data.push(...categories_data.splice(0, selected_category_index));
      setCategories([{ ...categories_data[0], name: "All", id: "All" }, ...categories_data]);

      if (categories && id) {
        setSelectedCategory(id);
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
  };

  return (
    <ThemedSafeArea>
      <View className='flex-1 bg-surfaceBase' >
        {/* header */}
        <DynamicHeader
          variant="back"
          title="Products"
          onBack={() => goBack()}
          rightComponent={
            <TouchableOpacity onPress={() => navigate('Cart')}>
              <View className="relative">
                <IconSymbol name="cart" size={28} color={colors.textPrimary} />
                {cartDataItems.length > 0 && (
                  <View className="absolute -top-2 -right-2 bg-accent rounded-full w-5 h-5 items-center justify-center">
                    <Text className="text-xs text-textInverse">{cartDataItems.length}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          }
        />
        <View className="flex-1 px-4 pt-4 pb-4">
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
                  className={`px-4 py-2 mx-1 rounded-full ${selectedCategory === item.id ? 'bg-focusRing' : 'bg-transparent'}`}
                  onPress={() => handleTabPress(index, item.id)}
                  activeOpacity={0.8}
                >
                  <Text className={`text-base ${selectedCategory === item.id ? 'text-textPrimary font-semibold' : 'text-textSecondary'}`}>
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
                  return (
                    <ProductItem1
                      item={item}
                      style={{
                        width: 140,
                      }}
                    />
                  );
                }}
                ListEmptyComponent={
                  <View className="flex-1 flex-grow items-center justify-center">
                    <Animation name='EmptyCart' loop />
                    <Text variant='medium14' className="text-center text-textPrimary mt-8">
                      No products found for this category.
                    </Text>
                  </View>
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
        </View>
      </View>
    </ThemedSafeArea >
  );
}