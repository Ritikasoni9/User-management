import React from 'react';
import { TextInput, TextInputProps, StyleSheet, View } from 'react-native';
import { colors } from '../constants/colors';
import { fontSizes } from '../constants/typography';
import { spacing } from '../constants/spacing';
import { radius } from '../constants/radius';

type Props = TextInputProps & {
  containerStyle?: object;
};

export default function FormTextInput({ containerStyle, style, ...rest }: Props) {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        placeholderTextColor={colors.mutedText}
        style={[styles.input, style]}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  input: {
    alignSelf: 'stretch',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    fontSize: fontSizes.md,
    color: colors.text,
    backgroundColor: colors.white,
  },
});

