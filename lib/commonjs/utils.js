"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateCSV = void 0;
var _reactNative = require("react-native");
var _reactNativeFs = _interopRequireDefault(require("react-native-fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const generateCSV = async data => {
  if (Array.isArray(data)) {
    if (data.length > 0) {
      const keys = Object.assign({}, Object.keys(data[0]));
      data.unshift(keys);
      const convertJsonToCSV = () => {
        const rows = data.map(text => Object.values(text).join(','));
        const csvContent = rows.join('\n');
        return csvContent;
      };
      const csvContent = convertJsonToCSV();
      console.log('csvContent', csvContent);
      try {
        const filepath = _reactNativeFs.default.DownloadDirectoryPath + '/' + new Date().getTime() + '.csv';
        await _reactNativeFs.default.writeFile(filepath, csvContent, 'utf8');
        console.log('File written to ', filepath);
        _reactNative.ToastAndroid.show('File exported succcessfully', _reactNative.ToastAndroid.SHORT);
      } catch (error) {}
    }
  } else {
    console.error('Data is not an array');
  }
};
exports.generateCSV = generateCSV;
//# sourceMappingURL=utils.js.map