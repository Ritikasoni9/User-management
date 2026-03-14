import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FormTextInput from '../components/FormTextInput';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../constants/colors';
import { fontSizes } from '../constants/typography';
import { spacing } from '../constants/spacing';
import { useNavigation } from '@react-navigation/native';

export default function Signup() {
  const navigation = useNavigation<any>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <View style={styles.form}>
        <FormTextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          containerStyle={styles.field}
        />
        <FormTextInput
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          containerStyle={styles.field}
        />
        <FormTextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          containerStyle={styles.field}
        />
        <PrimaryButton
          title="Sign up"
          onPress={() => navigation.navigate('Login')}
        />
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}> Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSizes.xxl,
    color: colors.text,
    fontWeight: '700',
    marginBottom: spacing.xl,
  },
  form: {
    alignSelf: 'stretch',
  },
  field: {
    marginBottom: spacing.md,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  footerText: {
    color: colors.mutedText,
    fontSize: fontSizes.sm,
  },
  link: {
    color: colors.primary,
    fontSize: fontSizes.sm,
    fontWeight: '600',
  },
});

