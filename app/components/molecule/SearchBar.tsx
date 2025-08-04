import { useThemeContextActions } from '@/Themes';
import { getThemeColors } from '@/Themes/theme-config';
import React, { useState, useEffect, useRef } from 'react';
import { 
  TextInput, 
  View, 
  TouchableOpacity, 
  FlatList, 
  Text, 
  StyleSheet, 
  Animated,
  ActivityIndicator,
  Keyboard
} from 'react-native';
import { IconSymbol } from '../atom';
import { useSearchProducts } from '@/api/nodeapi/Products/searchApi';
import { navigate } from '@/navigation/RootNavRef';

interface SearchBarProps {
  onSearchFocus?: () => void;
  onSearchBlur?: () => void;
  onProductSelect?: (product: any) => void;
  placeholder?: string;
  showSuggestions?: boolean;
}

export default function SearchBar({ 
  onSearchFocus, 
  onSearchBlur, 
  onProductSelect,
  placeholder = 'Search products...',
  showSuggestions = true 
}: SearchBarProps) {
  const { theme } = useThemeContextActions();
  const colors = getThemeColors(theme);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  const searchInputRef = useRef<TextInput>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  // Search API call
  const { 
    data: searchResults, 
    isLoading: isSearching,
    error: searchError 
  } = useSearchProducts(
    { 
      searchValue: debouncedQuery,
      pageSize: 10 
    },
    debouncedQuery.length >= 2 && showSuggestions
  );
  
  useEffect(() => {
    if (isFocused && debouncedQuery.length >= 2 && showSuggestions) {
      setShowDropdown(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        if (fadeAnim._value === 0) {
          setShowDropdown(false);
        }
      });
    }
  }, [isFocused, debouncedQuery, showSuggestions]);
  
  const handleFocus = () => {
    setIsFocused(true);
    onSearchFocus?.();
  };
  
  const handleBlur = () => {
    // Delay blur to allow for item selection
    setTimeout(() => {
      setIsFocused(false);
      onSearchBlur?.();
    }, 150);
  };
  
  const handleSearch = () => {
    if (searchQuery.trim()) {
      Keyboard.dismiss();
      setShowDropdown(false);
      navigate('SearchResults', { query: searchQuery.trim() });
    }
  };
  
  const handleProductSelect = (product: any) => {
    setSearchQuery('');
    setShowDropdown(false);
    searchInputRef.current?.blur();
    
    if (onProductSelect) {
      onProductSelect(product);
    } else {
      navigate('ProductDetail', { productId: product.id });
    }
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    setDebouncedQuery('');
    searchInputRef.current?.focus();
  };
  
  const renderSuggestionItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handleProductSelect(item)}
      activeOpacity={0.7}
    >
      <View style={styles.suggestionContent}>
        <IconSymbol name='search' size={16} color={colors?.text2} />
        <View style={styles.suggestionTextContainer}>
          <Text style={[styles.suggestionTitle, { color: colors?.text1 }]} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={[styles.suggestionSubtitle, { color: colors?.text2 }]} numberOfLines={1}>
            ₹{item.discountPrice} • {item.shortDescription}
          </Text>
        </View>
        <IconSymbol name='arrow-up-left' size={14} color={colors?.text2} />
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer, { borderColor: isFocused ? colors?.primary : colors?.border }]}>
        <IconSymbol name='search' size={20} color={colors?.text1} />
        <TextInput
          ref={searchInputRef}
          placeholder={placeholder}
          className='flex-1 ml-3 text-text1 p-[10px] h-[50px]'
          style={{ color: colors?.text1 }}
          placeholderTextColor={colors?.text2}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
        />
        
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <IconSymbol name='x' size={16} color={colors?.text2} />
          </TouchableOpacity>
        )}
        
        <TouchableOpacity onPress={handleSearch}>
          <IconSymbol name='microphone' size={20} color={colors?.text1} />
        </TouchableOpacity>
      </View>
      
      {showDropdown && (
        <Animated.View 
          style={[
            styles.dropdown, 
            { 
              backgroundColor: colors?.bg,
              borderColor: colors?.bg,
              opacity: fadeAnim 
            }
          ]}
        >
          {isSearching ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={colors?.primary} />
              <Text style={[styles.loadingText, { color: colors?.text2 }]}>Searching...</Text>
            </View>
          ) : searchError ? (
            <View style={styles.errorContainer}>
              <Text style={[styles.errorText, { color: colors?.error }]}>
                Search failed. Please try again.
              </Text>
            </View>
          ) : searchResults?.data?.length > 0 ? (
            <FlatList
              data={searchResults.data}
              renderItem={renderSuggestionItem}
              keyExtractor={(item) => item.id.toString()}
              style={styles.suggestionsList}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            />
          ) : debouncedQuery.length >= 2 ? (
            <View style={styles.noResultsContainer}>
              <Text style={[styles.noResultsText, { color: colors?.text2 }]}>
                No products found for "{debouncedQuery}"
              </Text>
              <TouchableOpacity 
                style={styles.viewAllButton}
                onPress={() => navigate('SearchResults', { query: debouncedQuery })}
              >
                <Text style={[styles.viewAllText, { color: colors?.primary }]}>
                  View all results
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1000,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    minHeight: 50,
  },
  clearButton: {
    padding: 4,
    marginRight: 8,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    maxHeight: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1001,
  },
  suggestionsList: {
    maxHeight: 250,
  },
  suggestionItem: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f0f0',
  },
  suggestionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  suggestionTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  suggestionSubtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
  },
  noResultsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  viewAllButton: {
    paddingVertical: 8,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
});