import { Button, DynamicHeader, HorizontalCardSeparator, IconSymbol } from '@/components/atom';
import Box from '@/components/atom/Box';
import { useAddressStore } from '@/store/address/addressStore';
import { gpsh } from '@/style/theme';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

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
  const [form, setForm] = useState(initial || emptyAddress);

  React.useEffect(() => {
    setForm(initial || emptyAddress);
  }, [visible, initial]);

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

  return (
    <Modal onDismiss={onClose} visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <ScrollView showsVerticalScrollIndicator={false} style={[styles.modalContent, { maxHeight: '60%' }]} contentContainerStyle={{ paddingBottom: 24 }}>
          <View className='flex-row justify-between' >
            <Text style={styles.modalTitle}>{form.id ? 'Edit Address' : 'Add Address'}</Text>
            <TouchableOpacity onPress={onClose} style={{ marginLeft: 'auto' }}>
              <IconSymbol name="close" size={24} color="#222" style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
          </View>

          {/* horizontal line */}
          <View style={{ flex: 1, marginVertical: gpsh(10), width: '100%', height: 2, backgroundColor: '#eee' }} />

          {/* Label Pills */}
          <Text style={styles.fieldLabel}>Save As <Text style={styles.required}>*</Text></Text>
          <View style={styles.pillsRow}>
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
                  (form.label === option) && styles.pillTextSelected,
                ]}>
                  {option}
                </Text>
              </Pressable>
            ))}
          </View>
          {form.label === 'Other' && (
            <TextInput
              style={styles.input}
              placeholder="Custom label"
              value={form.customLabel}
              onChangeText={(v) => handleChange('customLabel', v)}
            />
          )}
          {/* Receiver Details */}
          <Text style={styles.fieldLabel}>Receiver Name <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={form.receiverName}
            onChangeText={(v) => handleChange('receiverName', v)}
          />
          <Text style={styles.fieldLabel}>Receiver Phone <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={form.receiverPhone}
            onChangeText={(v) => handleChange('receiverPhone', v)}
            keyboardType="phone-pad"
          />

          {/* horizontal line */}
          <View style={{ flex: 1, marginVertical: gpsh(10), width: '100%', height: 1, backgroundColor: '#eee' }} />

          {/* Address Fields */}
          <Text style={styles.fieldLabel}>Address Line 1 <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="H.No/Flat No/Room No, Street Name"
            value={form.addressLine1}
            onChangeText={(v) => handleChange('addressLine1', v)}
          />
          <Text style={styles.fieldLabel}>Address Line 2 <Text style={styles.optional}>(Optional)</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="Street Name, Area, Landmark"
            value={form.addressLine2}
            onChangeText={(v) => handleChange('addressLine2', v)}
          />
          <Text style={styles.fieldLabel}>City <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="City"
            value={form.city}
            onChangeText={(v) => handleChange('city', v)}
          />
          <Text style={styles.fieldLabel}>State <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="State"
            value={form.state}
            onChangeText={(v) => handleChange('state', v)}
          />
          <Text style={styles.fieldLabel}>Postal Code <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="Postal Code"
            value={form.postalCode}
            onChangeText={(v) => handleChange('postalCode', v)}
            keyboardType="numeric"
          />
          <Text style={styles.fieldLabel}>Country <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="Country"
            value={form.country}
            onChangeText={(v) => handleChange('country', v)}
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
              style={{ flex: 1, marginLeft: 8 }}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const AddressScreen = () => {
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
    <View style={{ flex: 1 }}>
      <DynamicHeader title="My Addresses" />
      <View style={styles.container}>
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
                }
              ]}
              onPress={() => selectAddress(item.id)}
            >
              {item.id === selectedAddressId && <View style={[
                {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  backgroundColor: '#FF894F',
                  borderTopLeftRadius: 8,
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  zIndex: 1,
                }
              ]} >
                <Text style={{ color: '#fff' }}>Default</Text>
              </View>
              }
              <View className='flex-1 pt-2' >
                <Text style={styles.label}>{item.label}</Text>
                <Text>{item.receiverName} ({item.receiverPhone})</Text>
                <Text>{item.addressLine1},</Text>
                {item.addressLine2 ? <Text>{item.addressLine2},</Text> : null}
                <Text>{item.city}, {item.state} - {item.postalCode},</Text>
                <Text>{item.country}</Text>
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
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 32 }}>No addresses yet.</Text>}
        />
        <Button title="Add Address" onPress={handleAdd} style={styles.addBtn} />
        <AddressModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={handleSave}
          initial={editAddress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F9FAFB' },
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