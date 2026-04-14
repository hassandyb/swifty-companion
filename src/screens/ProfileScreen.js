import { useEffect } from 'react'
import { 
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { typography } from '../theme';
import Avatar from '../components/Avatar';
import InfoCard from '../components/InfoCard';
import LevelBar from '../components/LevelBar';
import SkillItem from '../components/SkillItem';
import ProjectItem from '../components/ProjectItem';



function getMainCursus(cursusUsers) {
  if(!cursusUsers || cursusUsers.length === 0) return null;

  const main42 = cursusUsers.find(cu => cu.cursus_id === 21);
  
  if (main42) return main42;

  let best = cursusUsers[0];

  for(let i = 1; i < cursusUsers.length; i++)
  {
    let cu = cursusUsers[i];
    if(cu.level > best.level) {
      best = cu;
    }
  }
  return best;
  }


export default function ProfileScreen({ route, navigation }) {
  
  const { colors, switchTheme, mode } = useTheme();

  const { user } = route.params; 
  const styles = createStyles(colors);



  useEffect(() => {
    navigation.setOptions({ title: user.login });
  }, [user, navigation]);

  const cursusUser = getMainCursus(user.cursus_users);
  const skills = cursusUser?.skills || [];
  const level = cursusUser?.level || 0;

  const projects = user.projects_users || [];

   
   const avatarUri = user.image?.versions?.medium || user.image?.link || user.image?.versions?.large;

  return (

    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ── HERO SECTION ── */}
      <View style={styles.hero}>
        <Avatar uri={avatarUri} login={user.login} size={110} />

        <Text style={styles.displayName}>{user.displayname}</Text>
        <Text style={styles.loginTag}>@{user.login}</Text>

        {/* Location + online status */}
        <View style={[styles.locationBadge, { backgroundColor: colors.surface }]}>
          <View  style ={[
            styles.onlineDot,
            { backgroundColor: user.location ? colors.success : colors.textTertiary }
          ]}/>
          <Text style={[styles.locationText, { color: colors.textSecondary }]}>
            {user.location || 'Offline'}
          </Text>
        </View>
      </View>

      {/* ── LEVEL BAR ── */}
      <View style={[styles.section, {backgroundColor: colors.surface }]}>
          <Text style={styles.cursusName}>{cursusUser?.cursus?.name || "No cursus found"}</Text>
          <LevelBar level={level} />
      </View>

      {/* ── INFO GRID ── */}
      {/* WHY flexDirection row + gap: Creates a 2-column grid of cards */}
      <View style={styles.grid}>
        <InfoCard label="Email" value={user.email} />
      </View>

      <View style={styles.grid}>
          <InfoCard label="Correction Points" value={String(user.correction_point ?? '-')}/>
          <InfoCard label="Campus" value={user.campus?.[0]?.name} />
      </View>
      <View style={styles.grid}>
          <InfoCard label="Phone" value={user.phone === 'hidden' ? 'Hidden' : user.phone} />
          <InfoCard label="Pool Year" value={user.pool_year} />
          <InfoCard label="Wallet" value={user.wallet !== undefined ? `${user.wallet} ₳` : null} />
      </View>

      {/* ── SKILLS SECTION ── */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={styles.sectionTitle}>Skills</Text>

        {skills.length > 0 ? (
          skills.map((skill) => (
            <SkillItem
              key={skill.name}
              name={skill.name}
              level={skill.level}
            />
          ))
          ) : (
            <Text style={[styles.emptyText, { color: colors.textTertiary }]}>No skills data.</Text>
          )}
      </View>


      {/* ── PROJECTS SECTION ── */}
      <View style={styles.projectsSection}>

          <Text style={[styles.sectionTitle, {color: colors.textPrimary, marginBottom: 12}]}>
            Projects
          </Text>
          {projects.length > 0 ? (
            projects.map(project => (
              <ProjectItem key={project.id} project={project} />
            ))
          ): (
            <Text style={[styles.emptyText, {color: colors.textTertiary}]} >No projects yet.</Text>
          )}
      </View>



      
    </ScrollView>
  );
}



function createStyles(colors) {
  return StyleSheet.create({
    scroll: {
      flex: 1,
      backgroundColor: colors.background,
    },

    content: {
      
      padding: 16,
      paddingBottom: 40,
      gap: 12,
    },
    hero: {
      alignItems: 'center',
      paddingVertical: 24,
      gap: 8,
    },
    displayName: {
      fontFamily: typography.fontFamily.bold,
      fontSize: typography.fontSize.xl,
      color: colors.textPrimary,
      textAlign: 'center',
    },
    loginTag: {
      fontFamily: typography.fontFamily.regular,
      fontSize: typography.fontSize.md,
      color: colors.textSecondary,
    },
    locationBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 30,
      gap: 6,
    },
    onlineDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    locationText:{
      fontFamily: typography.fontFamily.medium,
      fontSize: typography.fontSize.sm,
    },
    section: {
      borderRadius: 16,
      padding: 16,
      gap: 12,
    },
    cursusName: {
      fontFamily: typography.fontFamily.semiBold,
      fontSize: typography.fontSize.sm,
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
    },
    grid: {
      flexDirection: 'row',
      gap: 12,
    },
    sectionTitle: {
      fontFamily: typography.fontFamily.semiBold,
      fontSize: typography.fontSize.lg,
      color: colors.textPrimary,
      marginBottom: 8,
    },
    projectsSection: {
      marginTop: 4,
    },
    emptyText: {
      fontFamily: typography.fontFamily.regular,
      fontSize: typography.fontSize.sm,
      textAlign: 'center',
      paddingVertical: 12,
    },
    themeToggle: {
      alignSelf: 'center',
      padding: 12,
      marginTop: 8,
    },
    themeToggleText: {
      fontFamily: typography.fontFamily.medium,
      fontSize: typography.fontSize.sm,
    },

  })
}



