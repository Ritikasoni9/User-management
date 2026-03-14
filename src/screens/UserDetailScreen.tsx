import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Share,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { THEME } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/common/Header';

const InfoField = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={styles.fieldValueContainer}>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  </View>
);

const UserDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const initialUser = route.params.user;
  
  const user = useSelector((state: RootState) => 
    state.users.list.find((u: any) => u.id === initialUser.id) || initialUser
  );

  const handleEdit = () => {
    navigation.navigate('EditUser', { user });
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${user.first_name}'s profile: ${user.email}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={THEME.colors.slothBg} translucent />
      <Header title="User Details" showBack />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          </View>
          <Text style={styles.userName}>{`${user.first_name} ${user.last_name}`}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.shareBtn} onPress={handleShare} activeOpacity={0.8}>
                <Ionicons name="share-social-outline" size={20} color={THEME.colors.white} />
                <Text style={styles.shareBtnText}>Share</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.editBtn} onPress={handleEdit} activeOpacity={0.8}>
                <Text style={styles.editBtnText}>Edit User</Text>
                <Ionicons name="arrow-forward" size={20} color={THEME.colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Personal Info</Text>
                <Text style={styles.cardSubtitle}>Current organizational and identity settings</Text>
            </View>

            <View style={styles.fieldsList}>
                <InfoField label="First Name" value={user.first_name} />
                <InfoField label="Last Name" value={user.last_name} />
                <InfoField label="Primary Email" value={user.email} />
                <InfoField label="Designation" value="Senior Operations Manager" />
                <InfoField label="Office Location" value="HQ - North Intelligence" />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.slothBg,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 30, // Reduced since Header has SafeAreaView now
    paddingBottom: 30,
    backgroundColor: THEME.colors.slothBg,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: THEME.colors.white,
    padding: 3,
    ...THEME.shadows.light,
    marginBottom: 20,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  userName: {
    ...THEME.typography.h1,
    color: THEME.colors.slothDark,
    fontSize: 24, // High impact for name
    fontWeight: '800',
  },
  userEmail: {
    ...THEME.typography.body,
    color: THEME.colors.slothGrey,
    marginTop: 4,
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },
  shareBtn: {
    backgroundColor: THEME.colors.slothDark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: THEME.roundness.full,
    gap: 8,
  },
  shareBtnText: {
    ...THEME.typography.bodyBold,
    color: THEME.colors.white,
  },
  editBtn: {
    backgroundColor: THEME.colors.slothPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: THEME.roundness.full,
    gap: 8,
  },
  editBtnText: {
    ...THEME.typography.bodyBold,
    color: THEME.colors.white,
  },
  content: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: THEME.colors.white,
    borderRadius: THEME.roundness.sloth,
    padding: 24,
    ...THEME.shadows.sloth,
  },
  cardHeader: {
    marginBottom: 24,
  },
  cardTitle: {
    ...THEME.typography.h2,
    color: THEME.colors.slothDark,
    fontSize: 18,
    fontWeight: '800',
  },
  cardSubtitle: {
    ...THEME.typography.small,
    color: THEME.colors.slothGrey,
    marginTop: 4,
  },
  fieldsList: {
    gap: 20,
  },
  fieldContainer: {
    width: '100%',
  },
  fieldLabel: {
    ...THEME.typography.small,
    color: THEME.colors.slothGrey,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fieldValueContainer: {
    backgroundColor: THEME.colors.slothBg,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  fieldValue: {
    ...THEME.typography.bodyBold,
    color: THEME.colors.slothDark,
    fontSize: 14,
  },
});

export default UserDetailScreen;
