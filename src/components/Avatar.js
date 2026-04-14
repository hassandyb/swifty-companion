import {View, Image, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { typography } from '../theme';




export default function Avatar( {uri, login, size = 100 }) {
    const { colors } = useTheme();
    console.log('avatarUri : ', {uri});


    return (
        <View style={styles.container}>
            {uri ? (
                <Image 
                    source={{ uri }}
                    style={[styles.image, {width: size, height: size, borderRadius: size / 2}]}
                />
            ): (
                <View style={[
                    styles.fallback,
                    {width: size, height: size, borderRadius: size / 2, backgroundColor: colors.surface}
                ]}>
                    <Text style={[styles.letter, { color: colors.textPrimary }]}>

                        {login ? login[0].toUpperCase() : '?'}
                    </Text>
                </View>
            )}
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    image: {
        borderWidth: 3,
        borderColor: '#FFFFFF20',
    },
    fallback: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    letter: {
        
        fontFamily: typography.fontFamily.medium,
        fontSize: typography.fontSize.xxxl,
    },

    
});