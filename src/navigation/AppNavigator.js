import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useTheme} from '../context/ThemeContext';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { TouchableOpacity, Text } from 'react-native'; 


import { Ionicons } from '@expo/vector-icons';


const Stack = createNativeStackNavigator(); // to be able to use .Nvigator - .screen - route - navigation 

export default function AppNavigator() {

    const { colors, switchTheme, mode } = useTheme(); 

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Search"
                //screenOptions to cotrol Navigation Header 
                screenOptions={{
                    headerStyle: { backgroundColor: colors.surface,},
                    headerTintColor: colors.textPrimary, // controls the color of the clickable elements and default text inside the top navigation bar.
                    headerTitleStyle: {
                        fontFamily: 'Poppins_600SemiBold',
                        fontSize: 17,
                        

                    },
                    headerShadowVisible: false, // removes the default border line that appears at the bottom of the top navigation header.

                    animation: 'slide_from_right',


                    headerRight: () => (
                        // sark/light mdoe icon 
                        <TouchableOpacity 
                            onPress={switchTheme} 
                            style={{ 
                                marginRight: 8, 
                                borderWidth: 1, 
                                borderColor: colors.textPrimary, 
                                borderRadius: 8, 
                                padding: 6, 
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Ionicons 
                                name={mode === 'dark' ? 'sunny' : 'moon'} 
                                size={20} 
                                color={colors.textPrimary} // so it can apear from the mode .
                            />
                        </TouchableOpacity>
                    )



                }}
            >
                <Stack.Screen 
                    name="Search"
                    component={SearchScreen}
                    options={{ title: 'Swifty Companion'}}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ title: ''}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )

}

