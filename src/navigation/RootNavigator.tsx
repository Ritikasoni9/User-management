import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { THEME } from '../utils/theme';
import { RootState } from '../redux/store';
import { setAuth } from '../redux/authSlice';
import { setUsers } from '../redux/usersSlice';
import { loadData, STORAGE_KEYS } from '../utils/storage';

// Screens
import Login from '../screens/Login';
import UserListScreen from '../screens/UserListScreen';
import UserDetailScreen from '../screens/UserDetailScreen';
import EditUserScreen from '../screens/EditUserScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const insets = useSafeAreaInsets();
  const tabBarPaddingBottom = Math.max(insets.bottom, THEME.spacing.sm);
  const tabBarHeight = 60 + tabBarPaddingBottom;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: any;
        if (route.name === 'Directory') {
          iconName = focused ? 'people' : 'people-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarHideOnKeyboard: true,
      tabBarActiveTintColor: THEME.colors.primary,
      tabBarInactiveTintColor: THEME.colors.textMuted,
      tabBarStyle: {
        backgroundColor: THEME.colors.surface,
        borderTopWidth: 1,
        borderTopColor: THEME.colors.border,
        paddingBottom: tabBarPaddingBottom,
        paddingTop: THEME.spacing.xs,
        height: tabBarHeight,
        ...THEME.shadows.medium,
      },
      tabBarLabelStyle: {
        ...THEME.typography.small,
        fontWeight: '700',
      },
      headerShown: false,
      })}
    >
      <Tab.Screen name="Directory" component={UserListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const RootNavigator = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const rehydrate = async () => {
      try {
        // Rehydrate Auth Session
        const authData = await loadData(STORAGE_KEYS.AUTH);
        if (authData) {
          dispatch(setAuth(authData));
        }
      } catch (e) {
        console.error('Rehydration failed', e);
      }
    };
    rehydrate();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: THEME.colors.background },
        }}
      >
        {!token ? (
          <Stack.Screen name="Auth" component={Login} />
        ) : (
          <Stack.Group>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen
              name="UserDetail"
              component={UserDetailScreen}
              options={{ 
                headerShown: false, 
              }}
            />
            <Stack.Screen
              name="EditUser"
              component={EditUserScreen}
              options={{ 
                headerShown: false, 
              }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
