import { gpsw } from '@/style/theme';
import React from 'react';
import { Text as RNText } from 'react-native';

const variantMap = {
    'light12': {
        className: `font-popins font-light`,
        style: {
            lineHeight: gpsw(14),
            fontSize: gpsw(12),
        }
    },
    'light14': {
        className: `font-popins font-light`,
        style: {
            lineHeight: gpsw(16),
            fontSize: gpsw(14),
        }
    },
    'regular14': {
        className: `font-popins font-normal`,
        style: {
            lineHeight: gpsw(16),
            fontSize: gpsw(14),
        }
    },
    'regular16': {
        className: `font-popins font-normal`,
        style: {
            lineHeight: gpsw(18),
            fontSize: gpsw(16),
        }
    },
    'medium14': {
        className: `font-popins font-medium`,
        style: {
            lineHeight: gpsw(16),
            fontSize: gpsw(14),
        }
    },
    'medium16': {
        className: `font-popins font-medium`,
        style: {
            lineHeight: gpsw(18),
            fontSize: gpsw(16),
        }
    },
    'bold18': {
        className: `font-popins font-bold`,
        style: {
            lineHeight: gpsw(20),
            fontSize: gpsw(18),
        }
    },
    'bold20': {
        className: `font-popins font-bold`,
        style: {
            lineHeight: gpsw(22),
            fontSize: gpsw(20),
        }
    },
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
        <RNText className={`${variantMap[variant].className} ${className}`} style={[variantMap[variant].style, style]} {...props}>
            {children}
        </RNText>
    );
}