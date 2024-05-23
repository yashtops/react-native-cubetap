"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestAllPermissions = exports.checkAllPermissions = void 0;
var _reactNative = require("react-native");
const ALL_PERMISSIONS = [_reactNative.PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN, _reactNative.PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT, _reactNative.PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION];
const requestAllPermissions = async () => {
  try {
    const granted = await _reactNative.PermissionsAndroid.requestMultiple(ALL_PERMISSIONS);
    const allGranted = ALL_PERMISSIONS.every(permission => granted[permission] === _reactNative.PermissionsAndroid.RESULTS.GRANTED);
    if (!allGranted) {
      const notGranted = ALL_PERMISSIONS.filter(permission => granted[permission] !== _reactNative.PermissionsAndroid.RESULTS.GRANTED);
      const alertMessage = notGranted.map(permission => permission + ' is not granted.').join('\n');
      console.error(alertMessage);
    }
    console.log('ALL GRANTED', allGranted);
    return allGranted;
  } catch (error) {
    console.error('Error requesting permissions', error);
    return false;
  }
};
exports.requestAllPermissions = requestAllPermissions;
const checkAllPermissions = async () => {
  try {
    const results = await Promise.all(ALL_PERMISSIONS.map(permission => _reactNative.PermissionsAndroid.check(permission)));
    const allGranted = results.every(isGranted => isGranted);
    if (!allGranted) {
      const notGranted = ALL_PERMISSIONS.filter(({}, index) => !results[index]);
      const alertMessage = notGranted.map(permission => `${permission} is not granted.`).join('\n');
      console.error(alertMessage);
    }
    return allGranted;
  } catch (error) {
    console.error('Error checking permissions', error);
    return false;
  }
};
exports.checkAllPermissions = checkAllPermissions;
//# sourceMappingURL=permission.js.map