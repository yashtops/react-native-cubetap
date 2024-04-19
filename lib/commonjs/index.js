"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startDiscovery = exports.requestPermissions = exports.requestAccessFineLocationPermission = exports.isBluetoothEnabled = exports.enableBluetooth = void 0;
var _reactNative = require("react-native");
var _reactNativeBluetoothClassic = _interopRequireDefault(require("react-native-bluetooth-classic"));
var _reactNativeBluetoothStateManager = _interopRequireDefault(require("react-native-bluetooth-state-manager"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const requestPermissions = async () => {
  const permissions = ["android.permission.BLUETOOTH_SCAN", "android.permission.BLUETOOTH_CONNECT", "android.permission.ACCESS_FINE_LOCATION"];
  const granted = await _reactNative.PermissionsAndroid.requestMultiple(permissions);
  const allGranted = permissions.every(p => granted[p] === "granted");
  console.log('ALL GRANTED', allGranted);
  return allGranted;
};
exports.requestPermissions = requestPermissions;
const isBluetoothEnabled = async () => {
  try {
    const enabled = await _reactNativeBluetoothClassic.default.isBluetoothEnabled();
    return enabled;
  } catch (err) {
    console.error(err);
  }
};
exports.isBluetoothEnabled = isBluetoothEnabled;
const enableBluetooth = async () => {
  try {
    if (_reactNative.Platform.OS === 'ios') {
      _reactNativeBluetoothStateManager.default.openSettings();
    } else {
      const status = await _reactNativeBluetoothClassic.default.requestBluetoothEnabled();
      return status;
    }
  } catch (error) {
    console.error('error', error);
  }
};
exports.enableBluetooth = enableBluetooth;
const requestAccessFineLocationPermission = async () => {
  const granted = await _reactNative.PermissionsAndroid.request(_reactNative.PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
    title: 'Access fine location required for discovery',
    message: 'In order to perform discovery, you must enable/allow ' + 'fine location access.',
    buttonNegative: 'Cancel',
    buttonPositive: 'OK'
  });
  return granted === _reactNative.PermissionsAndroid.RESULTS.GRANTED;
};
exports.requestAccessFineLocationPermission = requestAccessFineLocationPermission;
const checkBluetoothPermission = async () => {
  const isScanGranted = await _reactNative.PermissionsAndroid.check(_reactNative.PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN);
  const isConnectGranted = await _reactNative.PermissionsAndroid.check(_reactNative.PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT);
  if (!isScanGranted || !isConnectGranted) {
    return false;
  }
  return true;
};
const checkLocationPermission = async () => {
  const isLocationGranted = await _reactNative.PermissionsAndroid.check(_reactNative.PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  if (!isLocationGranted) {
    return false;
  }
  return true;
};
const startDiscovery = async () => {
  const isBLenable = await isBluetoothEnabled();
  const BLPermission = await checkBluetoothPermission();
  if (!isBLenable) {
    enableBluetooth();
  } else if (!BLPermission) {
    console.error('Bluetooth permissions are not granted');
  } else if (!checkLocationPermission) {
    console.error('Location permissions are not granted');
  } else {
    try {
      console.log('start');
      const unpaired = await _reactNativeBluetoothClassic.default.startDiscovery();
      console.log('Discovery started', JSON.stringify(unpaired));
    } catch (error) {
      console.warn(error);
    } finally {
      await _reactNativeBluetoothClassic.default.cancelDiscovery();
      console.log('Discovery stopped');
    }
  }
};
exports.startDiscovery = startDiscovery;
//# sourceMappingURL=index.js.map