import { PermissionsAndroid, Alert } from 'react-native';
const ALL_PERMISSIONS = [PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN, PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT, PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION];
export const requestAllPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple(ALL_PERMISSIONS);
    const allGranted = ALL_PERMISSIONS.every(permission => granted[permission] === PermissionsAndroid.RESULTS.GRANTED);
    if (!allGranted) {
      const notGranted = ALL_PERMISSIONS.filter(permission => granted[permission] !== PermissionsAndroid.RESULTS.GRANTED);
      const alertMessage = notGranted.map(permission => ALL_PERMISSIONS[permission]).join('\n');
      Alert.alert('Permissions required', alertMessage);
    }
    console.log('ALL GRANTED', allGranted);
    return allGranted;
  } catch (error) {
    console.error('Error requesting permissions', error);
    return false;
  }
};
export const checkAllPermissions = async () => {
  try {
    const results = await Promise.all(ALL_PERMISSIONS.map(permission => PermissionsAndroid.check(permission)));
    const allGranted = results.every(isGranted => isGranted);
    if (!allGranted) {
      const notGranted = ALL_PERMISSIONS.filter((permission, index) => !results[index]);
      const alertMessage = notGranted.map(permission => `${permission} is not granted.`).join('\n');
      Alert.alert('Permissions required', alertMessage);
    }
    return allGranted;
  } catch (error) {
    console.error('Error checking permissions', error);
    return false;
  }
};
//# sourceMappingURL=Permission.js.map