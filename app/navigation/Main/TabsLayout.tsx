import { tab_options } from '@/constants/CMS';
import useTheme from '@/hooks/useTheme';
import { useCartStore } from '@/store/cart/cartStore';
import { gpsh } from '@/style/theme';
import IconSymbol from '@atom/IconSymbol';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigationState } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import Empty from '../../screens/tabs/Empty';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const Tab = createBottomTabNavigator<any>();

const TabsLayout = () => {
    const { colors } = useTheme();
    const { items } = useCartStore();
    const state = useNavigationState(state => state);
    const { bottom } = useSafeAreaInsets()

    // Helper function to get the current route name from nested navigator state
    const getActiveRouteName = (state: any): string => {
        const route = state.routes[state.index];
        if (route.state) {
            // Recursive call to handle nested navigators
            return getActiveRouteName(route.state);
        }
        return route.name;
    };

    // Get the active route name
    const currentRoute = getActiveRouteName(state);

    // Check if we should hide the tab bar
    const hideTabBar = ['Products', 'ProductDetails', 'Cart'].includes(currentRoute);

    let productsCount = items?.length || 0;

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: hideTabBar ? { display: 'none' } : {
                    position: 'absolute',
                    bottom: gpsh(0),
                    left: gpsh(0),
                    right: gpsh(0),
                    height: gpsh(70) + bottom/2,
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                    backgroundColor: colors?.bg,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    borderWidth: 0,
                },
                tabBarShowLabel: true,
                tabBarActiveTintColor: colors?.primary,
                tabBarInactiveTintColor: colors?.text1,
            }}
        >
            {tab_options.map((item) => (
                <Tab.Screen
                    key={item.name}
                    name={item.name}
                    options={{
                        tabBarIcon: (props) => {
                            return (
                                <View className={`w-[55px] h-[55px] rounded-[50] items-center justify-center bg-${props?.focused ? 'primary' : 'transparent'} p-4`} >
                                    <IconSymbol name={item?.icon} iconSet={item?.iconSet} size={item?.size} color={props?.focused ? '#fff' : colors?.text1} />
                                </View>
                            )
                        },
                        tabBarLabel: (props) => {
                            return (
                                <Text className='flex-1 text-black' >{item?.label}</Text>
                            )
                        },
                        tabBarBadge: item.name === 'Cart' && productsCount > 0 ? productsCount : undefined,
                        tabBarBadgeStyle: { backgroundColor: '#ef4444', color: '#fff', fontSize: 12, padding: 0, width: 20, height: 20, borderRadius: 10, textAlign: 'center' },
                    }}
                    component={item.component || Empty}
                />
            ))}
        </Tab.Navigator>
    )
}

export default TabsLayout

