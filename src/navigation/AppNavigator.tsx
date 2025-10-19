import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../views/LoginScreen';
import MainScreen from '../views/MainScreen';
import SOAPJavaScreen from '../views/SOAPJavaScreen';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  SOAPJava: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ title: 'Menú Principal' }}
        />
        <Stack.Screen name="SOAPJava" component={SOAPJavaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
