import { Platform } from "react-native";

// let ip = '192.168.1.7' 
let ip = 'localhost' 

// let ip = '192.168.29.74' 

export const CMS_URL =  Platform.OS === 'ios' ? `http://${ip}:3005` : 'http://10.0.2.2:3005';
export const NODE_URL = Platform.OS === 'ios' ? `http://${ip}:3000/` : 'http://10.0.2.2:3000/';
// export const NODE_URL = 'https://grocery-backend-5tu6.onrender.com/';
export const ADMIN_WEB_URL = 'https://grocery-admin-qtxy.onrender.com'
export const local_node = __DEV__
export const SPLASH_SCREEN_TIMEOUT = 200;

export const APP_NAME = "GroceryPlus";
export const APP_VERSION = "1.0.0.000";
export const BUILD_TYPE = __DEV__ ? "DEBUG" : "DEV"; // DEBUG or DEV or PROD
export const APP_OPCO = "INDIA"; // OPCO for the app, e.g., INDIA, UAE, etc.

export const persistor_list = ['categories', 'products', 'banners']