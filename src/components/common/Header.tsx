import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../../utils/theme';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  backgroundColor?: string;
  textColor?: string;
  rightAction?: React.ReactNode;
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  backgroundColor = THEME.colors.slothBg,
  textColor = THEME.colors.slothDark,
  rightAction,
  transparent = false,
}) => {
  const navigation = useNavigation();

  return (
    <View style={[
      styles.container, 
      !transparent && { backgroundColor },
      transparent && styles.transparent
    ]}>
      <SafeAreaView>
        <View style={styles.content}>
          <View style={styles.left}>
            {showBack && (
              <TouchableOpacity 
                onPress={() => navigation.goBack()} 
                style={styles.backButton}
                activeOpacity={0.7}
              >
                <Ionicons name="arrow-back" size={24} color={textColor} />
              </TouchableOpacity>
            )}
          </View>

          <Text style={[styles.title, { color: textColor }]}>{title}</Text>

          <View style={styles.right}>
            {rightAction}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 100,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.5)',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  transparent: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  content: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  left: {
    width: 48,
    alignItems: 'flex-start',
  },
  right: {
    width: 48,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: 8,
  },
  title: {
    ...THEME.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    flex: 1,
  },
});

export default Header;
