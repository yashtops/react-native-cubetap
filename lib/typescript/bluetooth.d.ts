export declare const isBluetoothEnabled: () => Promise<boolean>;
export declare const enableBluetooth: () => Promise<void>;
export declare const startDiscoveryCubetape: () => Promise<unknown>;
export declare const startDiscovery: () => Promise<unknown>;
export declare const connectDevice: (deviceId: string) => Promise<import("react-native-bluetooth-classic").BluetoothDevice>;
export declare const disconnectDevice: (deviceId: string) => Promise<true>;
export declare const pairDevice: (deviceId: string) => Promise<import("react-native-bluetooth-classic").BluetoothDevice>;
export declare const unPairDevice: (deviceId: string) => Promise<true>;
//# sourceMappingURL=bluetooth.d.ts.map