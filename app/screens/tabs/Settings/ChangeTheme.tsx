import IconSymbol from '@atom/IconSymbol';
import { useThemeContextActions } from '@/Themes';
import { Themes } from '@/Themes/theme-config';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { DynamicHeader, ThemedSafeArea } from '@/components/atom';

const ChangeTheme = () => {
  const { handleThemeSwitch, theme } = useThemeContextActions();


  return (
    <ThemedSafeArea>
      <DynamicHeader title='Themes' />
      <View className={`flex-1  px-4 mt-4 bg-tertiary`} >
        {/* list of themes */}
        <View className='flex flex-col gap-2 py-4' >
          {Object.entries(Themes)?.map(([t, v]: any) => {
            console.log('t', t, theme, t == theme)
            return (
              <TouchableOpacity
                key={t}
                onPress={() => {
                  handleThemeSwitch(t)
                }}
                className={`bg-pink-100 flex-row gap-2 py-6 p-4 rounded-xl mt-2 elevation-md ${t == theme ? 'border-primary border-2' : 'border-black'}`}
              >
                <IconSymbol name='feather' iconSet='Entypo' size={24} color={'black'} />
                <Text className=' text-black' >{t}</Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* random theme btn */}
        {/* <TouchableOpacity
        onPress={() => {
          // let index = Math.floor(Math.random() * Object.keys(Themes).length);
          // console.log('index', index, getRandomObj(Themes));
          // handleThemeSwitch(Themes)[index])
        }}
        className='bg-[#C1D8C3] p-4 rounded-md mt-2'
      >
        <Text className=' text-[#A31D1D]' >Set Random</Text>
      </TouchableOpacity> */}
      </View>
    </ThemedSafeArea>
  )
}

export default ChangeTheme