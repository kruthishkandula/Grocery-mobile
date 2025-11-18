import { Button, DynamicHeader, IconSymbol, Text, ThemedSafeArea } from '@/components/atom';
import Animation from '@/components/molecule/Animation';
import useTheme from '@/hooks/useTheme';
import { useAddressStore } from '@/store/address/addressStore';
import { gpsh } from '@/style/theme';
import React, { useCallback, useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
import * as Location from 'expo-location';

const LABEL_OPTIONS = ['Home', 'Office', 'Other'];

const emptyAddress = {
  id: '',
  label: '',
  customLabel: '',
  receiverName: '',
  receiverPhone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  isDefault: false,
};

const AddressModal = ({
  visible = false,
  onClose,
  onSave,
  initial,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (address: any) => void;
  initial?: any;
}) => {
  const { colors } = useTheme();
  const [form, setForm] = useState(initial || emptyAddress);
  const [loadingLocation, setLoadingLocation] = useState(false);

  React.useEffect(() => {
    setForm(initial || emptyAddress);
  }, [visible, initial]);

  const isUpdateChangedCheck = useCallback(() => {
    if (!initial) return true;

    return Object.keys(initial).some((key) => {
      if (form[key] !== initial[key]) {
        return true;
      }
      return false
    });
  }, [form, initial]);

  const handleChange = (key: string, value: string) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  // Label pills logic
  const handleLabelSelect = (option: string) => {
    if (option === 'Other') {
      setForm((prev: any) => ({ ...prev, label: 'Other', customLabel: '' }));
    } else {
      setForm((prev: any) => ({ ...prev, label: option, customLabel: '' }));
    }
  };

  const getFinalLabel = () => (form.label === 'Other' ? form.customLabel : form.label);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (err) {
      return false;
    }
  };

  const reverseGeocode = async (lat: number, lon: number) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
      const res = await fetch(url, {
        headers: { 'User-Agent': 'GroceryMobile/1.0 (you@example.com)' },
      });
      if (!res.ok) throw new Error('Reverse geocode failed');
      const data = await res.json();
      return data;
    } catch (err) {
      throw err;
    }
  };

  const fetchLocationAndFill = async () => {
    const ok = await requestLocationPermission();
    if (!ok) {
      Alert.alert('Permission required', 'Location permission is required to use this feature.');
      return;
    }
    setLoadingLocation(true);
    try {
      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
        timeout: 15000,
      });
      const { latitude, longitude } = pos.coords;
      try {
        const geo = await reverseGeocode(latitude, longitude);
        const addr = (geo && geo.address) || {};
        const line1 =
          [addr.house_number, addr.road].filter(Boolean).join(' ') ||
          (geo.display_name ? geo.display_name.split(',')[0] : '');
        setForm((prev: any) => ({
          ...prev,
          addressLine1: line1,
          addressLine2: geo.display_name || prev.addressLine2,
          city: addr.city || addr.town || addr.village || addr.county || prev.city,
          state: addr.state || prev.state,
          postalCode: addr.postcode || prev.postalCode,
          country: addr.country || prev.country,
        }));
      } catch (err) {
        Alert.alert('Location error', err.message || 'Unable to get address from coordinates.');
      } finally {
        setLoadingLocation(false);
      }
    } catch (err) {
      setLoadingLocation(false);
      Alert.alert('Error', 'Failed to fetch location.');
    }
  };

  return (
    <Modal onDismiss={onClose} visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={[styles.modalOverlay]}>
        <View style={[styles.modalContent, { maxHeight: '60%', backgroundColor: colors.surfaceOverlay }]} >
          <View className='flex-row justify-between ' >
            <Text className='text-textPrimary' style={styles.modalTitle}>{form.id ? 'Edit Address' : 'Add Address'}</Text>
            <TouchableOpacity onPress={onClose} style={{ marginLeft: 'auto' }}>
              <IconSymbol name="close" size={24} color={colors.textPrimary} style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} >
            {/* Use My Location */}
            <View style={{ marginBottom: 8, flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity
                onPress={fetchLocationAndFill}
                disabled={loadingLocation}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 8,
                  backgroundColor: loadingLocation ? '#ddd' : colors.accent,
                }}
              >
                <Text style={{ color: colors.textPrimary, fontWeight: '600' }}>
                  {loadingLocation ? 'Fetching...' : 'Use My Location'}
                </Text>
              </TouchableOpacity>
            </View>
            {/* Label Pills */}
            <Text className='text-textPrimary' style={styles.fieldLabel}>Save As <Text style={styles.required}>*</Text></Text>
            <View className='text-textPrimary' style={styles.pillsRow}>
              {LABEL_OPTIONS.map((option) => (
                <Pressable
                  key={option}
                  style={[
                    styles.pill,
                    (form.label === option) && styles.pillSelected,
                  ]}
                  onPress={() => handleLabelSelect(option)}
                >
                  <Text style={[
                    styles.pillText,
                    (form.label === option) ? { color: colors.textPrimary } : { color: colors.accent },
                    (form.label === option) && styles.pillTextSelected,
                  ]}>
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
            {form.label === 'Other' && (
              <>
                <Text className='text-textPrimary' style={styles.fieldLabel}>Custom label <Text style={styles.required}>*</Text></Text>
                <TextInput
                  style={styles.input}
                  placeholder="Custom label"
                  value={form.customLabel}
                  onChangeText={(v) => handleChange('customLabel', v)}
                  maxLength={20}
                />
              </>
            )}
            {/* Receiver Details */}
            <Text className='text-textPrimary' style={styles.fieldLabel}>Receiver Name <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={form.receiverName}
              onChangeText={(v) => handleChange('receiverName', v)}
              maxLength={40}
            />
            <Text className='text-textPrimary' style={styles.fieldLabel}>Receiver Phone <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={form.receiverPhone}
              onChangeText={(v) => handleChange('receiverPhone', v)}
              keyboardType="phone-pad"
              maxLength={10}
            />

            {/* horizontal line */}
            <View style={{ flex: 1, marginVertical: gpsh(10), width: '100%', height: 1, backgroundColor: '#eee' }} />

            {/* Address Fields */}
            <Text className='text-textPrimary' style={styles.fieldLabel}>Address Line 1 <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="H.No/Flat No/Room No, Street Name"
              value={form.addressLine1}
              onChangeText={(v) => handleChange('addressLine1', v)}
              maxLength={50}
            />
            <Text className='text-textPrimary' style={styles.fieldLabel}>Address Line 2 <Text className='text-textSecondary' style={styles.optional}>(Optional)</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Street Name, Area, Landmark"
              value={form.addressLine2}
              onChangeText={(v) => handleChange('addressLine2', v)}
              maxLength={50}
            />
            <Text className='text-textPrimary' style={styles.fieldLabel}>City <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="City"
              value={form.city}
              onChangeText={(v) => handleChange('city', v)}
              maxLength={30}
            />
            <Text className='text-textPrimary' style={styles.fieldLabel}>State <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="State"
              value={form.state}
              onChangeText={(v) => handleChange('state', v)}
              maxLength={20}
            />
            <Text className='text-textPrimary' style={styles.fieldLabel}>Postal Code <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Postal Code"
              value={form.postalCode}
              onChangeText={(v) => handleChange('postalCode', v)}
              keyboardType="numeric"
              maxLength={10}
            />
            <Text className='text-textPrimary' style={styles.fieldLabel}>Country <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Country"
              value={form.country}
              onChangeText={(v) => handleChange('country', v)}
              maxLength={20}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
              <Button variant='danger' title="Cancel" onPress={onClose} style={{ flex: 1, marginRight: 8 }} />
              <Button
                title={form.id ? 'Update' : 'Add'}
                onPress={() => {
                  if (
                    !getFinalLabel() ||
                    !form.receiverName ||
                    !form.receiverPhone ||
                    !form.addressLine1 ||
                    !form.city ||
                    !form.state ||
                    !form.postalCode ||
                    !form.country
                  ) {
                    return;
                  }
                  onSave({
                    ...form,
                    label: getFinalLabel(),
                    id: form.id || Math.random().toString(36).slice(2),
                  });
                  onClose();
                }}
                disabled={!isUpdateChangedCheck()}
                style={{ flex: 1, marginLeft: 8 }}
              />
            </View>
          </ScrollView>

        </View>
      </View>
    </Modal>
  );
};

const AddressScreen = () => {
  const { colors } = useTheme();
  const { addresses, selectedAddressId, addAddress, removeAddress, selectAddress, updateAddress } = useAddressStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [editAddress, setEditAddress] = useState<any>(null);

  const handleAdd = () => {
    setEditAddress(null);
    setModalVisible(true);
  };

  const handleEdit = (address: any) => {
    setEditAddress(address);
    setModalVisible(true);
  };

  const handleSave = (address: any) => {
    if (address.id && addresses.find((a) => a.id === address.id)) {
      updateAddress(address);
    } else {
      addAddress(address);
    }
  };

  return (
    <ThemedSafeArea>
      <DynamicHeader title="My Addresses" />
      <View className='bg-surfaceBase' style={[styles.container]}>
        <FlatList
          data={addresses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.addressItem,
                item.id === selectedAddressId && styles.selected,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: colors.textInverse
                }
              ]}
              onPress={() => selectAddress(item.id)}
            >
              {item.id === selectedAddressId && <View style={[
                {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  backgroundColor: colors.accent,
                  borderTopLeftRadius: 8,
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  zIndex: 1,
                }
              ]} >
                <Text style={{ color: colors.textPrimary }}>Default</Text>
              </View>
              }
              <View className='flex-1 pt-2' >
                <Text className='text-textPrimary' style={styles.label}>{item.label}</Text>
                <Text className='text-textPrimary' >{item.receiverName} ({item.receiverPhone})</Text>
                <Text className='text-textPrimary'>{item.addressLine1},</Text>
                {item.addressLine2 ? <Text className='text-textPrimary'>{item.addressLine2},</Text> : null}
                <Text className='text-textPrimary'>{item.city}, {item.state} - {item.postalCode},</Text>
                <Text className='text-textPrimary'>{item.country}</Text>
              </View>
              <View style={styles.actions}>
                <Button
                  title="Edit"
                  onPress={() => handleEdit(item)}
                  style={styles.editBtn}
                />
                <Button
                  title="Remove"
                  onPress={() => removeAddress(item.id)}
                  style={styles.removeBtn}
                />
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<View>
            <Animation name="Address" />
            <Text className='text-textPrimary' variant='medium16' style={{ textAlign: 'center', marginTop: 32 }}>No addresses yet.</Text>
          </View>}
        />
        <Button title="Add Address" onPress={handleAdd} style={styles.addBtn} />
        <AddressModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={handleSave}
          initial={editAddress}
        />
      </View>
    </ThemedSafeArea>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  addressItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  selected: {
    borderColor: '#FF894F',
    backgroundColor: '#FFF4ED',
  },
  label: { fontWeight: 'bold', marginBottom: 4 },
  actions: { marginTop: 8, gap: gpsh(8) },
  editBtn: { backgroundColor: '#fbbf24', marginRight: 8 },
  removeBtn: { backgroundColor: '#ef4444', marginRight: 0 },
  addBtn: { marginTop: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 20,
  },
  fieldLabel: {
    fontWeight: '600',
    marginBottom: 2,
    marginTop: 8,
    fontSize: 15,
  },
  required: { color: '#ef4444' },
  optional: { color: '#888', fontSize: 13 },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 10,
    marginBottom: 4,
    backgroundColor: '#fafafa',
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FF894F',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  pillSelected: {
    backgroundColor: '#FF894F',
  },
  pillText: {
    color: '#FF894F',
    fontWeight: '600',
  },
  pillTextSelected: {
    color: '#fff',
  },
});

export default AddressScreen;