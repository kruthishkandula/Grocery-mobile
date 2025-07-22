import DynamicHeader from '@atom/DynamicHeader';
import React from 'react';
import { View, Text } from 'react-native';

export default function About() {
    return (
        <View className="flex-1 ">
            <DynamicHeader variant='back' title='About Grocery Plus' />
            <View className="flex-1 items-center justify-center bg-white px-6">
                <Text className="text-2xl font-bold mb-2">About Grocery Plus</Text>
                <Text className="text-base text-gray-600 text-center">
                    Grocery Plus is your one-stop solution for all your grocery needs.
                    Easily browse, search, and order groceries with a seamless experience.
                </Text>
                <Text className="text-xs text-gray-400 mt-4">Version 1.0.0</Text>
            </View>
        </View>
    );
}