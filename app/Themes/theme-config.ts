import { StatusBarStyle } from 'expo-status-bar';
import { vars } from 'nativewind';




// themes.js
const themeDefinitions = {
  light: {
    primary: '#62BF06',
    secondary: '#8AD93B',
    tertiary: '#F28907',
    fourth: '#D91604',
    bg: '#FFFFFF',
    outstand: '#F2F2F2',
    text1: "#000000",
    text2: "#FFFFFF",
    shadingLight: 'rgba(196, 196, 196, 0.3)',
    shading: '#5F5F5D',
    shadingDark: '#bbbbbb',
  },
  dark: {
    primary: '#261022',
    secondary: '#3F5259',
    tertiary: '#010D00',
    fourth: '#3F730A',
    bg: '#3f3f3f',
    outstand: '#5F5F5D',
    text1: '#FFFFFF',
    text2: '#000000',
    shadingLight: '#9c9c9c',
    shading: '#9e9e9e',
    shadingDark: '#8f8f8f',
  },
  // xmas: {
  //   primary: '#FFE6E1',
  //   secondary: '#F1E3D3',
  //   tertiary: '#F28907',
  //   fourth: '#D91604',
  //   bg: '#FFFFFF',
  //   outstand: '#FF3F33',
  // },
  // halloween: {
  //   primary: '#000000',
  //   secondary: '#5522dd',
  //   tertiary: '#F28907',
  //   fourth: '#D91604',
  //   bg: '#FFFFFF',
  //   outstand: '#ffcc00',
  // },
};

// Create CSS vars for your styling needs
export const Themes = {
  light: vars({
    '--color-primary': themeDefinitions.light.primary,
    '--color-secondary': themeDefinitions.light.secondary,
    '--color-tertiary': themeDefinitions.light.tertiary,
    '--color-fourth': themeDefinitions.light.fourth,
    '--color-bg': themeDefinitions.light.bg,
    '--color-outstand': themeDefinitions.light.outstand,
    '--color-text1': themeDefinitions.light.text1,
    '--color-text2': themeDefinitions.light.text2,
    '--color-shading-light': themeDefinitions.light.shadingLight,
    '--color-shading': themeDefinitions.light.shading,
    '--color-shading-dark': themeDefinitions.light.shadingDark,
  }),
  dark: vars({
    '--color-primary': themeDefinitions.dark.primary,
    '--color-secondary': themeDefinitions.dark.secondary,
    '--color-tertiary': themeDefinitions.dark.tertiary,
    '--color-fourth': themeDefinitions.dark.fourth,
    '--color-bg': themeDefinitions.dark.bg,
    '--color-outstand': themeDefinitions.dark.outstand,
    '--color-text1': themeDefinitions.dark.text1,
    '--color-text2': themeDefinitions.dark.text2,
    '--color-shading-light': themeDefinitions.dark.shadingLight,
    '--color-shading': themeDefinitions.dark.shading,
    '--color-shading-dark': themeDefinitions.dark.shadingDark,
  }),
  // xmas: vars({
  //   '--color-primary': themeDefinitions.xmas.primary,
  //   '--color-secondary': themeDefinitions.xmas.secondary,
  //   '--color-tertiary': themeDefinitions.xmas.tertiary,
  //   '--color-fourth': themeDefinitions.xmas.fourth,
  //   '--color-bg': themeDefinitions.xmas.bg,
  //   '--color-outstand': themeDefinitions.xmas.outstand,
  // }),
  // halloween: vars({
  //   '--color-primary': themeDefinitions.halloween.primary,
  //   '--color-secondary': themeDefinitions.halloween.secondary,
  //   '--color-tertiary': themeDefinitions.halloween.tertiary,
  //   '--color-fourth': themeDefinitions.halloween.fourth,
  //   '--color-bg': themeDefinitions.halloween.bg,
  //   '--color-outstand': themeDefinitions.halloween.outstand,
  // }),
};

export type ThemesVariant = keyof typeof Themes;

// Export function to get raw colors for JS usage
export const getThemeColors = (themeName: keyof typeof Themes) => {
  return themeDefinitions[themeName] || themeDefinitions.light;
};

type StatusBarThemeStyle = {
  [keys in ThemesVariant]: {
    style: StatusBarStyle;
    background: string;
  };
};

export const StatusBarTheme: StatusBarThemeStyle = {
  light: {
    style: 'dark',
    background: '#fff',
  },
  dark: {
    style: 'light',
    background: '#000',
  },
  // xmas: {
  //   style: 'light',
  //   background: '#3225de',
  // },
  // halloween: {
  //   style: 'dark',
  //   background: '#52d',
  // },
};