import { Text } from "react-native";
import { Linking, Platform, useWindowDimensions } from "react-native";

export function getRandomObj(obj: any) {
    var objkeys = Object.keys(obj)
    let value = objkeys[Math.floor(Math.random() * objkeys.length)]

    return obj(value)
}

export const extractColors = (themeVars: any) => {
    const colors: any = {};

    // If your vars() function returns an object with the CSS custom properties
    Object.entries(themeVars).forEach(([key, value]) => {
        if (key.startsWith('--color-')) {
            const colorName = key.replace('--color-', '').replace(/-/g, '');
            colors[colorName] = value;
        }
    });

    return colors;
};

export const calculateNumColumns = (CARD_MIN_WIDTH: number) => {
    const { width: screenWidth } = useWindowDimensions()
    return Math.floor(screenWidth / CARD_MIN_WIDTH);
};

//Convert number to Float with 2 or n decimals
export const convertToFloat = (number: any, decimals: number = 2): any => {
    var floatNumber = parseFloat(number);
    if (Number.isNaN(floatNumber)) {
        return number; // return null if the input is not a valid number
    }

    return floatNumber.toFixed(decimals);
};


export function generateRandomString(length: number) {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    const randomValues = new Uint32Array(length);
    // crypto.getRandomValues(randomValues);
    crypto.getRandomValues(randomValues);
    let code = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = randomValues[i] % charactersLength;
        code += characters.charAt(randomIndex);
    }
    return code;
}

export const getStringOrFallback = (
    value: any,
    fallback = 'something went wrong',
) => {
    if (typeof value === 'string') {
        if (
            value.toLowerCase().includes('ecw') ||
            value.toLowerCase().includes('<html>') ||
            value.toLowerCase().includes('<!doctype html>') ||
            value.toLowerCase().includes('http') ||
            value.toLowerCase().includes('invalid')
        ) {
            return fallback;
        }
        return value.split(' ').slice(0, 7).join(' ');
    } else {
        return fallback;
    }
};

export const openDeviceSpecificSettings = () => {
    if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:');
    } else if (Platform.OS === 'android') {
        Linking.openSettings();
    }
};

export const openAppSettings = () => {
    if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:');
    } else if (Platform.OS === 'android') {
        Linking.openSettings();
    }
};

export const onCommonLinkPress = (url: string) => {
    if (url) {
        switch (url) {
            case 'openLocationSettings':
                openAppSettings();
                break;
            case 'openSettings':
                openDeviceSpecificSettings();
                break;
            default:
                Linking.openURL(url);
        }
        return false;
    }

    return true;
};


export const _randmomString = (length: number = 32): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}