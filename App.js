import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './app/navigation/AppNavigator';
import { initDatabase } from './app/utils/database';
import { DarkTheme } from '@react-navigation/native';

export default function App() {
  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={DarkTheme.colors.background}
      />
      <AppNavigator />
    </>
  );
}