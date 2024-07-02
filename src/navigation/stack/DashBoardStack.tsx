import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen';
import DetailsScreen from '../../screens/DetailsScreen';

export default function DashBoardStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        options={{title: 'IP Trackor'}}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{title: 'Profile'}}
        name="Details"
        component={DetailsScreen}
      />
    </Stack.Navigator>
  );
}
