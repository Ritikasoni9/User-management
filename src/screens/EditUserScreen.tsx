import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useUsers } from '../hooks/useUsers';
import { THEME } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/common/Header';

const InputField = ({ label, value, field, placeholder, icon, errors, setFormData, setErrors, formData, ...props }: any) => (
  <View style={styles.inputWrapper}>
    <Text style={styles.label}>{label}</Text>
    <View style={[styles.inputContainer, errors[field] && styles.inputErrorContainer]}>
      <Ionicons 
          name={icon} 
          size={20} 
          color={errors[field] ? THEME.colors.error : THEME.colors.textMuted} 
          style={styles.inputIcon} 
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(text) => {
            setFormData({...formData, [field]: text});
            if (errors[field]) {
              setErrors((prev: any) => ({...prev, [field]: undefined}));
            }
        }}
        placeholder={placeholder}
        placeholderTextColor={THEME.colors.textMuted}
        {...props}
      />
    </View>
    {errors[field] && (
        <View style={styles.errorAlert}>
            <Text style={styles.errorText}>{errors[field]}</Text>
        </View>
    )}
  </View>
);

const EditUserScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { addUser, editUser } = useUsers();
  const existingUser = route.params?.user;

  // Form State
  const [formData, setFormData] = useState({
    firstName: existingUser?.first_name || '',
    lastName: existingUser?.last_name || '',
    email: existingUser?.email || '',
  });
  const [avatar, setAvatar] = useState(existingUser?.avatar || null);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const validate = () => {
    let newErrors: any = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid business email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (!validate()) return;

    setLoading(true);
    const userData = {
      first_name: formData.firstName.trim(),
      last_name: formData.lastName.trim(),
      email: formData.email.trim(),
      avatar: avatar,
    };

    const success = existingUser 
      ? await editUser(existingUser.id, userData)
      : await addUser(userData);

    setLoading(false);
    if (success) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title={existingUser ? 'Edit User' : 'Add User'} showBack />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
            <View style={styles.pickerSection}>
              <TouchableOpacity style={styles.avatarPicker} onPress={pickImage} activeOpacity={0.9}>
                {avatar ? (
                  <Image source={{ uri: avatar }} style={styles.avatar} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Ionicons name="person" size={48} color={THEME.colors.textMuted} />
                  </View>
                )}
                <LinearGradient
                  colors={[THEME.colors.primary, THEME.colors.primaryDark]}
                  style={styles.cameraBtn}
                >
                  <Ionicons name="camera" size={18} color={THEME.colors.white} />
                </LinearGradient>
              </TouchableOpacity>
              <Text style={styles.pickerLabel}>User Avatar</Text>
            </View>

            <View style={styles.form}>
              <InputField
                label="First Identity Name"
                field="firstName"
                value={formData.firstName}
                placeholder="e.g. Michael"
                icon="person-outline"
                errors={errors}
                setFormData={setFormData}
                setErrors={setErrors}
                formData={formData}
              />
              <InputField
                label="Last Identity Name"
                field="lastName"
                value={formData.lastName}
                placeholder="e.g. Scott"
                icon="person-outline"
                errors={errors}
                setFormData={setFormData}
                setErrors={setErrors}
                formData={formData}
              />
              <InputField
                label="Professional Email"
                field="email"
                value={formData.email}
                placeholder="name@organization.com"
                icon="mail-outline"
                autoCapitalize="none"
                keyboardType="email-address"
                errors={errors}
                setFormData={setFormData}
                setErrors={setErrors}
                formData={formData}
              />
            </View>

            <TouchableOpacity 
              style={[styles.submitButton, loading && styles.disabledButton]} 
              onPress={handleSubmit}
              disabled={loading}
            >
              <LinearGradient
                colors={[THEME.colors.primary, THEME.colors.primaryDark]}
                style={styles.submitGradient}
              >
                <Text style={styles.submitText}>
                  {loading ? 'Processing...' : existingUser ? 'Update User' : 'Add User'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.slothBg,
  },
  scrollContent: {
    padding: THEME.spacing.lg,
    paddingBottom: THEME.spacing.xxl,
  },
  pickerSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarPicker: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: THEME.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    ...THEME.shadows.light,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: THEME.colors.white,
  },
  pickerLabel: {
    ...THEME.typography.small,
    color: THEME.colors.textSecondary,
    marginTop: 8,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  form: {
    width: '100%',
  },
  inputWrapper: {
    marginBottom: 24, // Increased spacing
  },
  label: {
    ...THEME.typography.body,
    fontSize: 14, // 14px Label
    color: THEME.colors.black,
    marginBottom: 8,
    fontWeight: '600', // SemiBold/Regular
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.roundness.md,
    paddingHorizontal: 12,
    height: 52, 
    borderWidth: 1,
    borderColor: THEME.colors.border,
    ...THEME.shadows.light,
  },
  inputErrorContainer: {
    borderColor: THEME.colors.error,
    // No background as requested
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    ...THEME.typography.body,
    color: THEME.colors.black,
  },
  errorAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 2,
    gap: 4,
  },
  errorText: {
    ...THEME.typography.small,
    color: THEME.colors.error,
    fontWeight: 'normal', // Regular as requested
    fontSize: 12,
  },
  submitButton: {
    marginTop: 20,
    borderRadius: THEME.roundness.md,
    overflow: 'hidden',
    ...THEME.shadows.medium,
  },
  submitGradient: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    ...THEME.typography.bodyBold,
    color: THEME.colors.white,
  },
  disabledButton: {
    opacity: 0.7,
  },
});

export default EditUserScreen;
