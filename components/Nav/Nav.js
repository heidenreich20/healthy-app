import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, DarkTheme } from '../../utils/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import InfoScreen from '../Info/InfoScreen';
import HomeScreen from '../Home/HomeScreen';

const Stack = createNativeStackNavigator();

function Nav({ session }) {
  const scheme = 'light'

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={scheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.accent} />
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: scheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.primary
            },
            headerTitleStyle: {
              color: scheme === 'dark' ? DarkTheme.colors.text : 'white'
            }
          }} name="Home" component={HomeScreen} />
          <Stack.Screen options={{
            headerShown: false,
          }} name="Information" component={InfoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default Nav;