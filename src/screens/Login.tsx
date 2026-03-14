import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../constants/colors';
import { fontSizes } from '../constants/typography';
import { spacing } from '../constants/spacing';
import { useAuth } from '../hooks/useAuth';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/responsive';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { login, loading, error } = useAuth();

  const handleLogin = async () => {
    Keyboard.dismiss();
    await login({
      // Keep email case-insensitive by normalizing to lowercase before auth.
      email: email.trim().toLowerCase(),
      password: password.trim(),
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar style='light' />
      <LinearGradient
        colors={['#050507', '#0B1020', '#050507']}
        style={StyleSheet.absoluteFillObject}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          style={styles.kav}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.decorA} pointerEvents="none" />
          <View style={styles.decorB} pointerEvents="none" />

          <View style={styles.card}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>

            <View style={styles.form}>
              {!!error && (
                <View style={styles.errorBox}>
                  <Ionicons name="alert-circle" size={18} color={stylesVars.errorText} />
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              <View style={styles.field}>
                <View style={styles.inputRow}>
                  <Ionicons name="mail-outline" size={18} color={stylesVars.icon} />
                  <TextInput
                    placeholder="admin@example.com"
                    placeholderTextColor={stylesVars.placeholder}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="email"
                    textContentType="emailAddress"
                    value={email}
                    onChangeText={(t) => setEmail(t.toLowerCase())}
                    style={styles.input}
                    returnKeyType="next"
                  />
                </View>
              </View>

              <View style={styles.field}>
                <View style={styles.inputRow}>
                  <Ionicons name="lock-closed-outline" size={18} color={stylesVars.icon} />
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor={stylesVars.placeholder}
                    secureTextEntry={!passwordVisible}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="password"
                    textContentType="password"
                    value={password}
                    onChangeText={setPassword}
                    style={[styles.input, styles.inputPassword]}
                    returnKeyType="done"
                    onSubmitEditing={handleLogin}
                  />
                  <Pressable
                    onPress={() => setPasswordVisible((v) => !v)}
                    hitSlop={10}
                    accessibilityRole="button"
                    accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
                    style={styles.eyeButton}
                  >
                    <Ionicons
                      name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color={stylesVars.icon}
                    />
                  </Pressable>
                </View>
              </View>

              <PrimaryButton
                title={loading ? 'Signing in...' : 'Login'}
                onPress={handleLogin}
                disabled={loading}
                style={styles.loginButton}
                textStyle={styles.loginButtonText}
              />

           
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const stylesVars = {
  text: colors.textColor,
  muted: colors.muted,
  placeholder: colors.placeholder,
  border: colors.border,
  card: colors.card,
  icon: colors.icon,
  errorBg: colors.errorBg,
  errorBorder: colors.errorBorder,
  errorText: colors.errorText,
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#050507' },
  kav: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
  },
  decorA: {
    position: 'absolute',
    top: -SCREEN_HEIGHT * 0.1, // 10% of screen height
    left: -SCREEN_WIDTH * 0.15, // 15% of screen width
    width: SCREEN_WIDTH * 0.5, // 50% of screen width
    height: SCREEN_WIDTH * 0.5, // Keep it square
    borderRadius: (SCREEN_WIDTH * 0.5) / 2, // Half of width for a circle
    backgroundColor: colors.backg,
  },
  decorB: {
    position: 'absolute',
    bottom: -SCREEN_HEIGHT * 0.15, // 15% of screen height
    right: -SCREEN_WIDTH * 0.2, // 20% of screen width
    width: SCREEN_WIDTH * 0.7, // 70% of screen width
    height: SCREEN_WIDTH * 0.7, // Keep it square
    borderRadius: (SCREEN_WIDTH * 0.7) / 2, // Half of width for a circle
    backgroundColor: colors.backgroundColor,
  },
  card: {
    alignSelf: 'stretch',
    backgroundColor: stylesVars.card,
    borderWidth: 1,
    borderColor: stylesVars.border,
    borderRadius: 18,
    padding: spacing.xl,
  },
  title: {
    fontSize: fontSizes.xxl,
    color: stylesVars.text,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  subtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
    fontSize: fontSizes.md,
    color: stylesVars.muted,
  },
  form: {
    alignSelf: 'stretch',
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: stylesVars.errorBg,
    borderWidth: 1,
    borderColor: stylesVars.errorBorder,
    borderRadius: 14,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  errorText: {
    flex: 1,
    color: stylesVars.errorText,
    fontSize: fontSizes.sm,
    fontWeight: '700',
  },
  field: {
    marginBottom: spacing.md,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: stylesVars.border,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 14,
    paddingHorizontal: spacing.md,
    paddingVertical: 2,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: fontSizes.md,
    color: stylesVars.text,
  },
  inputPassword: {
    paddingRight: spacing.sm,
  },
  eyeButton: {
    paddingLeft: spacing.sm,
    paddingVertical: spacing.sm,
  },
  loginButton: {
    marginTop: spacing.xs,
    borderRadius: 14,
    backgroundColor: colors.primary,
  },
  loginButtonText: {
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  footerText: {
    color: stylesVars.muted,
    fontSize: fontSizes.sm,
  },
 
});
