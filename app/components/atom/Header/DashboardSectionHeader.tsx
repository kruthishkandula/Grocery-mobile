import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from '../Text';

export default function DashboardSectionHeader({ section }: { section: { title: string, showSeeAll?: boolean, seeAllRoute?: string } }) {
    const { navigate } = useNavigation<any>();

    return (
        <View className='flex-row justify-between items-center py-4'>
            <Text variant='bold20' className='text-[20px] text-text1'>{section.title}</Text>
            {section.showSeeAll && (
                <TouchableOpacity onPress={() => {
                    section.seeAllRoute && navigate(section.seeAllRoute);
                }} >
                    <Text variant='light12' className='text-[16px] text-text1'>See All</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}