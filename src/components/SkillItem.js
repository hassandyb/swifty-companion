import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { typography } from '../theme'



const styles = StyleSheet.create({
    container:  {
        gap: 6,
        marginBottom: 14,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 14,
        flex: 1,
        marginRight: 8,
    },
    meta: {
        fontFamily : 'Poppins_400Regular',
        fontSize: 12,
    },
    track: {
        height: 4,
        borderRadius: 2,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        borderRadius: 2,
    },
});



export default function SkillItem({ name, level }) {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={[styles.name, { color: colors.textPrimary }]} numberOfLines={1}>
                    {name}
                </Text>
                <Text style={[styles.meta, { color: colors.textPrimary }]}>
                    Lv : {Math.floor(level)} - {Math.round((level % 1) * 100)}% 
                </Text>
            </View>


        </View>
    )
}