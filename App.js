import { useCallback } from 'react';
import { View} from 'react-native';
// import {StatusBar } from 'expo-status-bar';
// import * as SplashScreen from 'expo-splash-screen';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

import AppNavigator from './src/navigation/AppNavigator';

import { SafeAreaProvider } from 'react-native-safe-area-context';



function AppContent () {
  const {mode, colors, } = useTheme();
  //colors.background
  return (
    <View style={{ flex: 1}}>
      
      <AppNavigator/>

    </View>

  )
}


export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,    
  });





  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        
        <View style={{flex: 1}} > 
          <AppContent />

        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

