import { PermissionsAndroid, Platform } from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';

export const requestPermissions = async () => {
    const permissions = [
        "android.permission.BLUETOOTH_SCAN",
        "android.permission.BLUETOOTH_CONNECT",
        "android.permission.ACCESS_FINE_LOCATION"
    ];
    const granted = await PermissionsAndroid.requestMultiple(permissions);
    const allGranted = permissions.every((p) => granted[p] === "granted");
    console.log('ALL GRANTED', allGranted)
    return allGranted
}

export const isBluetoothEnabled = async () => {
    try {
        const enabled = await RNBluetoothClassic.isBluetoothEnabled();
        return enabled
    } catch (err) {
        console.error(err)
    }
}
export const enableBluetooth = async () => {
    try {
        if (Platform.OS === 'ios') {
            BluetoothStateManager.openSettings();
        } else {
            const status = await RNBluetoothClassic.requestBluetoothEnabled();
            return status
        }
    } catch (error) {
        console.error('error',error)
        
    }
}

export const requestAccessFineLocationPermission = async () => {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            title: 'Access fine location required for discovery',
            message:
                'In order to perform discovery, you must enable/allow ' +
                'fine location access.',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK'
        }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
};
const checkBluetoothPermission = async () => {
    const isScanGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN);
    const isConnectGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT);
    if (!isScanGranted || !isConnectGranted) {
        return false
    }
    return true
}
const checkLocationPermission = async () => {
    const isLocationGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (!isLocationGranted) {
        return false
    }
    return true
}
export const startDiscovery = async () => {
    const isBLenable = await isBluetoothEnabled()
    const BLPermission = await checkBluetoothPermission()

    if (!isBLenable) {
        enableBluetooth()
    } else if (!BLPermission) {
        console.error('Bluetooth permissions are not granted');
    } else if (!checkLocationPermission) {
        console.error('Location permissions are not granted');
    } else {
        try {
            console.log('start')
            const unpaired = await RNBluetoothClassic.startDiscovery();
            console.log('Discovery started', JSON.stringify(unpaired));
        }catch (error) {
            console.warn(error);
        }finally {
            await RNBluetoothClassic.cancelDiscovery();
            console.log('Discovery stopped');
        }
    }
}