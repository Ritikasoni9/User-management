import React from 'react';
import { View, TextInput, Text, StyleSheet, ViewStyle, TextInputProps } from 'react-native';
import { THEME } from '../../utils/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  touched?: boolean;
  containerStyle?: ViewStyle;
  restrictEmoji?: boolean;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  touched, 
  containerStyle, 
  restrictEmoji = true,
  onChangeText,
  ...props 
}) => {
  const handleChangeText = (text: string) => {
    let cleanedText = text;
    if (restrictEmoji) {
      // Basic regex to remove emojis and special characters if strictly needed
      // This regex targets most common emojis and symbols
      cleanedText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/gu, '');
    }
    
    // Auto-trim is usually handled on blur or submit, but we can prevent double spaces here
    cleanedText = cleanedText.replace(/\s\s+/g, ' ');

    if (onChangeText) {
      onChangeText(cleanedText);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, touched && error ? styles.inputError : null]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={THEME.colors.textMuted}
          onChangeText={handleChangeText}
          {...props}
        />
      </View>
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    width: '100%',
  },
  label: {
    ...THEME.typography.h3,
    color: THEME.colors.black,
    marginBottom: 6,
    fontWeight: '700',
  },
  inputContainer: {
    height: 52,
    backgroundColor: THEME.colors.inputBackground,
    borderRadius: THEME.roundness.md,
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.inputBorder,
  },
  input: {
    ...THEME.typography.body,
    color: THEME.colors.textSecondary,
    fontWeight: '500',
  },
  inputError: {
    borderColor: THEME.colors.error,
  },
  errorText: {
    color: THEME.colors.error,
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
  },
});

export default Input;
