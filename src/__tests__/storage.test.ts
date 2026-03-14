import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveData, loadData, removeData, STORAGE_KEYS } from '../utils/storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
}));

describe('storage utility', () => {
    const testKey = STORAGE_KEYS.AUTH;
    const testData = { id: 1, name: 'Test' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should save data correctly', async () => {
        await saveData(testKey, testData);
        expect(AsyncStorage.setItem).toHaveBeenCalledWith(testKey, JSON.stringify(testData));
    });

    it('should load data correctly', async () => {
        (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(testData));
        const result = await loadData(testKey);
        expect(result).toEqual(testData);
        expect(AsyncStorage.getItem).toHaveBeenCalledWith(testKey);
    });

    it('should return null if data does not exist', async () => {
        (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
        const result = await loadData(testKey);
        expect(result).toBeNull();
    });

    it('should remove data correctly', async () => {
        await removeData(testKey);
        expect(AsyncStorage.removeItem).toHaveBeenCalledWith(testKey);
    });
});
