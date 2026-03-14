import { RFValue } from 'react-native-responsive-fontsize';

export const rf = (size: number) => RFValue(size, 812);

export const fontSizes = {
  xs: rf(10),
  sm: rf(12),
  md: rf(14),
  lg: rf(16),
  xl: rf(20),
  xxl: rf(24),
};

