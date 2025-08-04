import SearchBar from '@/components/molecule/SearchBar';
import { navigate } from '@/navigation/RootNavRef';
import { View } from 'react-native';

export default function HomeScreen() {
  const handleProductSelect = (product: any) => {
    // Handle product selection from search suggestions
    navigate('ProductDetail', { productId: product.id });
  };

  return (
    <View>
      {/* Other components */}
      <SearchBar 
        onProductSelect={handleProductSelect}
        placeholder="Search for fresh groceries..."
      />
      {/* Rest of your home screen */}
    </View>
  );
}