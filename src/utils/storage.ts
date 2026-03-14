import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
    AUTH: 'auth_data',
    USERS: 'users_data',
};

export const saveData = async (key: string, value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.error('Error saving data to AsyncStorage', e);
    }
};

export const loadData = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error('Error loading data from AsyncStorage', e);
        return null;
    }
};

export const removeData = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.error('Error removing data from AsyncStorage', e);
    }
};

export const clearAllData = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        console.error('Error clearing AsyncStorage', e);
    }
};
