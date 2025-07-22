import { gpsh, gpsw } from '@/style/theme';
import { useThemeContextActions } from '@/Themes';
import { getThemeColors } from '@/Themes/theme-config';
import { CMS_URL } from '@/utility/config';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CachedImage } from '../atom';

export default function CategoryItem1({ item }: { item: { imageUrl: any, name: string } }) {
    const { theme } = useThemeContextActions();
    const colors = getThemeColors(theme);
    const { navigate } = useNavigation<any>()

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => {
            navigate('Products', {
                ...item,
                category: item,
                title: item.name
            });
        }} className='flex bg-bg m-1 flex-col items-center p-4 rounded-[20px] shadow-lg shadow-yellow-200'>
            <CachedImage
                name={`${item.imageUrl}`}
                width={gpsw(124)}
                height={gpsh(100)}
                contentFit="fill"
            />
            <Text style={{ color: colors?.text1 }} className='text-[16px] font-[500] text-text1 mt-2'>{item.name}</Text>
        </TouchableOpacity>
    )
}