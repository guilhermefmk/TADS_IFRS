import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import { STACKS } from '../constants/Screens';
import { useAuth } from '../contexts/AuthContext';

const Stack = createStackNavigator();

const RootNavigator = () => {

  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false,  }}
      /* initialRouteName='MainStack' */>
     
        <Stack.Screen name="MainStack" component={MainStack} />
        <Stack.Screen name={STACKS.AUTHSTACK} component={AuthStack} />
        
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
