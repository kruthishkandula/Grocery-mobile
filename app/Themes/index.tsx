import { StatusBar } from 'expo-status-bar';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useColorScheme, View, ViewProps } from 'react-native';
import { StatusBarTheme, Themes, ThemesVariant } from './theme-config';


type ThemeContextValues = {
  theme: ThemesVariant;
};

const ThemeProviderValues = createContext<ThemeContextValues>({
  theme: 'light',
});

export function useThemeContextValues() {
  return useContext(ThemeProviderValues);
}

type ThemeContextActions = {
  theme: ThemesVariant;
  handleThemeSwitch: (newTheme: ThemesVariant) => void;
};

const ThemeProviderActions = createContext<ThemeContextActions>(
  {} as ThemeContextActions
);

export function useThemeContextActions() {
  return useContext(ThemeProviderActions);
}

type ThemeProps = ViewProps;

export function Theme(props: ThemeProps) {
  const [theme, setTheme] = useState<ThemesVariant>('light');
  const colorScheme = useColorScheme();

  const handleThemeSwitch = useCallback((newTheme: ThemesVariant) => {
    setTheme(newTheme);
  }, []);

  useEffect(() => {
    if (colorScheme) {
      setTheme(colorScheme === 'dark' ? 'dark' : 'light');
    }
  }, [colorScheme]);

  return (
    <View style={Themes[theme]} className={'flex-1' + ' ' + props.className}>
      <ThemeProviderValues.Provider value={{ theme }}>
        <ThemeProviderActions.Provider value={{ handleThemeSwitch, theme }}>
          <StatusBar
            style={StatusBarTheme[theme].style}
            backgroundColor={StatusBarTheme[theme].background}
          />
          {props.children}
        </ThemeProviderActions.Provider>
      </ThemeProviderValues.Provider>
    </View>
  );
}