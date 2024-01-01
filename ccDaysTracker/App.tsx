/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Button, Divider, Image, Input } from '@rneui/themed';
import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/pages/Login.screen';
import RegisterScreen from './src/pages/Register.screen';
import HomeScreen from './src/pages/Home.screen';
import AddEntityScreen from './src/pages/AddEntity.screen';
import ViewEntryScreen from './src/pages/ViewEntry.screen';
import { QueryClient, QueryClientProvider } from 'react-query';

const Stack = createNativeStackNavigator();

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Canadian Citizenship Days Tracker' }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Canadian Citizenship Days Tracker' }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
          <Stack.Screen name="AddEntity" component={AddEntityScreen} options={{ title: 'Add Entity' }} />
          <Stack.Screen name="ViewEntry" component={ViewEntryScreen} options={{ title: 'View Entry' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
