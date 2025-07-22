import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Dashboard from './Dashboard'
import Products from './Products'

const Stack = createStackNavigator<any>()

export default function Home() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={'Dashboard'} component={Dashboard} />
            <Stack.Screen name={'Products'} component={Products} />
            <Stack.Screen name={'ProductDetails'} getComponent={() => require('./ProductDetails').default} />
        </Stack.Navigator>
    )
}