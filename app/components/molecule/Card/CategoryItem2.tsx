import { gpsh } from '@/style/theme';
import { useThemeContextActions } from '@/Themes';
import { getThemeColors } from '@/Themes/theme-config';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, Dimensions } from 'react-native';
import { CachedImage } from '../../atom';

const screenWidth = Dimensions.get('window').width;

export default function CategoryItem2({
    item,
    numColumns = 3,
}: {
    item: { imageUrl: any, name: string },
    numColumns?: number
}) {
    const { theme } = useThemeContextActions();
    const colors = getThemeColors(theme);
    const { navigate } = useNavigation<any>();

    // 10% of the row is for spacing
    const totalSpacingPercent = 10;
    const itemWidth = screenWidth * ((100 - totalSpacingPercent) / 100) / numColumns;

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
            className='flex bg-surfaceOverlay flex-col items-center rounded-[20px]'
            style={{
                width: itemWidth,
                minHeight: gpsh(120),
                marginBottom: 16,
            }}
        >
            <CachedImage
                name={`${item.imageUrl}`}
                style={{
                    maxHeight: gpsh(90),
                    maxWidth: itemWidth * 0.9,
                }}
                contentFit="fill"
            />
            <Text
                numberOfLines={2}
                adjustsFontSizeToFit
                style={{
                    color: colors?.textPrimary,
                    maxWidth: itemWidth * 0.9,
                    textAlign: 'center',
                    fontSize: Math.max(14, Math.min(18, itemWidth * 0.09)),
                    marginTop: 8,
                }}
                className='font-[500] text-text1'
            >
                {item.name}
            </Text>
        </TouchableOpacity>
    );
}