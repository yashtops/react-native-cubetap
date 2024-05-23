import RNBluetoothClassic from 'react-native-bluetooth-classic';
import { checkAllPermissions } from './permission';

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
        await RNBluetoothClassic.requestBluetoothEnabled();
    } catch (error) {
        console.error('Error enabling Bluetooth', error);
        throw new Error('Failed to enable Bluetooth');
    }
};

export const startDiscoveryCubetape = async () => {
    const isBLenabled = await isBluetoothEnabled();
    const allPermission = await checkAllPermissions();

    if (!isBLenabled) {
        const enableBL = await enableBluetooth();
        return enableBL;
    } else if (!allPermission) {
        return allPermission
    } else {
        try {
            const unpaired = await RNBluetoothClassic.startDiscovery();
            const cubetapFilter = unpaired.filter((device) => device.name.toUpperCase().startsWith('C'))
            if (cubetapFilter.length > 0) {
                return cubetapFilter;
            }else{
                return []
            }
        } catch (error) {
            console.error(error)
            return error
        } finally {
            await RNBluetoothClassic.cancelDiscovery();
            console.log('Discovery stopped');
        }
    }
};

export const startDiscovery = async () => {
    const isBLenabled = await isBluetoothEnabled();
    const allPermission = await checkAllPermissions();

    if (!isBLenabled) {
        const enableBL = await enableBluetooth();
        return enableBL;
    } else if (!allPermission) {
        return allPermission
    } else {
        try {
            const unpaired = await RNBluetoothClassic.startDiscovery();
            return unpaired;
        } catch (error) {
            console.error(error)
            return error
        } finally {
            await RNBluetoothClassic.cancelDiscovery();
            console.log('Discovery stopped');
        }
    }
};
export const connectDevice = async (deviceId: string) => {
    try {
        const connected = await RNBluetoothClassic.connectToDevice(deviceId, { delimiter: '\r' });
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

export const disconnectDevice = async (deviceId: string) => {
    try {
        const disconnected = await RNBluetoothClassic.disconnectFromDevice(deviceId);
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

export const pairDevice = async (deviceId: string) => {
    try {
        const paired = await RNBluetoothClassic.pairDevice(deviceId);
        if (!paired) {
            throw new Error(`Failed to pair with device: ${deviceId}`);
        }
        return paired;
    } catch (error) {
        console.error(`Error pairing with device: ${deviceId}`, error);
        throw error;
    }
};

export const unPairDevice = async (deviceId: string) => {
    try {
        const unpaired = await RNBluetoothClassic.unpairDevice(deviceId);
        if (!unpaired) {
            throw new Error(`Failed to unpair with device: ${deviceId}`);
        }
        return unpaired;
    } catch (error) {
        console.error(`Error unpairing with device: ${deviceId}`, error);
        throw error;
    }
};