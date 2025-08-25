import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import OnboardingStep1Screen from '../screens/OnboardingStep1Screen';
import OnboardingStep2Screen from '../screens/OnboardingStep2Screen';
import OnboardingStep3Screen from '../screens/OnboardingStep3Screen';
import MainMenuScreen from '../screens/MainMenuScreen';
import GameScreen from '../screens/GameScreen';
import HowToPlayScreen from '../screens/HowToPlayScreen';
import ElementsLoreScreen from '../screens/ElementsLoreScreen';
import SettingsScreen from '../screens/SettingsScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  OnboardingStep1: undefined;
  OnboardingStep2: undefined;
  OnboardingStep3: undefined;
  MainMenu: undefined;
  Game: undefined;
  HowToPlay: undefined;
  ElementsLore: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="OnboardingStep1" component={OnboardingStep1Screen} />
        <Stack.Screen name="OnboardingStep2" component={OnboardingStep2Screen} />
        <Stack.Screen name="OnboardingStep3" component={OnboardingStep3Screen} />
        <Stack.Screen name="MainMenu" component={MainMenuScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="HowToPlay" component={HowToPlayScreen} />
        <Stack.Screen name="ElementsLore" component={ElementsLoreScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
