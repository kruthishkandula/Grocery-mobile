import { Button, IconSymbol, Text } from '@/components/atom';
import LinearHeader from '@/components/atom/Header/LinearHeader';
import Animation from '@/components/molecule/Animation';
import useTheme from '@/hooks/useTheme';
import { navigate } from '@/navigation/RootNavRef';
import { useAddressStore } from '@/store/address/addressStore';
import { useCartStore } from '@/store/cart/cartStore';
import { useOrderStore } from '@/store/order/orderStore';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

const CheckoutScreen = () => {
  const { colors } = useTheme()
  const { items, clearCart } = useCartStore();
  const { placeOrder, placing, error } = useOrderStore();
  const { addresses, selectedAddressId, selectAddress } = useAddressStore();
  let selectedAddress = addresses.find(addr => addr.id === selectedAddressId) || null;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');
  const [showAnimation, setShowAnimation] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [upiId, setUpiId] = useState('');

  // Animation values
  const fadeAnim = new Animated.Value(1);
  const slideAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(1);
  const bounceAnim = new Animated.Value(0);

  useEffect(() => {
    // Entry animation
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = item?.product?.discountPrice || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const validateOrder = () => {
    if (items.length === 0) {
      Alert.alert('Error', 'Your cart is empty');
      return false;
    }

    if (!selectedAddress) {
      Alert.alert('Error', 'Please select a delivery address');
      return false;
    }

    if (selectedPaymentMethod === 'upi' && !upiId.trim()) {
      Alert.alert('Error', 'Please enter UPI ID');
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateOrder()) return;

    try {
      // Start loading animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -50,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const orderData = {
        items: items.map(item => ({
          id: item.id,
          product_id: item.id,
          quantity: item.quantity,
          price: item.product?.discountPrice || 0,
          product: item.product,
        })),
        total_amount: calculateTotal(),
        payment_method: selectedPaymentMethod,
        upi_id: selectedPaymentMethod === 'upi' ? upiId : null,
        delivery_address: selectedAddress,
      };

      await placeOrder(orderData);

      // Clear cart after successful order
      clearCart();

      // Show success animation
      setShowAnimation(true);

      // Navigate to order success screen after animation
      setTimeout(() => {
        navigate('order-success');
      }, 3000);

    } catch (error) {
      // Reset animations on error
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      Alert.alert('Error', 'Failed to place order. Please try again.');
    }
  };

  const renderAddressSelection = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors?.text1 }]}>🏠 Delivery Address</Text>

      <TouchableOpacity
        style={styles.addressDropdown}
        onPress={() => setShowAddressModal(true)}
      >
        <LinearGradient
          colors={['#f8f9ff', '#e8f4fd']}
          style={styles.dropdownGradient}
        >
          <View style={styles.dropdownContent}>
            <View style={styles.dropdownIconContainer}>
              <Text style={styles.dropdownIcon}>🏠</Text>
            </View>

            <View style={styles.dropdownTextContainer}>
              {selectedAddress ? (
                <>
                  <Text style={styles.dropdownMainText}>
                    {selectedAddress.addressLine1}
                  </Text>
                  <Text style={styles.dropdownSubText}>
                    {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.postalCode}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.dropdownMainText}>Select Delivery Address</Text>
                  <Text style={styles.dropdownSubText}>Choose your delivery location</Text>
                </>
              )}
            </View>

            <View style={styles.dropdownArrowContainer}>
              <IconSymbol
                name='chevron-down'
                iconSet='Feather'
                size={20}
                color={'#6c7ce7'}
              />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderPaymentMethods = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors?.text1 }]}>💳 Payment Method</Text>

      {/* UPI Payment */}
      <TouchableOpacity
        style={[
          styles.paymentOption,
          selectedPaymentMethod === 'upi' && styles.selectedPayment
        ]}
        onPress={() => setSelectedPaymentMethod('upi')}
      >
        <LinearGradient
          colors={selectedPaymentMethod === 'upi' ? ['#e8f5e8', '#f0f8ff'] : ['#ffffff', '#f8f9fa']}
          style={styles.paymentGradient}
        >
          <View style={styles.paymentContent}>
            <View style={styles.paymentIconContainer}>
              <Text style={styles.paymentIcon}>📱</Text>
            </View>
            <View style={styles.paymentTextContainer}>
              <Text style={[styles.paymentText, { color: selectedPaymentMethod === 'upi' ? '#2c3e50' : '#666' }]}>
                UPI Payment
              </Text>
              <Text style={styles.paymentSubtext}>Google Pay, PhonePe, Paytm</Text>
            </View>
            {selectedPaymentMethod === 'upi' && (
              <View style={styles.paymentSelectedIndicator}>
                <IconSymbol name='check-circle' iconSet='Feather' size={20} color={'#4CAF50'} />
              </View>
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* UPI Input Field - Show only when UPI is selected */}
      {/* {selectedPaymentMethod === 'upi' && (
        <FloatingLabelInput
          placeholder="Enter UPI ID (e.g., name@paytm)"
          value={upiId}
          onChangeText={setUpiId}
          keyboardType="email-address"
          autoCapitalize="none"
          inputType="email"
        />
      )} */}

      {/* Cash on Delivery */}
      <TouchableOpacity
        style={[
          styles.paymentOption,
          selectedPaymentMethod === 'cod' && styles.selectedPayment
        ]}
        onPress={() => setSelectedPaymentMethod('cod')}
      >
        <LinearGradient
          colors={selectedPaymentMethod === 'cod' ? ['#e8f5e8', '#f0f8ff'] : ['#ffffff', '#f8f9fa']}
          style={styles.paymentGradient}
        >
          <View style={styles.paymentContent}>
            <View style={styles.paymentIconContainer}>
              <Text style={styles.paymentIcon}>💵</Text>
            </View>
            <View style={styles.paymentTextContainer}>
              <Text style={[styles.paymentText, { color: selectedPaymentMethod === 'cod' ? '#2c3e50' : '#666' }]}>
                Cash on Delivery
              </Text>
              <Text style={styles.paymentSubtext}>Pay when order arrives</Text>
            </View>
            {selectedPaymentMethod === 'cod' && (
              <View style={styles.paymentSelectedIndicator}>
                <IconSymbol name='check-circle' iconSet='Feather' size={20} color={'#4CAF50'} />
              </View>
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  if (showAnimation) {
    return (
      <SafeAreaView style={styles.animationContainer}>
        <LinearGradient
          colors={['#f8f8f8', '#f8f8f8']}
          style={styles.successGradient}
        >
          <Animation
            name="OrderSuccess"
            style={styles.successAnimation}
            loop={true}
            title={`Order Placed Successfully! 🎉`}
            message={"Thank you for your order. We'll send you updates via notifications."}
          />
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <View className='flex-1' >
      <Animated.View
        style={[
          styles.content,
          {
            marginBottom: 20,
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ]
          }
        ]}
      >
        <ScrollView style={[styles.scrollView]} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <LinearHeader
            title="Checkout"
            colors={['#667eea', '#764ba2']}
            style={styles.headerGradient}
          >
            <View className='flex-1' style={{ padding: 16, }} >
              {/* Order Summary */}
              <View style={[styles.section,]}>
                <Text style={styles.sectionTitle}>🛒 Order Summary</Text>
                <LinearGradient
                  colors={['#eeee', 'pink']}
                  style={styles.summaryGradient}
                >
                  {items.map((item) => (
                    <View key={item.id} style={styles.orderItem}>
                      <Text style={styles.itemName}>{item.product?.name || 'Product'}</Text>
                      <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                      <Text style={styles.itemPrice}>
                        ₹{((item.product?.discountPrice || 0) * item.quantity).toFixed(2)}
                      </Text>
                    </View>
                  ))}
                  <View style={styles.totalRow}>
                    <Text style={styles.totalText}>Total: ₹{calculateTotal().toFixed(2)}</Text>
                  </View>
                </LinearGradient>
              </View>

              {renderAddressSelection()}
              {renderPaymentMethods()}
            </View>

          </LinearHeader>
        </ScrollView>

        {/* Place Order Button */}
        <Button
          title={placing ? 'Placing Order...' : `Place Order - ₹${calculateTotal().toFixed(2)}`}
          onPress={handlePlaceOrder}
          disabled={placing}
          style={[styles.placeOrderButton, placing && styles.disabledButton]}
          textStyle={styles.placeOrderText}
        />


        {showAddressModal && (
          <View style={styles.addressModal}>
            <TouchableOpacity
              style={styles.modalBackdrop}
              activeOpacity={1}
              onPress={() => setShowAddressModal(false)}
            />
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Delivery Address</Text>
                <TouchableOpacity
                  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                  onPress={() => setShowAddressModal(false)}
                  style={styles.closeButton}
                >
                  <IconSymbol name='x' iconSet='Feather' size={18} color={'#666'} />
                </TouchableOpacity>
              </View>

              <View style={styles.modalContent}>
                {addresses?.length > 0 ? (
                  <ScrollView
                    style={styles.addressScrollView}
                    contentContainerStyle={styles.addressListContent}
                    showsVerticalScrollIndicator={false}
                  >
                    {addresses.map((item) => (
                      <TouchableOpacity
                        key={item.id.toString()}
                        style={[
                          styles.addressOption,
                          selectedAddress?.id === item.id && styles.selectedAddressOption
                        ]}
                        onPress={() => {
                          selectAddress(item.id);
                          setShowAddressModal(false);
                        }}
                      >
                        <LinearGradient
                          colors={selectedAddress?.id === item.id ? ['#e8f5e8', '#f0f8ff'] : ['#ffffff', '#f9f9f9']}
                          style={styles.addressOptionGradient}
                        >
                          <View style={styles.addressOptionContent}>
                            <View style={styles.addressOptionIcon}>
                              <Text style={styles.addressOptionIconText}>🏠</Text>
                            </View>
                            <View style={styles.addressOptionDetails}>
                              <Text style={styles.addressOptionText}>
                                {item.addressLine1}
                              </Text>
                              <Text style={styles.addressOptionSubtext}>
                                {item.city}, {item.state} - {item.postalCode}
                              </Text>
                            </View>
                            {selectedAddress?.id === item.id && (
                              <View style={styles.selectedIndicator}>
                                <IconSymbol name='check-circle' iconSet='Feather' size={20} color={'#4CAF50'} />
                              </View>
                            )}
                          </View>
                        </LinearGradient>
                      </TouchableOpacity>
                    ))}
                    <Button
                      title='Add New Address'
                      onPress={() => {
                        setShowAddressModal(false)
                        navigate('Address', { fromCheckout: true })
                      }}
                      style={styles.addAddressButton}
                    />
                  </ScrollView>
                ) : (
                  <View style={styles.noAddressContainer}>
                    <Text style={styles.noAddressIcon}>📍</Text>
                    <Text style={styles.noAddressTitle}>
                      No addresses found
                    </Text>
                    <Text style={styles.noAddressSubtext}>
                      Please add a delivery address to continue
                    </Text>
                    <Button
                      title='Add New Address'
                      onPress={() => {
                        setShowAddressModal(false)
                        navigate('Address', { fromCheckout: true })
                      }}
                      style={styles.addAddressButton}
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
        )}

        {/* Loading Animation Overlay */}
        {placing && (
          <View style={styles.loadingOverlay}>
            <LinearGradient
              colors={['rgba(255,255,255,0.9)', 'rgba(248,249,250,0.9)']}
              style={styles.loadingGradient}
            >
              <Animation
                name="Splash"
                style={styles.loadingAnimation}
                loop={true}
              />
              <Text style={styles.loadingText}>Processing your order... 🚀</Text>

            </LinearGradient>
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const newStyles = {
  // Dropdown styles
  addressDropdown: {
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e3f2fd',
    shadowColor: '#6c7ce7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownGradient: {
    padding: 16,
  },
  dropdownContent: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
  },
  dropdownIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(108, 124, 231, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dropdownIcon: {
    fontSize: 18,
  },
  dropdownTextContainer: {
    flex: 1,
    paddingVertical: 4,
  },
  dropdownMainText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 2,
    lineHeight: 20,
  },
  dropdownSubText: {
    fontSize: 13,
    color: '#7f8c8d',
    lineHeight: 16,
  },
  dropdownArrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(108, 124, 231, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Payment method styles
  paymentOption: {
    marginBottom: 12,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedPayment: {
    borderColor: '#4CAF50',
    borderWidth: 2,
    shadowColor: '#4CAF50',
    shadowOpacity: 0.2,
  },
  paymentGradient: {
    borderRadius: 15,
  },
  paymentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  paymentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(116, 185, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentIcon: {
    fontSize: 20,
  },
  paymentTextContainer: {
    flex: 1,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  paymentSubtext: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  paymentSelectedIndicator: {
    marginLeft: 8,
  },
  upiInputContainer: {
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
  },

  // Modal styles
  addressModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  modalContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flex: 1,
  },
  addressScrollView: {
    flex: 1,
  },
  addressListContent: {
    paddingBottom: 20,
  },
  addressOption: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  selectedAddressOption: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  addressOptionGradient: {
    borderRadius: 12,
  },
  addressOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  addressOptionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(116, 185, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addressOptionIconText: {
    fontSize: 16,
  },
  addressOptionDetails: {
    flex: 1,
  },
  addressOptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 4,
  },
  addressOptionSubtext: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  selectedIndicator: {
    marginLeft: 8,
  },
  noAddressContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noAddressIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  noAddressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  noAddressSubtext: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  addAddressButton: {
    backgroundColor: '#74b9ff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
};

// Merge with existing styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerGradient: {
    paddingVertical: 80,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  summaryGradient: {
    padding: 16,
    borderRadius: 15,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.3)',
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalRow: {
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: 'rgba(255,255,255,0.5)',
    marginTop: 12,
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#333',
  },
  placeOrderButton: {
    margin: 16,
    borderRadius: 15,
    overflow: 'hidden',
  },
  buttonGradient: {
    padding: 18,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  placeOrderText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loadingGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingAnimation: {
    width: 150,
    height: 150,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  animationContainer: {
    flex: 1,
  },
  successGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successAnimation: {
    width: 200,
    height: 200,
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },

  // Dropdown styles
  addressDropdown: {
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e3f2fd',
    shadowColor: '#6c7ce7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownGradient: {
    padding: 16,
  },
  dropdownContent: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
  },
  dropdownIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(108, 124, 231, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dropdownIcon: {
    fontSize: 18,
  },
  dropdownTextContainer: {
    flex: 1,
    paddingVertical: 4,
  },
  dropdownMainText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 2,
    lineHeight: 20,
  },
  dropdownSubText: {
    fontSize: 13,
    color: '#7f8c8d',
    lineHeight: 16,
  },
  dropdownArrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(108, 124, 231, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Payment method styles
  paymentOption: {
    marginBottom: 12,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedPayment: {
    borderColor: '#4CAF50',
    borderWidth: 2,
    shadowColor: '#4CAF50',
    shadowOpacity: 0.2,
  },
  paymentGradient: {
    borderRadius: 15,
  },
  paymentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  paymentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(116, 185, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentIcon: {
    fontSize: 20,
  },
  paymentTextContainer: {
    flex: 1,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  paymentSubtext: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  paymentSelectedIndicator: {
    marginLeft: 8,
  },

  // Modal styles
  addressModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    minHeight: 500,
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    minHeight: '50%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  modalContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flex: 1,
  },
  addressScrollView: {
    flex: 1,
  },
  addressListContent: {
    paddingBottom: 20,
  },
  addressOption: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  selectedAddressOption: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  addressOptionGradient: {
    borderRadius: 12,
  },
  addressOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  addressOptionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(116, 185, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addressOptionIconText: {
    fontSize: 16,
  },
  addressOptionDetails: {
    flex: 1,
  },
  addressOptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 4,
  },
  addressOptionSubtext: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  selectedIndicator: {
    marginLeft: 8,
  },
  noAddressContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noAddressIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  noAddressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  noAddressSubtext: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  addAddressButton: {
    backgroundColor: '#74b9ff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
});

export default CheckoutScreen;