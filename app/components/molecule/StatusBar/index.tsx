import React from 'react';
// import {StatusBar, View} from 'react-native';
import { useIsFocused, useTheme } from '@react-navigation/native';
import { StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const C = function (props: any) {
    const { colors } = useTheme();
    const isFocused = useIsFocused();
    if (isFocused) {
        const insets = useSafeAreaInsets();
        const style = {
            height: insets.top,
            backgroundColor: colors.background,
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        };
        // if (props.backgroundColor) {
        //   style.backgroundColor = props.backgroundColor
        // }
        return (
            // @ts-ignore
            <View style={style}>
                <StatusBar animated {...props} />
            </View>
        );
    }
    return null;
};

export const DarkStatusBar = function (props: any) {
    const { colors } = useTheme();
    return (
        <C
            backgroundColor={props.backgroundColor || colors.background}
            // barStyle="dark-content"
            barStyle="light-content"
        />
    );
};

export const LightStatusBar = function (props: any) {
    const { colors } = useTheme();
    return (
        <C
            backgroundColor={props.backgroundColor || colors.background}
            barStyle="dark-content"
        />
    );
};

export const SecondaryStatusBar = function (props: any) {
    const { colors } = useTheme();
    return (
        <C
            backgroundColor={props.backgroundColor || colors.background}
            barStyle="dark-content"
        />
    );
};

export const CustomStatusBar = function (props: any) {
    return <C {...props} />;
};

export const TransparentStatusBar = function (props: any) {
    const { colors } = useTheme();
    return (
        <C
            backgroundColor={props.backgroundColor || colors.background}
            barStyle="dark-content"
        />
    );
};
