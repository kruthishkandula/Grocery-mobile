import {
    buttonCornerRadius,
    buttonExtraSmallFontSize,
    buttonSmall,
    globalBackgroundShading,
    globalBlack,
    globalExtraLightGrey,
    globalGreen100,
    globalGreen40,
    globalGreen60,
    globalGreen80,
    globalGrey,
    globalLightGrey,
    globalMoMoBlue,
    globalMoMoDarkBlue,
    globalMoMoLightBlue,
    globalMtnBrighterSansMedium12,
    globalMtnBrighterSansMedium16,
    globalMtnBrighterSansMedium18,
    globalMtnBrighterSansRegular12,
    globalMtnBrighterSansRegular16,
    globalOrange100,
    globalOrange40,
    globalOrange60,
    globalOrange80,
    globalRed100,
    globalRed40,
    globalRed60,
    globalRed80,
    globalSunshineYellow,
    globalWhite,
} from '@/style-dictionary-dist/momoStyle';
import { Dimensions, PixelRatio, Platform } from 'react-native';

export const palette = {
    transparent: 'transparent',
    buttonDefault: globalMoMoBlue,

    momoBlue: globalMoMoBlue, //#004f71
    momoDarkBlue: globalMoMoDarkBlue, //#003654
    momoLightBlue: globalMoMoLightBlue, //#4d849c

    sunshineYellow: globalSunshineYellow, //#ffcb05
    black: globalBlack, //#000000
    grey: globalGrey, //#5f5f5f
    lightGrey: globalLightGrey, //#afafaf
    extraLightGrey: globalExtraLightGrey, //#e8e8e8
    white: globalWhite, //#ffffff
    backgroundShading: globalBackgroundShading, //#f2f2f2
    red40: globalRed40, //#F8aeae
    red60: globalRed60, //#F48585
    red80: globalRed80, //#F15D5D
    red100: globalRed100, //#ed3434
    green40: globalGreen40, //#9fdfb7
    green60: globalGreen60, //#6fcf93
    green80: globalGreen80, //#3fbf6f
    green100: globalGreen100, //#0faf4b
    orange40: globalOrange40, //#FFD499
    orange60: globalOrange60, //#FFBF66
    orange80: globalOrange80, //#FFA933
    orange100: globalOrange100, //#ff9400
    shadow: '#333333',
    shadowIos: '#333333',
};
export const fontFamily = (family: 'Regular' | 'Bold' | 'Medium' | 'Light') =>
    `MTNBrighterSans-${family}`;
const { scale, width, height } = Dimensions.get('window');

export const CardNumbers = height > 810 ? 4 : 3;

export function getFontSizeByWindowWidth(fontSize: number) {
    fontSize = parseInt(fontSize.toString(), 10);
    const baseWidth = 320; // width of smallest iPhone
    return PixelRatio.roundToNearestPixel(fontSize * (width / baseWidth));
}

export function getFontSizeByWindowHeight(fontSize: number) {
    fontSize = parseInt(fontSize.toString(), 10);
    const baseHeight = 568; // width of smallest iPhone
    // const baseHeight = 568; // width of smallest iPhone
    return height > 800
        ? PixelRatio.roundToNearestPixel(fontSize * (800 / baseHeight))
        : PixelRatio.roundToNearestPixel(fontSize * (height / baseHeight));
}
export const moderateScale = (size: number, factor = 0.5) =>
    size + (getFontSizeByWindowWidth(size) - size) * factor;
export const moderateVerticalScale = (size: number, factor = 0.5) =>
    size + (getFontSizeByWindowHeight(size) - size) * factor;

