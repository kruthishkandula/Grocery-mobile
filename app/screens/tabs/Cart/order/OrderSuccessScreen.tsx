import Animation from '@/components/molecule/Animation';
import useTheme from '@/hooks/useTheme';
import { useOrderStore } from '@/store/order/orderStore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const OrderSuccessScreen = () => {
  const { colors } = useTheme()
  const { navigate, replace } = useNavigation<any>()
  const { currentOrder } = useOrderStore();

  // useEffect(() => {
  //   // Auto navigate to home after 5 seconds
  //   const timer = setTimeout(() => {
  //     replace('homescreen');
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.surfaceBase }]}>
      <Animation
        name="OrderSuccess"
        style={styles.animation}
        loop={true} source={''} />

      <Text style={styles.title}>Order Placed Successfully!</Text>
      <Text style={styles.subtitle}>Thank you for your order</Text>

      {currentOrder && (
        <View style={styles.orderDetails}>
          <Text style={styles.orderNumber}>Order #{currentOrder.id}</Text>
          <Text style={styles.orderAmount}>
            Total: {currentOrder.currencySymbol}{currentOrder.total_amount.toFixed(2)}
          </Text>
        </View>
      )}

      <Text style={styles.message}>
        We'll send you updates about your order via notifications.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.trackButton, { backgroundColor: colors.accent}]}
          onPress={() => navigate('orders')}
        >
          <Text style={styles.trackButtonText}>Track Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.homeButton, { backgroundColor: colors.textInverse}]}
          onPress={() => navigate('homescreen')}
        >
          <Text style={styles.homeButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  animation: {
    width: 350,
    height: 350,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  orderDetails: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  orderAmount: {
    fontSize: 16,
    color: '#666',
  },
  message: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20
  },
  trackButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderSuccessScreen;