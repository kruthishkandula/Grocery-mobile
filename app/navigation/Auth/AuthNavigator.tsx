import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Login from '../../screens/auth/Login'
import Register from '../../screens/auth/Register'

const AuthStack = createStackNavigator()

export default function AuthNavigator() {
    return (
        <AuthStack.Navigator screenOptions={{
            headerShown: false,
        }} >
            <AuthStack.Screen name='login' component={Login} />
            <AuthStack.Screen name='register' component={Register} />
        </AuthStack.Navigator>
    )
}