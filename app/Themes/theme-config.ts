// themes.ts
import { StatusBarStyle } from 'expo-status-bar';
import { vars } from 'nativewind';

export const themeDefinitions = {
  light: {
    // Brand
    primary: '#62BF06',
    primaryHover: '#4E9905',
    secondary: '#8AD93B',
    accent: '#F28907',
    
    // Semantic
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#D91604',
    info: '#2196F3',
    
    // Surfaces
    surfaceBase: '#FFFFFF',
    surfaceElevated: '#F5F5F5',
    surfaceOverlay: '#FAFAFA',
    
    // Borders
    borderDefault: '#E0E0E0',
    borderSubtle: '#F0F0F0',
    
    // Text
    textPrimary: '#212121',
    textSecondary: '#757575',
    textTertiary: '#9E9E9E',
    textInverse: '#FFFFFF',
    
    // Interactive
    focusRing: '#2196F3',
    linkDefault: '#1976D2',

    // colors
    dark: '#000',
    light: '#fff'
  },
  dark: {
    // Brand - Desaturated
    primary: '#7DD321',
    primaryHover: '#8FE033',
    secondary: '#A0E65C',
    accent: '#FFA726',
    
    // Semantic
    success: '#66BB6A',
    warning: '#FFA726',
    error: '#EF5350',
    info: '#42A5F5',
    
    // Surfaces - Elevated = Lighter
    surfaceBase: '#121212',
    surfaceElevated: '#1E1E1E',
    surfaceOverlay: '#2C2C2C',
    
    // Borders - Reduced contrast
    borderDefault: '#404040',
    borderSubtle: '#2C2C2C',
    
    // Text - Off-white
    textPrimary: '#E0E0E0',
    textSecondary: '#A0A0A0',
    textTertiary: '#707070',
    textInverse: '#121212',
    
    // Interactive
    focusRing: '#42A5F5',
    linkDefault: '#64B5F6',

    // colors
    dark: '#000',
    light: '#fff'
  },
  ocean: {
    primary: '#0077BE',
    primaryHover: '#005A93',
    secondary: '#00BCD4',
    accent: '#FF6F00',
    
    success: '#26A69A',
    warning: '#FFB74D',
    error: '#E57373',
    info: '#4FC3F7',
    
    surfaceBase: '#E0F7FA',
    surfaceElevated: '#B2EBF2',
    surfaceOverlay: '#80DEEA',
    
    borderDefault: '#4DD0E1',
    borderSubtle: '#80DEEA',
    
    textPrimary: '#004D40',
    textSecondary: '#00695C',
    textTertiary: '#00897B',
    textInverse: '#E0F7FA',
    
    focusRing: '#00BCD4',
    linkDefault: '#0097A7',

    // colors
    dark: '#000',
    light: '#fff'
  },
  sunset: {
    primary: '#FF6B6B',
    primaryHover: '#EE5A52',
    secondary: '#FFD93D',
    accent: '#6BCB77',
    
    success: '#95E1D3',
    warning: '#FFAA64',
    error: '#E63946',
    info: '#A8DADC',
    
    surfaceBase: '#FFF5E4',
    surfaceElevated: '#FFE5CA',
    surfaceOverlay: '#FFD4B0',
    
    borderDefault: '#FFC09F',
    borderSubtle: '#FFD7BA',
    
    textPrimary: '#2D3142',
    textSecondary: '#4F5D75',
    textTertiary: '#8B95A5',
    textInverse: '#FFF5E4',
    
    focusRing: '#FF6B6B',
    linkDefault: '#E63946',

    // colors
    dark: '#000',
    light: '#fff'
  },
};

