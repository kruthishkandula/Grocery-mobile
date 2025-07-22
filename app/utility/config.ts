import { Platform } from "react-native";

let ip = '192.168.1.7' 

export const CMS_URL =  Platform.OS === 'ios' ? `http://${ip}:3005` : 'http://10.0.2.2:3005';
export const CMS_TOKEN = '69a30e8369fb44cdd86a53d2a4d9f87d29753074cace2346e4c8a02548361677537d633a86dac262d0a9a0f30717eb0d2aeab48e98d67a2fea64bb168a8daef5d79c1e80c747f055a6c7836aacddb07682cfa44e06412724210105a4c05cb45a512d973e42569cd84a0545760751f40a69e90b8cc85eadb0b80a0969b39d9b61';
export const NODE_URL = Platform.OS === 'ios' ? `http://${ip}:3000/` : 'http://10.0.2.2:3000/';
export const local_node = __DEV__
export const SPLASH_SCREEN_TIMEOUT = 200;

export const APP_NAME = "GroceryPlus";
export const APP_VERSION = "1.0.0.000";
export const BUILD_TYPE = __DEV__ ? "DEBUG" : "DEV"; // DEBUG or DEV or PROD
export const APP_OPCO = "INDIA"; // OPCO for the app, e.g., INDIA, UAE, etc.

export const persistor_list = ['categories', 'products', 'banners']