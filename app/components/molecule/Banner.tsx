import { BannerTypes } from '@/enums/bannerType';
import { CMS_URL } from '@/utility/config';
import React from 'react';
import { Text, View, Image, ViewStyle, TextStyle, Dimensions } from 'react-native';

interface BannerProps {
    type: keyof typeof BannerTypes;
    description?: string;
    imageUrl?: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const { width: screenWidth } = Dimensions.get('window');

const Banner = ({ type, description, imageUrl, style, textStyle }: BannerProps) => {
    return (
        <View
            className="bg-[transparent] rounded-xl"
            style={[
                {
                    width: '100%',
                    alignSelf: 'center',
                    // Remove vertical padding for flush look
                    padding: 0,
                    margin: 0,
                    borderRadius: 12, // match image border radius
                },
                style,
            ]}
        >
            {imageUrl && (
                <Image
                    className="rounded-xl"
                    style={{
                        width: '100%',
                        height: 160,
                        borderRadius: 12, // match container
                    }}
                    source={{ uri: imageUrl.startsWith('http') ? imageUrl : `${CMS_URL}${imageUrl}` }}
                    resizeMode="cover"
                />
            )}
            {description && (
                <Text className="text-[13px] text-[#555] mt-2 text-center" style={textStyle}>
                    {description}
                </Text>
            )}
        </View>
    );
};

export default Banner;