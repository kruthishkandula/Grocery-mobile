import { CachedImage, ThemedSafeArea } from '@/components/atom';
import { useAuth } from '@/context/AuthContext';
import useTheme from '@/hooks/useTheme';
import { gpsh, gpsw } from '@/style/theme';
import IconSymbol from '@atom/IconSymbol';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { upperFirst } from 'lodash';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';


const settingsCms = {
  order_options: [
    {
      id: 0,
      title: 'Orders',
      route: 'Orders',
      icon: 'truck-delivery-outline',
      iconSet: 'MaterialCommunityIcons',
      size: 28,
      is_active: true,
    },
    {
      id: 1,
      title: '(Balance)',
      route: 'Balance',
      icon: 'wallet-outline',
      iconSet: 'IconIcons',
      size: 28,
      is_active: true,
    },
    {
      id: 2,
      title: 'Address',
      route: 'Address',
      icon: 'map-pin',
      iconSet: 'Feather',
      size: 28,
      is_active: true,
    },
  ],
  settings_options: [
    {
      id: 0,
      title: 'Profile settings',
      route: 'ProfileSettings',
      icon: 'user',
      iconSet: 'Feather',
      size: 24,
      is_active: true,
    },
    {
      id: 1,
      title: 'Favorite Products',
      route: 'FavouriteProducts',
      icon: 'heart',
      iconSet: 'Feather',
      size: 24,
      is_active: true,
    },
    {
      id: 2,
      title: 'Rating & Reviews',
      route: 'Ratings',
      icon: 'star',
      iconSet: 'Feather',
      size: 24,
      is_active: true,
    },
    {
      id: 3,
      title: 'Change Theme',
      route: 'ChangeTheme',
      icon: 'settings',
      iconSet: 'Feather',
      size: 24,
      is_active: true
    },
    {
      id: 4,
      title: 'Check New Updates',
      route: 'Updates',
      icon: 'refresh-cw',
      iconSet: 'Feather',
      size: 24,
      is_active: false,
    },
    {
      id: 5,
      title: 'About',
      route: 'About',
      icon: 'info',
      iconSet: 'Feather',
      size: 24,
      is_active: true,
    },
    {
      id: 6,
      title: 'Support',
      route: 'Help',
      icon: 'customerservice',
      iconSet: 'AntDesign',
      size: 24,
      is_active: true,
    },
    {
      id: 7,
      title: 'Logout',
      route: null,
      icon: 'log-out',
      iconSet: 'Feather',
      size: 24,
      isLogout: true,
      is_active: true
    },
  ],
}

export default function Settings() {
  const { logout, userDetails } = useAuth();
  const { navigate } = useNavigation<any>();
  const { colors } = useTheme()

  const userProfile = {
    ...userDetails,
    name: userDetails?.username || '',
    email: userDetails?.email || '',
    photo: userDetails?.profile_image || `https://res.cloudinary.com/groceryplus/image/upload/v1751821502/strapi-uploads/medium_4dd412ae78096ed1c65d9291d5d3d2aaf4f6f87f_da01dbd2c6.png` || `https://ui-avatars.com/api/?name=${upperFirst(userDetails?.username)?.split(' ')?.join('+') || ''}&background=random`
  };

  const handleOptionPress = async (item: any) => {
    if (item.isLogout) {
      // Navigate to login first, then logout
      await logout();
    } else if (item.route) {
      navigate(item.route);
    }
  };

  return (
    <ThemedSafeArea>
      <View className='flex-1 flex-grow' >
        
        {/* Profile Section */}
        <LinearGradient start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            flex: 1,
            margin: gpsw(10), maxHeight: gpsh(120), gap: 10, flexDirection: 'row', paddingHorizontal: gpsw(10), paddingVertical: gpsh(10), borderRadius: 20, borderColor: '#fff',
            alignItems: 'center'

          }}

          colors={[colors?.primary, colors?.surfaceBase]}
        >
          <CachedImage
            name={userProfile.photo}
            style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 12 }}
          />
          <View  >
            <Text className='text-[32px] font-bold text-text1'>{upperFirst(userProfile.name)}</Text>
            <View className='flex-row items-center gap-2' >
              <IconSymbol name='phone' size={16} />
              <Text className='text-shading text-[16px]'>{userProfile.phonenumber}</Text>
            </View>
            <View className='flex-row items-center gap-2'>
              <IconSymbol name='email' size={16} />
              <Text className='text-shading text-[16px]'>{userProfile.email}</Text>
            </View>
          </View>
        </LinearGradient>

        <View className='flex-1 bg-surfaceBase w-full' style={{
          borderTopRightRadius: gpsh(20),
          borderTopLeftRadius: gpsh(20),
        }} >
          {/* order options */}
          <View className='flex-row gap-4 px-4 pt-3 pb-5 items-center justify-center flex-wrap'>
            {
              settingsCms?.order_options?.filter(item => item.is_active).map((item, index) => (
                <TouchableOpacity
                  key={`order-${index}`}
                  className='w-[100px] h-[100px] flex-col p-2  justify-center items-center gap-2'
                  onPress={() => navigate(item.route)}
                >
                  <View className='rounded-[100px] bg-surfaceElevated p-4'>
                    <IconSymbol name={item.icon} iconSet={item.iconSet} size={item.size} color={colors.primary} />
                  </View>
                  <Text className='font-medium text-textPrimary'>{item.title?.replace('(Balance)', `${userDetails?.currencySymbol} ${0.00}`)}</Text>
                </TouchableOpacity>
              ))
            }
          </View>

          {/* horizontal line */}
          <View className='w-full px-4' >
            <View className='w-full h-[1px] bg-shadingLight' />
          </View>


          {/* Settings Options */}
          <FlatList
            data={settingsCms?.settings_options.filter(item => item.is_active)}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: gpsw(100) }}
            renderItem={({ item, index }) => {
              let title = item.title;

              if (item.isLogout) {
                return (
                  <View className='w-full items-center justify-end flex-1 px-4 py-2' >
                    <TouchableOpacity
                      key={`setting-${index}`}
                      className={`flex-row items-center gap-2 py-4 px-5  border-borderDefault ${item.isLogout ? 'mt-4' : ''}`}
                      onPress={() => handleOptionPress(item)}
                    >
                      <IconSymbol name={item.icon} iconSet={item.iconSet} size={item.size} color={item.isLogout ? '#EF4444' : colors.textPrimary} />
                      <Text className={`text-base ${item.isLogout ? 'text-red-500 font-semibold' : ''}`}>{item.title}</Text>
                    </TouchableOpacity>
                  </View>
                )
              }

              return (
                <TouchableOpacity
                  key={`setting-${index}`}
                  className={`flex-row items-center gap-2 py-4 px-5  border-gray-100`}
                  onPress={() => handleOptionPress(item)}
                >
                  <IconSymbol name={item.icon} iconSet={item.iconSet} size={item.size} color={colors.textPrimary} />
                  <Text className={`text-base text-textPrimary`}>{title}</Text>
                  <IconSymbol name='chevron-right' size={item?.size} color={colors.textPrimary} style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>
              )
            }
            }
            className='w-full mt-4 flex-grow'
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View className='flex-1 items-center justify-center'>
                <Text className='text-textPrimary'>No settings available</Text>
              </View>
            )}
          />

        </View>
      </View>
    </ThemedSafeArea>
  )
}