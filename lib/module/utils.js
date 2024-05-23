import { ToastAndroid } from "react-native";
import RNFS from 'react-native-fs';
const genereteCSV = async data => {
  if (data.length > 0) {
    const keys = Object.assign({}, Object.keys(data[0]));
    data.unshift(keys);
    const convertJsonToCSV = () => {
      const rows = data.map(data => Object.values(data).join(','));
      const csvContent = rows.join('\n');
      return csvContent;
    };
    const csvContent = convertJsonToCSV();
    console.log('csvContent', csvContent);
    try {
      const filepath = RNFS.DownloadDirectoryPath + '/' + new Date().getTime() + '.csv';
      await RNFS.writeFile(filepath, csvContent, 'utf8');
      console.log('File written to ', filepath);
      ToastAndroid.show('File exported succcessfully', ToastAndroid.SHORT);
    } catch (error) {}
  }
};
module.exports = {
  genereteCSV
};
//# sourceMappingURL=utils.js.map