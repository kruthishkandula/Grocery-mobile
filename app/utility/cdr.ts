import { getMetadata, getUserDetails, updateMetadata } from '@/store/auth/session';
import { Platform } from 'react-native';
import {
    getBrand,
    getDeviceName,
    getDeviceType,
    getFreeDiskStorage,
    getIpAddress,
    getModel,
    getUniqueId,
    getUserAgent,
    isEmulator,
    isPinOrFingerprintSet,
    isTablet
} from 'react-native-device-info';
import { getCountry } from 'react-native-localize';
import {
    APP_NAME,
    APP_VERSION,
    BUILD_TYPE,
} from './config';
import { getDeviceLocale, getNetworkType, isLandscape } from './metadata_utility';
import { generateRandomString } from './utility';


export const getInitHeaders = async () => {
    const requestID = generateRandomString(30);
    updateMetadata({ requestId: requestID });

    const date = new Date();
    const offset = date.getTimezoneOffset();
    let initHeaders: any = {};

    try {
        let isemulator = await isEmulator();
        initHeaders.sid = 'test'; // unique id we get response in init api
        initHeaders.msisdn = getUserDetails()?.phonenumber;
        initHeaders.devinfo = getDeviceType() + ' ' + getModel() + ' ' + getBrand();
        initHeaders.channel = 'App';
        initHeaders.buildtype = BUILD_TYPE;
        initHeaders.version = `${APP_VERSION?.slice(0, -4)}/${Platform.OS}`;
        initHeaders.os = Platform.OS;
        initHeaders.opco = getMetadata()?.countryOpco || 'IN';
        initHeaders.lang = getMetadata()?.language;
        initHeaders.role = getUserDetails()?.role || 'guest';
        initHeaders.reqtype = '1';
        initHeaders.devid = await getUniqueId();
        initHeaders.deviceInfo = {
            deviceId: await getUniqueId(),
            deviceModel: getModel(),
            deviceBrand: getBrand(),
            os: Platform.OS,
        };
        initHeaders.requestId = requestID;
        initHeaders.devtoken = getMetadata()?.firebasetoken;
        initHeaders.groupname = getMetadata()?.countryOpco; //country IND
        initHeaders.appname = APP_NAME;
        initHeaders.screenid = 'Test';
        initHeaders.screentransaction = 'Test';
        initHeaders.category = 'Test';
        initHeaders.subcategory = 'Test';
        initHeaders.appversion = APP_VERSION;
        initHeaders.isemulator = isemulator;
        initHeaders.firebasetoken = getMetadata()?.firebasetoken;
        initHeaders.type = !isemulator && getDeviceType();
        initHeaders.instanceid = await getUniqueId();
        initHeaders.model = !isemulator && getModel();
        initHeaders.devicecountry = getCountry();
        initHeaders.devicelocale = !isemulator && (await getDeviceLocale());
        initHeaders.devicename = !isemulator && (await getDeviceName());
        initHeaders.freediskstorage = !isemulator && (await getFreeDiskStorage());
        initHeaders.ipaddress = !isemulator && (await getIpAddress());
        initHeaders.wifiormobiledata = getNetworkType();
        initHeaders.timezone = offset.toString();
        initHeaders.useragent = await getUserAgent();
        initHeaders.ispinorfingerprintset =
            !isemulator && (await isPinOrFingerprintSet());
        initHeaders.istablet = isTablet();
        initHeaders.islandscape = isLandscape();
        initHeaders.devicetype = !isemulator && getDeviceType();
        return initHeaders;
    } catch (error) {
        return initHeaders;
    }
};