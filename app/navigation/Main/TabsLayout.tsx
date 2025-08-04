import { tab_options } from '@/constants/CMS';
import useTheme from '@/hooks/useTheme';
import { useCartStore } from '@/store/cart/cartStore';
import { gpsh } from '@/style/theme';
import IconSymbol from '@atom/IconSymbol';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Empty from '../../screens/tabs/Empty';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const Tab = createBottomTabNavigator<any>();

const TabsLayout = () => {
    const { colors } = useTheme();
    const { items } = useCartStore();
    const navigation = useNavigation();
    const { bottom } = useSafeAreaInsets();
    const [hideTabBar, setHideTabBar] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('state', (e) => {
            // Get the current navigation state
            const state = e.data.state;
            
            // Function to get the current route name from the root navigator
            const getCurrentRoute = (navState: any): string => {
                if (!navState || !navState.routes) return '';
                
                const currentRoute = navState.routes[navState.index];
                
                // If the current route has nested state, traverse it
                if (currentRoute.state) {
                    return getCurrentRoute(currentRoute.state);
                }
                
                return currentRoute.name;
            };
            
            const currentRouteName = getCurrentRoute(state);
            
            // Hide tab bar for specific routes
            const shouldHideTabBar = ['Products', 'ProductDetails', 'Cart', 'Checkout', 'Address'].includes(currentRouteName);
            setHideTabBar(shouldHideTabBar);
        });

        return unsubscribe;
    }, [navigation]);

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

