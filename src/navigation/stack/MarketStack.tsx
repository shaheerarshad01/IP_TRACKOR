import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MarketScreen from '../../screens/MarketScreen';

export default function MarketStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        options={{title: 'Market Data'}}
        name="Market"
        component={MarketScreen}
      />
    </Stack.Navigator>
  );
}
