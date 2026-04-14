import {View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { typography } from '../theme'


/* 

    Math.floor: always rounds down (9.4 -> 9, 9.9 -> 9)
    Math.round: rounds to the closest integer (9.4 -> 9, 9.6 -> 10) 

  STEP-BY-STEP CALCULATION ENGINE:
  Let's assume level = 9.42 (but computer math sees 9.419999999999999)

  1. EXTRACTING PROGRESS: parseFloat((level % 1).toFixed(2))
     - (9.41999... % 1)   --> Result: 0.419999999999999 (The "messy" remainder)
     - .toFixed(2)         --> Result: "0.42" (String. Rounds up because 3rd decimal '9' >= 5)
     - parseFloat("0.42")  --> Result: 0.42 (Number. Now a clean decimal)

  2. CONVERTING TO PERCENTAGE: Math.round(progress * 100)
     - (0.42 * 100)       --> Result: 42.0
     - Math.round(42.0)   --> Result: 42 (Clean integer for display)

  WHY NOT JUST (level * 100)?
  Without .toFixed(2), the math might result in 41.99999... which would look 
  broken in the UI. This process "cleans" the floating point imprecision.
*/








export default function LevelBar({ level }) {
    const { colors } = useTheme();

    


    const levelInt = Math.floor(level);
    const progress = parseFloat((level % 1).toFixed(2)); 
    const percentage = Math.round(progress * 100)
    
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={[styles.label, {color: colors.textSecondary}]}>Level</Text>
                <Text style={[styles.level, {color: colors.textPrimary}]}>
                    {levelInt} 
                    <Text style={[styles.percent, {color: colors.textSecondary}]}>({percentage}%)</Text>
                </Text>
            </View>

            {/* percentage in for of a bar */}
            <View style={[styles.track, {backgroundColor: colors.surfaceSecondary}]}>
                <View style={[
                    styles.fill,
                    {
                        width: `${percentage}%`,
                        backgroundColor: colors.accent,
                    }
                ]}/>
            </View>
        </View>
    );


}

const styles = StyleSheet.create({
    container: {
        gap: 8,
    },
    row: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 13,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
    level: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 22,
    },
    percent: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
    },
    track: {
        height: 6,
        borderRadius: 3,
        overflow: 'hidden',  
    },
    fill: {
        height: '100%',
        borderRadius: 3,
    },
});


