import {Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MarketScreen from '../../screens/MarketScreen';
import DashBoardStack from '../stack/DashBoardStack';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../utils/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import MarketStack from '../stack/MarketStack';

const Tab = createBottomTabNavigator();

const TabNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          let iconName: string = 'home';

          if (route.name === 'Dashboard') {
            iconName = 'home';
          } else if (route.name === 'MarketData') {
            iconName = 'bar-chart';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({focused}) => {
          let label: string = '';

          if (route.name === 'Dashboard') {
            label = 'Home';
          } else if (route.name === 'MarketData') {
            label = 'Market';
          } else if (route.name === 'Profile') {
            label = 'Profile';
          }

          return (
            <Text style={{color: focused ? colors.purple : colors.inactivetab}}>
              {label}
            </Text>
          );
        },
        tabBarActiveTintColor: colors.purple,
        tabBarInactiveTintColor: colors.inactivetab,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 0,
          elevation: 5,
          paddingBottom: 5,
          height: RFPercentage(8),
        },
      })}>
      <Tab.Screen name="Dashboard" component={DashBoardStack} />
      <Tab.Screen name="MarketData" component={MarketStack} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
