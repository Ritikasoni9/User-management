import { fontSize, moderateScale } from './responsive';

export const COLORS = {
    primary: '#4F46E5', // Indigo-600
    primaryLight: '#818CF8', // Indigo-400
    primaryDark: '#3730A3', // Indigo-800
    secondary: '#EC4899', // Pink-500
    accent: '#8B5CF6', // Violet-500
    background: '#F8FAFC', // Slate-50
    surface: '#FFFFFF',
    card: '#FFFFFF',
    text: '#0F172A', // Slate-900
    textSecondary: '#475569', // Slate-600
    textMuted: '#94A3B8', // Slate-400
    border: '#E2E8F0', // Slate-200
    inputBackground: '#F1F5F9', // Slate-100
    inputBorder: '#CBD5E1', // Slate-300
    error: '#EF4444',
    success: '#10B981',
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
    glass: 'rgba(255, 255, 255, 0.7)',
    glassDark: 'rgba(15, 23, 42, 0.05)',
    shadow: 'rgba(0, 0, 0, 0.08)',
    slothBg: '#F4F7FF',
    slothPrimary: '#3B49DF',
    slothDark: '#111827',
    slothGrey: '#6B7280',
};

export const SPACING = {
    xs: moderateScale(4),
    sm: moderateScale(8),
    md: moderateScale(16),
    lg: moderateScale(24),
    xl: moderateScale(32),
    xxl: moderateScale(48),
};

export const TYPOGRAPHY = {
    h1: {
        fontSize: fontSize(16),
        fontWeight: '700' as const,
        lineHeight: 24,
    },
    h2: {
        fontSize: fontSize(16),
        fontWeight: '700' as const,
        lineHeight: 24,
    },
    h3: {
        fontSize: fontSize(16),
        fontWeight: '600' as const,
        lineHeight: 22,
    },
    body: {
        fontSize: fontSize(14),
        fontWeight: '500' as const,
        lineHeight: 20,
    },
    bodyBold: {
        fontSize: fontSize(14),
        fontWeight: '600' as const,
        lineHeight: 20,
    },
    caption: {
        fontSize: fontSize(12),
        fontWeight: '500' as const,
        lineHeight: 18,
    },
    small: {
        fontSize: fontSize(12),
        fontWeight: '500' as const,
        lineHeight: 18,
    },
};

export const THEME = {
    colors: COLORS,
    spacing: SPACING,
    typography: TYPOGRAPHY,
    roundness: {
        sm: 8,
        md: 12,
        lg: 20,
        xl: 28,
        sloth: 32,
        full: 999,
    },
    shadows: {
        light: {
            shadowColor: COLORS.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 3,
        },
        medium: {
            shadowColor: COLORS.shadow,
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.15,
            shadowRadius: 20,
            elevation: 6,
        },
        premium: {
            shadowColor: COLORS.primary,
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 8,
        },
        sloth: {
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.08,
            shadowRadius: 24,
            elevation: 5,
        }
    },
};

export default THEME;
