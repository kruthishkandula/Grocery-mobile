import { Button, Text } from '@/components/atom';
import Animation from '@/components/molecule/Animation';
import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';


const EmptyCart = () => {
  const { replace } = useNavigation<any>();
  const ref = useRef<any>(null);

  return (
    <View style={styles.container}>
      <Animation name="EmptyCart" />
      <Text variant="medium14" style={{ fontSize: 18, color: '#333' }}>
        Your cart is empty
      </Text>
      <Button
        title="Shop Groceries"
        onPress={() => {

          console.log('Navigate to shop');
          replace('Products')        }}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
});

export default EmptyCart