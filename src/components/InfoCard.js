import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import { typography } from '../theme'



function createStyles(colors) {
    return StyleSheet.create({
        card: {
            backgroundColor: colors.surface,
            borderRadius: 14,
            padding: 16,
            flex: 1,  // WHY: So cards in a row share width equally
        },
        label: {
            fontFamily: typography.fontFamily.regular,
            fontSize: typography.fontSize.xs,
            color: colors.textSecondary,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
            marginBottom: 4,
        },
        value: {
            fontFamily: typography.fontFamily.semiBold,
            fontSize: typography.fontSize.md,
            color: colors.textPrimary,
        }
    })
}


export default function InfoCard({label, value}) {
    const { colors } = useTheme();
    const styles = createStyles(colors);

    return (
        <View style={styles.card}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value} numberOfLines={1}>
                {/* WHY numberOfLines={1}: Prevent long emails from breaking layout */}
                {value || '—'}
                {/* WHY '—': Em dash as placeholder for missing/null data. Cleaner than "N/A" */}       
            </Text>
        </View>
    );
}

