import DynamicHeader from '@atom/DynamicHeader';
import React from 'react';
import { Text, View } from 'react-native';

export default function Help() {
    return (
        <View className="flex-1 ">
            <DynamicHeader variant='back' title='Help & Support' />
            <View className="flex-1 items-center justify-center bg-white px-6">
                <Text className="text-2xl font-bold mb-2">Help & Support</Text>
                <Text className="text-base text-gray-600 text-center">
                    For any help, contact us at support@groceryplus.com or visit our FAQ section in the app.
                </Text>
            </View>
        </View>
    );
}