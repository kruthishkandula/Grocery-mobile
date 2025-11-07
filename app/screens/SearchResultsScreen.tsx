import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import LinearHeader from '@/components/atom/Header/LinearHeader';
import { IconSymbol, Button } from '@/components/atom';
import SearchBar from '@/components/molecule/SearchBar';
import { useSearchProducts, SearchParams } from '@/api/nodeapi/Products/searchApi';
import useTheme from '@/hooks/useTheme';
import { navigate } from '@/navigation/RootNavRef';
import ProductItem1 from '@/components/molecule/Card/Product/ProductItem1';

type SearchResultsRouteProp = RouteProp<{
  SearchResults: { query: string; categoryId?: number };
}, 'SearchResults'>;

interface FilterOptions {
  sortBy: 'name' | 'basePrice' | 'discountPrice' | 'updatedAt';
  sortOrder: 'asc' | 'desc';
  priceMin?: number;
  priceMax?: number;
}

const SearchResultsScreen = () => {
  const route = useRoute<SearchResultsRouteProp>();
  const { colors } = useTheme();
  
  const [searchQuery, setSearchQuery] = useState(route.params?.query || '');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: 'name',
    sortOrder: 'asc',
  });
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const searchParams: SearchParams = {
    searchValue: searchQuery,
    categoryId: route.params?.categoryId,
    ...filters,
    page,
    pageSize: 20,
  };
  
  const {
    data: searchResults,
    isLoading,
    isError,
    refetch,
  } = useSearchProducts(searchParams, searchQuery.length >= 2);
  
  const totalResults = searchResults?.meta?.pagination?.total || 0;
  const totalPages = searchResults?.meta?.pagination?.totalPages || 0;
  const hasNextPage = page < totalPages;
  
  // Update products list when new data arrives
  useEffect(() => {
    if (searchResults?.data) {
      if (page === 1) {
        // First page or new search - replace all products
        setAllProducts(searchResults.data);
      } else {
        // Subsequent pages - append to existing products
        setAllProducts(prev => [...prev, ...searchResults.data]);
      }
      setIsLoadingMore(false);
    }
  }, [searchResults, page]);
  
  // Reset to first page when search query or filters change
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
      setAllProducts([]);
    }
  }, [searchQuery, filters]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
    setAllProducts([]);
  };
  
  const handleProductSelect = (product: any) => {
    navigate('ProductDetail', { productId: product.id });
  };
  
  const handleRefresh = () => {
    setPage(1);
    setAllProducts([]);
    refetch();
  };
  
  const handleLoadMore = () => {
    if (hasNextPage && !isLoadingMore && !isLoading) {
      setIsLoadingMore(true);
      setPage(prev => prev + 1);
    }
  };
  
  const renderFilterButton = () => (
    <TouchableOpacity
      style={[styles.filterButton, { borderColor: colors?.surfaceBase }]}
      onPress={() => setShowFilters(!showFilters)}
    >
      <IconSymbol name='filter' size={16} color={colors?.textPrimary} />
      <Text style={[styles.filterText, { color: colors?.textPrimary }]}>Filters</Text>
    </TouchableOpacity>
  );
  
  const renderSortOptions = () => (
    <View style={[styles.sortContainer, { backgroundColor: colors?.surfaceBase }]}>
      <Text style={[styles.sortTitle, { color: colors?.textPrimary }]}>Sort by:</Text>
      
      <View style={styles.sortButtons}>
        {[
          { key: 'name', label: 'Name' },
          { key: 'basePrice', label: 'Price' },
          { key: 'updatedAt', label: 'Latest' },
        ].map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.sortButton,
              {
                backgroundColor: filters.sortBy === option.key ? colors?.primary : colors?.surfaceBase,
                borderColor: colors?.surfaceBase,
              }
            ]}
            onPress={() => setFilters(prev => ({ ...prev, sortBy: option.key as any }))}
          >
            <Text
              style={[
                styles.sortButtonText,
                {
                  color: filters.sortBy === option.key ? '#fff' : colors?.textPrimary,
                }
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.sortButtons}>
        <TouchableOpacity
          style={[
            styles.sortButton,
            {
              backgroundColor: filters.sortOrder === 'asc' ? colors?.primary : colors?.surfaceBase,
              borderColor: colors?.surfaceBase,
            }
          ]}
          onPress={() => setFilters(prev => ({ ...prev, sortOrder: 'asc' }))}
        >
          <Text
            style={[
              styles.sortButtonText,
              { color: filters.sortOrder === 'asc' ? '#fff' : colors?.textPrimary }
            ]}
          >
            ↑ Ascending
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.sortButton,
            {
              backgroundColor: filters.sortOrder === 'desc' ? colors?.primary : colors?.surfaceBase,
              borderColor: colors?.surfaceBase,
            }
          ]}
          onPress={() => setFilters(prev => ({ ...prev, sortOrder: 'desc' }))}
        >
          <Text
            style={[
              styles.sortButtonText,
              { color: filters.sortOrder === 'desc' ? '#fff' : colors?.textPrimary }
            ]}
          >
            ↓ Descending
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  const renderProductItem = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.productCard}>
      <ProductItem1
        item={item}
        // onPress={() => handleProductSelect(item)}
      />
    </View>
  );
  
  const renderLoadingFooter = () => {
    if (!isLoadingMore) return null;
    
    return (
      <View style={styles.loadingMore}>
        <ActivityIndicator size="small" color={colors?.primary} />
        <Text style={[styles.loadingText, { color: colors?.textPrimary }]}>
          Loading more products...
        </Text>
      </View>
    );
  };
  
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <IconSymbol name='search' size={64} color={colors?.textPrimary} />
      <Text style={[styles.emptyTitle, { color: colors?.textPrimary }]}>
        No products found
      </Text>
      <Text style={[styles.emptySubtitle, { color: colors?.textPrimary }]}>
        Try searching with different keywords
      </Text>
      <Button
        title="Browse Categories"
        onPress={() => navigate('Categories')}
        style={styles.browseButton}
      />
    </View>
  );
  
  const renderHeader = () => (
    <View style={styles.headerContent}>
      <SearchBar
        placeholder="Search products..."
        onProductSelect={handleProductSelect}
        showSuggestions={false}
      />
      
      <View style={styles.resultsHeader}>
        <Text style={[styles.resultsCount, { color: colors?.textPrimary }]}>
          {totalResults} {totalResults === 1 ? 'result' : 'results'} 
          {searchQuery ? ` for "${searchQuery}"` : ''}
        </Text>
        {renderFilterButton()}
      </View>
      
      {showFilters && renderSortOptions()}
    </View>
  );
  
  // Show loading state for first page
  if (isLoading && page === 1) {
    return (
      <View style={[styles.container, { backgroundColor: colors?.surfaceBase }]}>
        <LinearHeader
          title="Search Results"
          colors={['#667eea', '#764ba2']}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors?.primary} />
          <Text style={[styles.loadingText, { color: colors?.textPrimary, marginTop: 16 }]}>
            Searching products...
          </Text>
        </View>
      </View>
    );
  }
  
  return (
    <View style={[styles.container, { backgroundColor: colors?.surfaceBase }]}>
      <LinearHeader
        title="Search Results"
        colors={[colors.primary, colors.primary]}
      />
      
      <FlatList
        data={allProducts}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={!isLoading && !isLoadingMore ? renderEmptyState : null}
        ListFooterComponent={renderLoadingFooter}
        refreshControl={
          <RefreshControl
            refreshing={isLoading && page === 1}
            onRefresh={handleRefresh}
            colors={[colors?.primary]}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={allProducts.length === 0 ? styles.emptyListContent : styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContent: {
    padding: 16,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
    marginLeft: 12,
  },
  filterText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  sortContainer: {
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  sortTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  sortButtons: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  sortButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  productCard: {
    flex: 1,
    margin: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  browseButton: {
    paddingHorizontal: 24,
  },
  loadingMore: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    fontSize: 14,
    marginLeft: 8,
  },
});

export default SearchResultsScreen;