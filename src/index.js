import { Alert, PermissionsAndroid, Platform } from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import BleManager from 'react-native-ble-manager';

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
      RNBluetoothClassic.requestBluetoothEnabled();
    }
  } catch (error) {
    console.error('error', error)

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
    Alert.alert('Bluetooth permissions are not granted')
    console.error('Bluetooth permissions are not granted');
  } else if (!checkLocationPermission) {
    Alert.alert('Location permissions are not granted')
    console.error('Location permissions are not granted');
  } else {
    try {
      console.log('start')
      const unpaired = await RNBluetoothClassic.startDiscovery();
      return unpaired
    } catch (error) {
      Alert.alert('Error', error)
      console.warn(error);
    } finally {
      await RNBluetoothClassic.cancelDiscovery();
      console.log('Discovery stopped');
    }
  }
}

async function connectDevice(deviceId) {
  try {
    const connected = await RNBluetoothClassic.connect(deviceId);
    if (connected) {
      console.log(`Connected to device: ${deviceId}`);
    } else {
      console.error(`Failed to connect to device: ${deviceId}`);
    }
  } catch (error) {
    console.error(`Error connecting to device: ${deviceId}`, error);
  }
}


async function disconnectDevice(deviceId) {
  try {
    const disconnected = await RNBluetoothClassic.disconnect(deviceId);
    if (disconnected) {
      console.log(`Disconnected from device: ${deviceId}`);
    } else {
      console.error(`Failed to disconnect from device: ${deviceId}`);
    }
  } catch (error) {
    console.error(`Error disconnecting from device: ${deviceId}`, error);
  }
}

export const pairDevice = async (deviceId) => {
  try {
    const paired = await RNBluetoothClassic.pairDevice(deviceId);
    if (paired) {
      return paired
    } else {
      Alert.alert(`Failed to pair with device:  ${deviceId}`)
      console.error(`Failed to pair with device: ${deviceId}`);
    }
  } catch (error) {
    Alert.alert(`Error pairing with device: ${deviceId}`, error)
    console.error(`Error pairing with device: ${deviceId}`, error);
  }
}

export const unPairDevice = async (deviceId) => {
  try {
    const unpaired = await RNBluetoothClassic.unpairDevice(deviceId);
    if (unpaired) {
      return unpaired
    } else {
      Alert.alert(`Failed to unpair with device:  ${deviceId}`)
      console.error(`Failed to unpair with device: ${deviceId}`);
    }
  } catch (error) {
    Alert.alert(`Error unpairing with device: ${deviceId}`, error)
    console.error(`Error unpairing with device: ${deviceId}`, error);
  }

}

export const scanForDevices = async (allowDuplicates = false) => {
  try {
    const devices = await BleManager.scan([], 10, allowDuplicates);
    return devices;
  } catch (error) {
    console.error('Error scanning for devices:', error);
    throw error;
  }
};

// Connect to a BLE device
export const connectToDevice = async (deviceId) => {
  try {
    const connectedDevice = await BleManager.connect(deviceId);
    return connectedDevice;
  } catch (error) {
    console.error('Error connecting to device:', error);
    throw error;
  }
};

// Disconnect from a BLE device
export const disconnectFromDevice = async (deviceId) => {
  try {
    await BleManager.disconnect(deviceId);
  } catch (error) {
    console.error('Error disconnecting from device:', error);
    throw error;
  }
};

const getAllDevice = async () => {
  const BLEDevices = await startDiscovery()
  const devices = await scanForDevices()
}