
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { typography } from '../theme';



function getStatusStyle(colors, validated, status) {
    if (validated === true)
        return { bg: colors.success + '20', text: colors.success }; // 20 = 12% opacity hex
    if (validated === false && status === 'finished')
        return { bg: colors.danger + '20', text: colors.danger };
    return { bg: colors.warning + '20', text: colors.warning };
}

export default function ProjectItems({ project }) {
    const { colors } = useTheme();

    const { bg, text } = getStatusStyle(colors, project['validated?'], project.status);


    const markDisplay = project.final_mark !== null ? `${project.final_mark}%` : 'In Progress';

    return (
        <View style={[styles.container, { backgroundColor: colors.surface }]}>
            
            <View style={styles.left}>
                <Text style={[styles.name, { color: colors.textPrimary }]} numberOfLines={2}>
                    {project.project.name}
                </Text>
            </View>

            {/* Fonal mark bagde */}
            <View style={[styles.badge, { backgroundColor: bg }]}>
                <Text style={[styles.badgeText, { color: text }]}>
                    {markDisplay}
                </Text>
            </View>
            
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 12,
        padding: 14,
        marginBottom: 8,
    },
    left: {
        flex: 1,
        marginRight: 12,
    },
    name: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 14,
    },
    badge: {
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    badgeText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 11,
    },
});


