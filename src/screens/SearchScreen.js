import { 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';



import { typography } from '../theme';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { fetchUser } from '../services/apiService';



export default function SearchScreen({navigation}) {


    const { colors, switchTheme, mode } = useTheme();

    const [login, setLogin] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const styles = createStyles(colors);// function is under ..

    async function handleSearch () {

        const trimmed = login.trim();

        if(!trimmed) {
            Alert.alert('Empty field', 'Please enter a 42 login to search.');
            return;
        }

        setIsLoading(true);

        try {
            const user = await fetchUser(trimmed);
            // console.log(JSON.stringify(user, null, 2))
            navigation.navigate('Profile', { user });

        } catch (error) {
            if (error.message === 'USER_NOT_FOUND') {
                Alert.alert('Not found', `"${trimmed}" does not exist on 42 intra`);
            } else if (error.message.includes('fetch')) {
                Alert.alert('Network Error', 'Check your internet connection and try again.');
            } else {
                Alert.alert('Error', error.message);
            } 
        } finally {
                setIsLoading(false);
            }
    }
    

    
    return (

        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            
        >
            <View style={styles.inner}>
                {/* App logo / header */}
                <View style={styles.header}>
                    <Text style={styles.title}>42</Text>
                    <Text style={styles.subtitle}>Student Lookup</Text>
                </View>

                {/* Search input area */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter a login..."
                        placeholderTextColor={colors.textTertiary}
                        value={login} // desplay the curent login value on the input 
                        onChangeText={setLogin}  // save text inside input inside login - evrytime a user types a letter
                        
                        
                        onSubmitEditing={handleSearch}  // Called when user taps "Enter" on keyboard 
                            />
                    
                    <TouchableOpacity
                        style={[
                            styles.button, 
                            (isLoading || !login.trim()) && styles.buttonDisabled]}// apply buttonDisabled in case empty input or while searching

                        onPress={handleSearch}
                        disabled={isLoading || !login.trim() }// make the button disabled when isLoading true 
                        activeOpacity={0.8}
                    >
                        {isLoading ? (
                            <ActivityIndicator color={colors.background} size="small" />
                        ) : (
                            <Text style={styles.buttonText}>Search</Text>
                        )}
                    </TouchableOpacity>



                </View>
            </View>


        </KeyboardAvoidingView>

    )
}




function createStyles(colors) {
    return StyleSheet.create({
        container: {
            flex: 1, 
            backgroundColor: colors.background,
        },

        inner: {
            flex: 1, 
            paddingHorizontal: 24, 
            justifyContent: 'center'},

        header: {
            alignItems: 'center', 
            marginBottom: 56,},

        title: {
            fontFamily: typography.fontFamily.bold,
            fontSize: 80, 
            color: colors.textPrimary, 
            lineHeight: 80,
        },

        subtitle: {
            fontFamily: typography.fontFamily.regular,
            fontSize: typography.fontSize.lg,
            color: colors.textSecondary, 
            marginTop: 4, 
            letterSpacing: 0.5,
        },

        searchContainer: {gap: 12, },

        input: {
            backgroundColor: colors.surface, 
            borderRadius: 14,
            paddingHorizontal: 18, 
            paddingVertical: 16,
            fontFamily: typography.fontFamily.regular,
            fontSize: typography.fontSize.md, 
            color: colors.textPrimary,
            borderWidth: 1, 
            borderColor: colors.border,
        },

        button: {
            backgroundColor: colors.accent, 
            borderRadius: 14,
            paddingVertical: 16, 
            alignItems: 'center', 
        },

        buttonDisabled: {opacity: 0.5, },

        buttonText: { 
            fontFamily: typography.fontFamily.semiBold,
            fontSize: typography.fontSize.md, 
            color: colors.background,
        },

        themeToggle: { 
            alignSelf: 'center', 
            marginTop: 40, 
            padding: 12, },

        themeToggleText: { 
            fontFamily: typography.fontFamily.medium,
            fontSize: typography.fontSize.sm,
            color: colors.textSecondary,
        }
    });
}
