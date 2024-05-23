import { ToastAndroid } from "react-native";
import RNFS from 'react-native-fs';

export const generateCSV = async (data: any) => {
    if (Array.isArray(data)) {
        if (data.length > 0) {
            const keys = Object.assign({}, Object.keys(data[0]));
            data.unshift(keys);
            const convertJsonToCSV = () => {
                const rows = data.map((text: any) => Object.values(text).join(','));
                const csvContent = rows.join('\n');
                return csvContent;
            }
            const csvContent = convertJsonToCSV();
            console.log('csvContent', csvContent)
            try {
                const filepath = RNFS.DownloadDirectoryPath + '/' + new Date().getTime() + '.csv';
                await RNFS.writeFile(filepath, csvContent, 'utf8');
                console.log('File written to ', filepath);
                ToastAndroid.show('File exported succcessfully', ToastAndroid.SHORT);
            } catch (error) {
            }
        }
    } else {
        console.error('Data is not an array')
    }

}
