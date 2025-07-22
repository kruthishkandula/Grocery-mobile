import { useThemeContextActions } from '@/Themes';
import { getThemeColors } from '@/Themes/theme-config';
import React from 'react';
import { TextInput, View } from 'react-native';
import { IconSymbol } from '../atom';

export default function SearchBar() {
    const { theme } = useThemeContextActions();
    const colors = getThemeColors(theme);

    return (
        <View className='p-3 flex-row items-center border-[1px] rounded-[10px] border-gray-300 bg-bg'>
            <IconSymbol name='search' size={20} color={colors?.text1} />
            <TextInput
                placeholder='Search Anything'
                className='flex-1 ml-3 text-text1 p-[10px] h-[50px]'
                style={{ color: colors?.text1 }}
                placeholderTextColor={colors?.text1}
            />
            <IconSymbol name='microphone' size={20} color={colors?.text1} />
        </View>
    )
}