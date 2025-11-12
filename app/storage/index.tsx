import Storage from '@react-native-async-storage/async-storage';


export const local_storage = {
    setItem: async (key: string, value: any) => {
        let encryptedData = JSON.stringify(value);
        await Storage.setItem(key, encryptedData);
        return true;
    },
    getItem: async (key: string) => {
        const value = await Storage.getItem(key);
        let decryptedData =
            value && typeof value == 'string' ? JSON.parse(value) : {};
        return decryptedData;
    },
    removeItem: async (key: string) => {
        await Storage.removeItem(key);
    },
};