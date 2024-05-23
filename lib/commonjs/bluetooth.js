"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unPairDevice = exports.startDiscoveryCubetape = exports.startDiscovery = exports.pairDevice = exports.isBluetoothEnabled = exports.enableBluetooth = exports.disconnectDevice = exports.connectDevice = void 0;
var _reactNativeBluetoothClassic = _interopRequireDefault(require("react-native-bluetooth-classic"));
var _permission = require("./permission");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const isBluetoothEnabled = async () => {
  try {
    return await _reactNativeBluetoothClassic.default.isBluetoothEnabled();
  } catch (err) {
    console.error(err);
    throw new Error('Failed to check if Bluetooth is enabled');
  }
};
exports.isBluetoothEnabled = isBluetoothEnabled;
const enableBluetooth = async () => {
  try {
    await _reactNativeBluetoothClassic.default.requestBluetoothEnabled();
  } catch (error) {
    console.error('Error enabling Bluetooth', error);
    throw new Error('Failed to enable Bluetooth');
  }
};
exports.enableBluetooth = enableBluetooth;
const startDiscoveryCubetape = async () => {
  const isBLenabled = await isBluetoothEnabled();
  const allPermission = await (0, _permission.checkAllPermissions)();
  if (!isBLenabled) {
    const enableBL = await enableBluetooth();
    return enableBL;
  } else if (!allPermission) {
    return allPermission;
  } else {
    try {
      const unpaired = await _reactNativeBluetoothClassic.default.startDiscovery();
      const cubetapFilter = unpaired.filter(device => device.name.toUpperCase().startsWith('C'));
      if (cubetapFilter.length > 0) {
        return cubetapFilter;
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      return error;
    } finally {
      await _reactNativeBluetoothClassic.default.cancelDiscovery();
      console.log('Discovery stopped');
    }
  }
};
exports.startDiscoveryCubetape = startDiscoveryCubetape;
const startDiscovery = async () => {
  const isBLenabled = await isBluetoothEnabled();
  const allPermission = await (0, _permission.checkAllPermissions)();
  if (!isBLenabled) {
    const enableBL = await enableBluetooth();
    return enableBL;
  } else if (!allPermission) {
    return allPermission;
  } else {
    try {
      const unpaired = await _reactNativeBluetoothClassic.default.startDiscovery();
      return unpaired;
    } catch (error) {
      console.error(error);
      return error;
    } finally {
      await _reactNativeBluetoothClassic.default.cancelDiscovery();
      console.log('Discovery stopped');
    }
  }
};
exports.startDiscovery = startDiscovery;
const connectDevice = async deviceId => {
  try {
    const connected = await _reactNativeBluetoothClassic.default.connectToDevice(deviceId, {
      delimiter: '\r'
    });
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
exports.connectDevice = connectDevice;
const disconnectDevice = async deviceId => {
  try {
    const disconnected = await _reactNativeBluetoothClassic.default.disconnectFromDevice(deviceId);
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
exports.disconnectDevice = disconnectDevice;
const pairDevice = async deviceId => {
  try {
    const paired = await _reactNativeBluetoothClassic.default.pairDevice(deviceId);
    if (!paired) {
      throw new Error(`Failed to pair with device: ${deviceId}`);
    }
    return paired;
  } catch (error) {
    console.error(`Error pairing with device: ${deviceId}`, error);
    throw error;
  }
};
exports.pairDevice = pairDevice;
const unPairDevice = async deviceId => {
  try {
    const unpaired = await _reactNativeBluetoothClassic.default.unpairDevice(deviceId);
    if (!unpaired) {
      throw new Error(`Failed to unpair with device: ${deviceId}`);
    }
    return unpaired;
  } catch (error) {
    console.error(`Error unpairing with device: ${deviceId}`, error);
    throw error;
  }
};
exports.unPairDevice = unPairDevice;
//# sourceMappingURL=bluetooth.js.map