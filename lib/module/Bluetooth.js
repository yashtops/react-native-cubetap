import { Platform, Alert } from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import BleManager from 'react-native-ble-manager';
import { checkBluetoothPermission, checkLocationPermission } from './permissions';
export const isBluetoothEnabled = async () => {
  try {
    return await RNBluetoothClassic.isBluetoothEnabled();
  } catch (err) {
    console.error(err);
    throw new Error('Failed to check if Bluetooth is enabled');
  }
};
export const enableBluetooth = async () => {
  try {
    if (Platform.OS === 'ios') {
      BluetoothStateManager.openSettings();
    } else {
      await RNBluetoothClassic.requestBluetoothEnabled();
    }
  } catch (error) {
    console.error('Error enabling Bluetooth', error);
    throw new Error('Failed to enable Bluetooth');
  }
};
export const startDiscovery = async () => {
  const isBLenabled = await isBluetoothEnabled();
  const BLPermission = await checkBluetoothPermission();
  const locationPermission = await checkLocationPermission();
  if (!isBLenabled) {
    await enableBluetooth();
  } else if (!BLPermission) {
    Alert.alert('Bluetooth permissions are not granted');
    throw new Error('Bluetooth permissions are not granted');
  } else if (!locationPermission) {
    Alert.alert('Location permissions are not granted');
    throw new Error('Location permissions are not granted');
  } else {
    try {
      const unpaired = await RNBluetoothClassic.startDiscovery();
      return unpaired;
    } catch (error) {
      Alert.alert('Error', error.message);
      console.warn(error);
      throw error;
    } finally {
      await RNBluetoothClassic.cancelDiscovery();
      console.log('Discovery stopped');
    }
  }
};
export const connectDevice = async deviceId => {
  try {
    const connected = await RNBluetoothClassic.connect(deviceId);
    if (!connected) {
      throw new Error(`Failed to connect to device: ${deviceId}`);
    }
    console.log(`Connected to device: ${deviceId}`);
    return connected;
  } catch (error) {
    console.error(`Error connecting to device: ${deviceId}`, error);
    throw error;
  }
};
export const disconnectDevice = async deviceId => {
  try {
    const disconnected = await RNBluetoothClassic.disconnect(deviceId);
    if (!disconnected) {
      throw new Error(`Failed to disconnect from device: ${deviceId}`);
    }
    console.log(`Disconnected from device: ${deviceId}`);
    return disconnected;
  } catch (error) {
    console.error(`Error disconnecting from device: ${deviceId}`, error);
    throw error;
  }
};
export const pairDevice = async deviceId => {
  try {
    const paired = await RNBluetoothClassic.pairDevice(deviceId);
    if (!paired) {
      Alert.alert(`Failed to pair with device: ${deviceId}`);
      throw new Error(`Failed to pair with device: ${deviceId}`);
    }
    return paired;
  } catch (error) {
    Alert.alert(`Error pairing with device: ${deviceId}`, error.message);
    console.error(`Error pairing with device: ${deviceId}`, error);
    throw error;
  }
};
export const unPairDevice = async deviceId => {
  try {
    const unpaired = await RNBluetoothClassic.unpairDevice(deviceId);
    if (!unpaired) {
      Alert.alert(`Failed to unpair with device: ${deviceId}`);
      throw new Error(`Failed to unpair with device: ${deviceId}`);
    }
    return unpaired;
  } catch (error) {
    Alert.alert(`Error unpairing with device: ${deviceId}`, error.message);
    console.error(`Error unpairing with device: ${deviceId}`, error);
    throw error;
  }
};
export const scanForDevices = async (allowDuplicates = false) => {
  try {
    const devices = await BleManager.scan([], 10, allowDuplicates);
    return devices;
  } catch (error) {
    console.error('Error scanning for devices:', error);
    throw error;
  }
};
export const connectToDevice = async deviceId => {
  try {
    const connectedDevice = await BleManager.connect(deviceId);
    return connectedDevice;
  } catch (error) {
    console.error('Error connecting to device:', error);
    throw error;
  }
};
export const disconnectFromDevice = async deviceId => {
  try {
    await BleManager.disconnect(deviceId);
  } catch (error) {
    console.error('Error disconnecting from device:', error);
    throw error;
  }
};
//# sourceMappingURL=Bluetooth.js.map