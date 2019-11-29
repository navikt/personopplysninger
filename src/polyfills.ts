// Functions
export const { _babelPolyfill } = window as any;
if (!_babelPolyfill) {
  require("babel-polyfill");
}

// Browsers
require("react-app-polyfill/ie9");
require("react-app-polyfill/ie11");

// Language
if (!global.Intl) {
  global.Intl = require("intl");
  require("intl/locale-data/jsonp/nb.js");
}
