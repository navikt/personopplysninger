// Browsers
import "core-js";
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";

// Language
if (!global.Intl) {
  global.Intl = require("intl");
  require("intl/locale-data/jsonp/nb.js");
}
