import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Settings from './Settings';
import About from './About';
import Help from './Help';
import ChangeTheme from './ChangeTheme';
import FavouriteProducts from './FavouriteProducts';
import ProfileSettings from './ProfileSettings';

const SettingsStack = createStackNavigator<any>();
export default function SettingsNav() {
    const { navigate } = useNavigation<any>()

    return (
        <SettingsStack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <SettingsStack.Screen name="Settings" component={Settings} />
            <SettingsStack.Screen name="ChangeTheme" component={ChangeTheme} />
            <SettingsStack.Screen name="About" component={About} />
            <SettingsStack.Screen name="Help" component={Help} />
            <SettingsStack.Screen name="FavouriteProducts" component={FavouriteProducts} />
            <SettingsStack.Screen name="ProfileSettings" component={ProfileSettings} />
        </SettingsStack.Navigator>
    )
}