export const Themes = {
  light: vars({
    '--color-primary': themeDefinitions.light.primary,
    '--color-primary-hover': themeDefinitions.light.primaryHover,
    '--color-secondary': themeDefinitions.light.secondary,
    '--color-accent': themeDefinitions.light.accent,
    
    '--color-success': themeDefinitions.light.success,
    '--color-warning': themeDefinitions.light.warning,
    '--color-error': themeDefinitions.light.error,
    '--color-info': themeDefinitions.light.info,
    
    '--color-surface-base': themeDefinitions.light.surfaceBase,
    '--color-surface-elevated': themeDefinitions.light.surfaceElevated,
    '--color-surface-overlay': themeDefinitions.light.surfaceOverlay,
    
    '--color-border-default': themeDefinitions.light.borderDefault,
    '--color-border-subtle': themeDefinitions.light.borderSubtle,
    
    '--color-text-primary': themeDefinitions.light.textPrimary,
    '--color-text-secondary': themeDefinitions.light.textSecondary,
    '--color-text-tertiary': themeDefinitions.light.textTertiary,
    '--color-text-inverse': themeDefinitions.light.textInverse,
    
    '--color-focus-ring': themeDefinitions.light.focusRing,
    '--color-link-default': themeDefinitions.light.linkDefault,
  }),
  dark: vars({
    '--color-primary': themeDefinitions.dark.primary,
    '--color-primary-hover': themeDefinitions.dark.primaryHover,
    '--color-secondary': themeDefinitions.dark.secondary,
    '--color-accent': themeDefinitions.dark.accent,
    
    '--color-success': themeDefinitions.dark.success,
    '--color-warning': themeDefinitions.dark.warning,
    '--color-error': themeDefinitions.dark.error,
    '--color-info': themeDefinitions.dark.info,
    
    '--color-surface-base': themeDefinitions.dark.surfaceBase,
    '--color-surface-elevated': themeDefinitions.dark.surfaceElevated,
    '--color-surface-overlay': themeDefinitions.dark.surfaceOverlay,
    
    '--color-border-default': themeDefinitions.dark.borderDefault,
    '--color-border-subtle': themeDefinitions.dark.borderSubtle,
    
    '--color-text-primary': themeDefinitions.dark.textPrimary,
    '--color-text-secondary': themeDefinitions.dark.textSecondary,
    '--color-text-tertiary': themeDefinitions.dark.textTertiary,
    '--color-text-inverse': themeDefinitions.dark.textInverse,
    
    '--color-focus-ring': themeDefinitions.dark.focusRing,
    '--color-link-default': themeDefinitions.dark.linkDefault,
  }),
  ocean: vars({
    '--color-primary': themeDefinitions.ocean.primary,
    '--color-primary-hover': themeDefinitions.ocean.primaryHover,
    '--color-secondary': themeDefinitions.ocean.secondary,
    '--color-accent': themeDefinitions.ocean.accent,
    
    '--color-success': themeDefinitions.ocean.success,
    '--color-warning': themeDefinitions.ocean.warning,
    '--color-error': themeDefinitions.ocean.error,
    '--color-info': themeDefinitions.ocean.info,
    
    '--color-surface-base': themeDefinitions.ocean.surfaceBase,
    '--color-surface-elevated': themeDefinitions.ocean.surfaceElevated,
    '--color-surface-overlay': themeDefinitions.ocean.surfaceOverlay,
    
    '--color-border-default': themeDefinitions.ocean.borderDefault,
    '--color-border-subtle': themeDefinitions.ocean.borderSubtle,
    
    '--color-text-primary': themeDefinitions.ocean.textPrimary,
    '--color-text-secondary': themeDefinitions.ocean.textSecondary,
    '--color-text-tertiary': themeDefinitions.ocean.textTertiary,
    '--color-text-inverse': themeDefinitions.ocean.textInverse,
    
    '--color-focus-ring': themeDefinitions.ocean.focusRing,
    '--color-link-default': themeDefinitions.ocean.linkDefault,
  }),
  sunset: vars({
    '--color-primary': themeDefinitions.sunset.primary,
    '--color-primary-hover': themeDefinitions.sunset.primaryHover,
    '--color-secondary': themeDefinitions.sunset.secondary,
    '--color-accent': themeDefinitions.sunset.accent,
    
    '--color-success': themeDefinitions.sunset.success,
    '--color-warning': themeDefinitions.sunset.warning,
    '--color-error': themeDefinitions.sunset.error,
    '--color-info': themeDefinitions.sunset.info,
    
    '--color-surface-base': themeDefinitions.sunset.surfaceBase,
    '--color-surface-elevated': themeDefinitions.sunset.surfaceElevated,
    '--color-surface-overlay': themeDefinitions.sunset.surfaceOverlay,
    
    '--color-border-default': themeDefinitions.sunset.borderDefault,
    '--color-border-subtle': themeDefinitions.sunset.borderSubtle,
    
    '--color-text-primary': themeDefinitions.sunset.textPrimary,
    '--color-text-secondary': themeDefinitions.sunset.textSecondary,
    '--color-text-tertiary': themeDefinitions.sunset.textTertiary,
    '--color-text-inverse': themeDefinitions.sunset.textInverse,
    
    '--color-focus-ring': themeDefinitions.sunset.focusRing,
    '--color-link-default': themeDefinitions.sunset.linkDefault,
  }),
};

export type ThemesVariant = keyof typeof Themes;

export const getThemeColors = (themeName: ThemesVariant) => {
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
    background: '#FFFFFF',
  },
  dark: {
    style: 'light',
    background: '#121212',
  },
  ocean: {
    style: 'dark',
    background: '#E0F7FA',
  },
  sunset: {
    style: 'dark',
    background: '#FFF5E4',
  },
};