export const lightThemes = {
    textVariants: {
        defaults: {
            fontSize: getFontSizeByWindowWidth(14),
            fontFamily: 'MTNBrighterSans-Medium',
            color: 'grey',
        },
        storyHead: {
            fontFamily: 'MTNBrighterSans-Bold',
            fontSize: getFontSizeByWindowWidth(18),
            lineHeight: getFontSizeByWindowWidth(23.4),
            color: 'momoDarkBlue',
        },
        light12: {
            fontFamily: fontFamily('Light'),
            fontSize: getFontSizeByWindowWidth(parseInt('12')),
            lineHeight: getFontSizeByWindowHeight(15.6),
            color: 'black',
        },
        light16: {
            fontFamily: fontFamily('Light'),
            fontSize: getFontSizeByWindowWidth(parseInt('16')),
            lineHeight: getFontSizeByWindowHeight(24),
            color: 'black',
        },
        regular8: {
            fontFamily: fontFamily('Regular'),
            fontSize: getFontSizeByWindowWidth(8),
            lineHeight: getFontSizeByWindowHeight(10.4),
            color: 'grey',
        },
        regular10: {
            fontFamily: fontFamily('Regular'),
            fontSize: getFontSizeByWindowWidth(10),
            lineHeight: getFontSizeByWindowHeight(13),
            color: 'black',
        },
        regular12: {
            fontFamily: fontFamily('Regular'),
            fontSize: getFontSizeByWindowWidth(
                parseInt(globalMtnBrighterSansRegular12.fontSize)
            ),
            lineHeight: getFontSizeByWindowHeight(15.6),
            color: 'grey',
        },
        regular14: {
            fontFamily: fontFamily('Regular'),
            fontSize: getFontSizeByWindowWidth(14),
            lineHeight: getFontSizeByWindowHeight(18.2),
            color: 'grey',
        },
        regular16: {
            fontFamily: fontFamily('Regular'),
            fontSize: getFontSizeByWindowWidth(
                parseInt(globalMtnBrighterSansRegular16.fontSize)
            ),
            lineHeight: getFontSizeByWindowHeight(24),
            color: 'black',
        },
        medium10: {
            fontFamily: fontFamily('Medium'),
            fontSize: getFontSizeByWindowWidth(10),
            lineHeight: getFontSizeByWindowHeight(13),
            color: 'black',
        },
        medium12: {
            fontFamily: fontFamily('Medium'),
            fontSize: getFontSizeByWindowWidth(
                parseInt(globalMtnBrighterSansMedium12.fontSize)
            ),
            lineHeight: getFontSizeByWindowHeight(15.6),
            color: 'black',
        },
        medium14: {
            fontFamily: fontFamily('Medium'),
            fontSize: getFontSizeByWindowWidth(14),
            lineHeight: getFontSizeByWindowHeight(20),
            color: 'black',
        },
        medium16: {
            fontFamily: fontFamily('Medium'),
            fontSize: getFontSizeByWindowWidth(
                parseInt(globalMtnBrighterSansMedium16.fontSize)
            ),
            lineHeight: getFontSizeByWindowHeight(24),
            color: 'black',
        },
        medium18: {
            fontFamily: fontFamily('Medium'),
            fontSize: getFontSizeByWindowWidth(
                parseInt(globalMtnBrighterSansMedium18.fontSize)
            ),
            lineHeight: getFontSizeByWindowHeight(23.4),
            color: 'black',
        },
        medium20: {
            fontFamily: 'MTNBrighterSans-Medium',
            fontSize: getFontSizeByWindowWidth(20),
            lineHeight: getFontSizeByWindowHeight(25),
        },
        bold18: {
            fontFamily: fontFamily('Bold'),
            fontSize: getFontSizeByWindowWidth(parseInt('18')),
            lineHeight: getFontSizeByWindowHeight(23.4),
            color: 'black',
        },
        bold12: {
            fontFamily: fontFamily('Bold'),
            fontSize: getFontSizeByWindowWidth(parseInt('12')),
            lineHeight: getFontSizeByWindowHeight(18.2),
            color: 'black',
        },
        bold14: {
            fontFamily: fontFamily('Bold'),
            fontSize: getFontSizeByWindowWidth(parseInt('14')),
            lineHeight: getFontSizeByWindowHeight(18.2),
            color: 'black',
        },
        medium21: {
            fontFamily: 'MTNBrighterSans-Medium',
            fontSize: getFontSizeByWindowWidth(21),
            lineHeight: getFontSizeByWindowHeight(27.3),
        },
        headings: {
            fontFamily: 'MTNBrighterSans-Bold',
            // fontWeight: '500',
            fontSize: getFontSizeByWindowWidth(18),
            lineHeight: getFontSizeByWindowWidth(23.4),
            color: 'black',
        },
        header: {
            fontFamily: 'MTNBrighterSans-Bold',
            fontSize: getFontSizeByWindowWidth(16),
            lineHeight: getFontSizeByWindowWidth(20.8),
            color: 'momoDarkBlue',
            alignSelf: 'center',
        },
        body: {
            fontFamily: 'MTNBrighterSans-Regular',
            fontSize: 16,
            lineHeight: 24,
            color: 'grey',
        },
        xl: {
            fontFamily: 'MTNBrighterSans-Bold',
            fontSize: 16,
            lineHeight: 20.8,
            color: 'grey',
        },
        l: {
            fontFamily: 'MTNBrighterSans-Bold',
            fontSize: 20,
            lineHeight: 40,
            color: 'grey',
        },
        test: {
            fontSize: 16,
            lineHeight: 24,
        },
        extraSmall: {
            fontFamily: 'MTNBrighterSans-Regular',
            fontSize: getFontSizeByWindowWidth(
                parseInt(buttonExtraSmallFontSize)
            ),
            textTransform: 'uppercase',
        },
        small: {
            fontFamily: 'MTNBrighterSans-Medium',
            fontSize: getFontSizeByWindowWidth(parseInt(buttonSmall.fontSize)),
            textTransform: 'uppercase',
        },
        medium: {
            fontFamily: 'MTNBrighterSans-Medium',
            fontSize: getFontSizeByWindowWidth(14),
            lineHeight: getFontSizeByWindowHeight(18.2),
            textTransform: 'uppercase',
        },
        fullWidth: {
            fontFamily: 'MTNBrighterSans-Medium',
            fontSize: getFontSizeByWindowWidth(14),
            lineHeight: getFontSizeByWindowHeight(18),
            textTransform: 'uppercase',
        },
    },
    cardVariants: {
        defaults: {
            backgroundColor: 'white',
            width: '100%',
            borderRadius: getFontSizeByWindowWidth(9),
        },
        noShadow: {
            backgroundColor: 'white',
            width: '100%',
            borderRadius: getFontSizeByWindowWidth(9),
        },
        shadow: {
            elevation: 14,
            shadowColor: Platform.select({
                ios: 'lightGrey', //878787  9b9b9b
                android: 'shadow', // 5b5b5b 4f4f4f
            }),
            shadowOffset: {
                width: 1,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
        },
        shadow1: {
            elevation: 10,
            shadowColor: Platform.select({
                ios: 'lightGrey', //878787  9b9b9b
                android: 'shadow', // 5b5b5b 4f4f4f
            }),
            shadowOffset: {
                width: 1,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
        },
    },
    buttonVariants: {
        defaults: {
            paddingVertical: 'vs',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: getFontSizeByWindowWidth(
                parseInt(buttonCornerRadius)
            ),
            // paddingHorizontal: 's',
        },
        primary: {
            backgroundColor: 'buttonDefault',
        },
        secondary: {
            borderColor: 'momoBlue',
            borderWidth: 2,
        },
        tertiary: {},
    },
    colors: {
        ...palette,
        mainBackground: palette.white,
        cardPrimaryBackground: palette.white,
        tests: palette.black,
    },

    spacing: {
        '0': getFontSizeByWindowWidth(0),
        xxs: getFontSizeByWindowWidth(5),
        hxxs: getFontSizeByWindowWidth(5),
        hxs: getFontSizeByWindowWidth(8),
        hsm: getFontSizeByWindowWidth(10),
        hs: getFontSizeByWindowWidth(16),
        hm: 20,
        hmm: getFontSizeByWindowWidth(20),
        hl: getFontSizeByWindowWidth(24),
        hxl: getFontSizeByWindowWidth(40),
        vxxs: getFontSizeByWindowHeight(5),
        vxs: getFontSizeByWindowHeight(8),
        vsm: getFontSizeByWindowHeight(10),
        vs: getFontSizeByWindowHeight(16),
        vm: getFontSizeByWindowHeight(20),
        vl: getFontSizeByWindowHeight(24),
        vxl: getFontSizeByWindowHeight(40),
    },
    breakpoints: {
        phone: 0,
        iph: 0,
        tablet: 768,
        longPhone: {
            width: 0,
            height: 812,
        },
        largeTablet: 1024,
    },
};

export const darkThemes: Theme = {
    ...lightThemes,
    colors: {
        ...lightThemes.colors,
        tests: palette.white,
        mainBackground: palette.black,
        cardPrimaryBackground: palette.white,
    },
};

export type Theme = typeof lightThemes;
export default lightThemes;


export const gpsh = getFontSizeByWindowHeight
export const gpsw = getFontSizeByWindowWidth