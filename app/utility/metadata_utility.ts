import NetInfo from '@react-native-community/netinfo';
import { Dimensions, NativeModules, Platform } from "react-native";

export const getNetworkType = () => {
    NetInfo.fetch().then((state: any) => {
        return state.type;
    });
};

export const getDeviceLocale = () => {
    try {
        const iosLocale =
            NativeModules.SettingsManager.settings.AppleLocale ||
            NativeModules.SettingsManager.settings.AppleLanguages[0]; // "fr_FR"

        // Android:
        const andLocale = NativeModules.I18nManager.localeIdentifier; // "fr_FR"

        return Platform?.OS == 'ios' ? iosLocale : andLocale;
    } catch (error) {
        return 'unkown';
    }
    // iOS:
};

export const isLandscape = () => {
    const dim = Dimensions.get('window');
    let h = dim?.height;
    let w = dim?.width;

    return w > h;
};