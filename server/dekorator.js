const jsdom = require("jsdom");
const request = require("request");
const NodeCache = require("node-cache");
const logger = require("./logger");
const { JSDOM } = jsdom;

const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60;

// Refresh cache every hour
const cache = new NodeCache({
  stdTTL: SECONDS_PER_HOUR,
  checkperiod: SECONDS_PER_MINUTE
});

const getDecorator = () =>
  new Promise((resolve, reject) => {
    const decorator = cache.get("main-cache");
    if (decorator) {
      resolve(decorator);
    } else {
      request(process.env.DECORATOR_URL, (error, response, body) => {
        if (!error && response.statusCode >= 200 && response.statusCode < 400) {
          const { document } = new JSDOM(body).window;
          const prop = "innerHTML";
          const data = {
            NAV_SKIPLINKS: document.getElementById("skiplinks")[prop],
            NAV_SCRIPTS: document.getElementById("scripts")[prop],
            NAV_STYLES: document.getElementById("styles")[prop],
            NAV_HEADING: document.getElementById("header-withmenu")[prop],
            NAV_FOOTER: document.getElementById("footer-withmenu")[prop],
            MEGAMENU_RESOURCES: document.getElementById("megamenu-resources")[
              prop
            ]
          };
          cache.set("main-cache", data);
          logger.info(`Creating cache`);
          resolve(data);
        } else {
          reject(new Error(error));
        }
      });
    }
  });

module.exports = getDecorator;
