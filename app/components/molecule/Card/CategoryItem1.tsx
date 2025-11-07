import { gpsh, gpsw } from '@/style/theme';
import { useThemeContextActions } from '@/Themes';
import { getThemeColors } from '@/Themes/theme-config';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, ViewStyle } from 'react-native';
import { CachedImage } from '../../atom';

export default function CategoryItem1({ item, style }: { item: { imageUrl: any, name: string, }, style?: ViewStyle }) {
    const { theme } = useThemeContextActions();
    const colors = getThemeColors(theme);
    const { navigate } = useNavigation<any>()

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
                navigate('Products', {
                    ...item,
                    category: item,
                    title: item.name
                });
            }}
            className='flex bg-surfaceOverlay m-1 flex-col items-center p-4 rounded-[20px]'
            style={[{
                // elevation: 4,
                // shadowColor: '#444',
                // shadowOffset: 2,
                // shadowOpacity: 0.1,
                // shadowRadius: 6,
            }, style]}

        >
            <CachedImage
                name={`${item.imageUrl}`}
                width={gpsw(80)}
                height={gpsh(60)}
                contentFit="fill"
            />
            <Text numberOfLines={2} style={{ color: colors?.textPrimary, maxWidth: gpsw(100), textAlign: 'center' }} className='text-[16px] font-[500] text-text1 mt-2'>{item.name}</Text>
        </TouchableOpacity>
    )
}