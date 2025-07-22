import AdminWebview from '@/screens/admin/AdminWebview';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

const Stack = createStackNavigator();

export const AdminStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminDashboard"
        component={AdminWebview}
        options={{
          title: 'Admin Dashboard',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
};
