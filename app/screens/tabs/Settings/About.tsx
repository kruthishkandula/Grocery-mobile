import { ThemedSafeArea } from '@/components/atom';
import DynamicHeader from '@atom/DynamicHeader';
import React from 'react';
import { View, Text } from 'react-native';

export default function About() {
    return (
        <ThemedSafeArea>
            <View className="flex-1 ">
                <DynamicHeader variant='back' title='About Grocery Plus' />
                <View className="flex-1 items-center justify-center bg-surfaceBase px-6">
                    <Text className="text-2xl text-textPrimary font-bold mb-2">About Grocery Plus</Text>
                    <Text className="text-base text-textSecondary text-center">
                        Grocery Plus is your one-stop solution for all your grocery needs.
                        Easily browse, search, and order groceries with a seamless experience.
                    </Text>
                    <Text className="text-xs text-textSecondary mt-4">Version 1.0.0</Text>
                </View>
            </View>
        </ThemedSafeArea>
    );
}