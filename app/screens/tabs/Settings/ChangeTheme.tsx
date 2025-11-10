import { DynamicHeader, ThemedSafeArea } from '@/components/atom';
import useTheme from '@/hooks/useTheme';
import { useThemeStore } from '@/store/theme/themeStore';
import { useThemeContextActions } from '@/Themes';
import { Themes } from '@/Themes/theme-config';
import IconSymbol from '@atom/IconSymbol';
import { upperFirst } from 'lodash';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const ChangeTheme = () => {
  const { isDefaultTheme } = useThemeStore();
  const { handleThemeSwitch, theme } = useThemeContextActions();
  const { colors } = useTheme();

  return (
    <ThemedSafeArea>
      <View className={`flex-1 bg-surfaceBase`}>
        <DynamicHeader title='Themes' />
        {/* list of themes */}
        <ScrollView contentContainerClassName='pb-32' className='flex px-4 flex-col gap-2 py-4'>
          {Object.entries({ 'System Default': 'System Default', ...Themes }).map(([t, v]: any) => {
            // System Default is selected if isDefaultTheme is true
            let isSelected = (t === 'System Default' && isDefaultTheme) || (t === theme && !isDefaultTheme);

            return (
              <TouchableOpacity
                activeOpacity={1}
                key={t}
                onPress={() => {
                  if (t === 'System Default') {
                    handleThemeSwitch('light', true); // true triggers system default
                  } else {
                    handleThemeSwitch(t, false); // false disables system default
                  }
                }}
                className={`bg-surfaceElevated flex-row gap-2 py-6 p-4 rounded-xl mt-2 elevation-md ${isSelected ? 'border-primary border-2 bg-surfaceOverlay' : 'border-black'}`}
              >
                <IconSymbol name={isSelected ? 'radio-button-checked' : 'radio-button-off'} size={24} color={colors.textPrimary} />
                <Text className='text-textPrimary'>{upperFirst(t)}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </ThemedSafeArea>
  );
};

export default ChangeTheme;