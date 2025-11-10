import useTheme from '@/hooks/useTheme';
import { goBack } from '@/navigation/RootNavRef';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import IconSymbol from '../IconSymbol';

type LinearHeaderProps = {
    title: string;
    colors?: string[];
    style?: ViewStyle;
    children?: React.ReactNode;
}

export default function LinearHeader({ title, colors, style, children }: LinearHeaderProps) {
    const { colors: themColors } = useTheme()

    return (
        <View className='text-surfaceBase' style={[styles.container, styles.content,]}>
            <LinearGradient
                // colors={colors ? colors : [themColors.primary, themColors.secondary]}
                colors={[themColors.primary, themColors.primary]}
                style={[styles.headerGradient, style]}
            >
                <TouchableOpacity onPress={() => {
                    goBack()
                }} >
                    <IconSymbol size={24} name='left' color={themColors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{title}</Text>
                <TouchableOpacity></TouchableOpacity>
            </LinearGradient>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerGradient: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 80,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
    },
    headerTitle: {
        fontSize: 18,
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
        marginBottom: 24,
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
    selectedAddressCard: {
        borderRadius: 15,
        overflow: 'hidden',
    },
    addressGradient: {
        padding: 16,
    },
    selectedAddressText: {
        fontSize: 16,
        fontWeight: '600',
    },
    selectedAddressSubtext: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 4,
    },
    changeAddressText: {
        fontSize: 12,
        marginTop: 8,
        fontStyle: 'italic',
    },
    selectAddressButton: {
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#e9ecef',
        borderStyle: 'dashed',
    },
    selectAddressText: {
        fontSize: 16,
        color: '#667eea',
        textAlign: 'center',
        fontWeight: '600',
    },
    addressModal: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        alignItems: 'center',
        zIndex: 1000,
        width: '100%',
        justifyContent: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    addressList: {
        maxHeight: 300,
    },
    addressOption: {
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 10,
    },
    selectedAddressOption: {
        backgroundColor: '#e3f2fd',
        borderWidth: 2,
        borderColor: '#2196f3',
    },
    addressOptionText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    addressOptionSubtext: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    closeModalButton: {
        marginTop: 20,
        padding: 12,
        backgroundColor: '#ff5722',
        borderRadius: 10,
    },
    closeModalText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    paymentOption: {
        marginBottom: 12,
        borderRadius: 15,
        overflow: 'hidden',
    },
    paymentGradient: {
        padding: 16,
    },
    selectedPayment: {
        transform: [{ scale: 1.02 }],
    },
    paymentText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    paymentSubtext: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    upiInputContainer: {
        marginTop: 12,
    },
    upiInput: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 12,
        fontSize: 16,
        borderWidth: 2,
        borderColor: '#e9ecef',
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
});