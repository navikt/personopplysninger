// Functions
const { _babelPolyfill } = window as any;
if (!_babelPolyfill) {
  require("babel-polyfill");
}

// Browsers
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";

global.Intl = require("intl");
