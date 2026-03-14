import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useAuth } from '../hooks/useAuth';
import { THEME } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/common/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated } from 'react-native';

const InfoItem = ({ icon, label, value, showDivider = true }: { icon: any; label: string; value: string; showDivider?: boolean }) => (
  <View style={styles.infoWrapper}>
    <View style={styles.infoItem}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={22} color={THEME.colors.slothDark} />
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
    {showDivider && <View style={styles.divider} />}
  </View>
);

const ProfileScreen = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { logout } = useAuth();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(20)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={THEME.colors.white} translucent />
      <Header title="My Profile" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
        <Animated.View style={[
          styles.header, 
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}>
            <LinearGradient
              colors={['rgba(59, 73, 223, 0.1)', 'rgba(59, 73, 223, 0.02)']}
              style={styles.headerGradient}
            />
            <View style={styles.avatarContainer}>
                <Image
                  source={{ uri: 'https://reqres.in/img/faces/4-image.jpg' }}
                  style={styles.avatar}
                />
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>{user?.email || 'Admin User'}</Text>
              <Text style={styles.roleText}>Enterprise System Admin</Text>
            </View>
            
            <TouchableOpacity style={styles.logoutPill} onPress={handleLogout} activeOpacity={0.8}>
                <Ionicons name="log-out-outline" size={18} color={THEME.colors.white} />
                <Text style={styles.logoutPillText}>Logout Session</Text>
            </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[
          styles.mainContent, 
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="settings-outline" size={20} color={THEME.colors.slothDark} />
            <Text style={styles.sectionTitle}>Account Details</Text>
            <View style={styles.sectionSeparator} />
          </View>

          <View style={styles.detailsList}>
            <InfoItem icon="person-outline" label="Full Identity" value="System Administrator" />
            <InfoItem icon="mail-outline" label="Contact Route" value={user?.email || 'admin@enterprise.io'} />
            <InfoItem icon="shield-checkmark-outline" label="Access Level" value="Level 5 (Restricted)" showDivider={false} />
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.slothBg,
  },
  scrollPadding: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
    position: 'relative',
    overflow: 'hidden',
  },
  headerGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: THEME.colors.white,
    padding: 3,
    ...THEME.shadows.light,
    marginBottom: 16,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  nameContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  nameText: {
    ...THEME.typography.h1,
    color: THEME.colors.slothDark,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  roleText: {
    ...THEME.typography.body,
    color: THEME.colors.slothGrey,
    fontSize: 14,
    marginTop: 4,
    fontWeight: '600',
  },
  logoutPill: {
    marginTop: 24,
    backgroundColor: THEME.colors.slothDark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: THEME.roundness.full,
    gap: 10,
    ...THEME.shadows.light,
  },
  logoutPillText: {
    ...THEME.typography.bodyBold,
    color: THEME.colors.white,
    fontSize: 13,
  },
  mainContent: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  sectionTitle: {
    ...THEME.typography.h3,
    color: THEME.colors.slothDark,
    fontSize: 16,
    fontWeight: '800',
  },
  sectionSeparator: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  detailsList: {
    backgroundColor: THEME.colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    ...THEME.shadows.light,
  },
  infoWrapper: {
    width: '100%',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: THEME.colors.slothBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    ...THEME.typography.small,
    color: THEME.colors.slothGrey,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    ...THEME.typography.bodyBold,
    color: THEME.colors.slothDark,
    fontSize: 14, // Value 14px
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 60,
  },
  footerInfo: {
    ...THEME.typography.small,
    color: THEME.colors.slothGrey,
    textAlign: 'center',
    marginTop: 50,
    fontWeight: '700',
    fontSize: 12,
  },
});

export default ProfileScreen;
