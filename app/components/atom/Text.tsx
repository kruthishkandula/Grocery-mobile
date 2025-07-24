import { gpsw } from '@/style/theme';
import React from 'react';
import { Text as RNText } from 'react-native';

const variantMap = {
    'light12': `font-popins font-light text-[${gpsw(12)}px]`,
    'light14': `font-popins font-light text-[${gpsw(14)}px]`,
    'regular14': `font-popins font-normal text-[${gpsw(14)}px]`,
    'regular16': `font-popins font-normal text-[${gpsw(16)}px]`,
    'medium14': `font-popins font-medium text-[${gpsw(14)}px]`,
    'medium16': `font-popins font-medium text-[${gpsw(16)}px]`,
    'bold18': `font-popins font-bold text-[${gpsw(18)}px]`,
    'bold20': `font-popins font-bold text-[${gpsw(20)}px]`,
};

type TextProps = React.ComponentProps<typeof RNText> & {
    variant?: keyof typeof variantMap;
};

export default function Text({
    variant = 'regular16',
    className,
    style,
    children,
    ...props
}: TextProps) {

    return (
        <RNText className={`${variantMap[variant]} ${className}`} style={[style]} {...props}>
            {children}
        </RNText>
    );
}