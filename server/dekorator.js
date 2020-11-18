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
  checkperiod: SECONDS_PER_MINUTE,
});

const getDecorator = () =>
  new Promise((resolve, reject) => {
    const cacheData = cache.get("main-cache");
    if (cacheData) {
      resolve(cacheData);
    } else {
      const params = {
        enforcedLogin: true,
        level: "Level4",
        redirectToApp: true,
        breadcrumbs: JSON.stringify([
          { url: `${process.env.REACT_APP_DITT_NAV_URL}`, title: "Ditt NAV" },
          { url: `${process.env.REACT_APP_URL}`, title: "Personopplysninger" },
        ]),
      };

      const url = `${process.env.DECORATOR_URL}/?${Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&")}`;

      request(url, (error, response, body) => {
        if (!error && response.statusCode >= 200 && response.statusCode < 400) {
          const { document } = new JSDOM(body).window;
          const prop = "innerHTML";
          const data = {
            HEADER: document.getElementById("header-withmenu")[prop],
            STYLES: document.getElementById("styles")[prop],
            FOOTER: document.getElementById("footer-withmenu")[prop],
            SCRIPTS: document.getElementById("scripts")[prop],
          };
          cache.set("main-cache", data);
          logger.info(`Creating cache`);
          resolve(data);
        } else {
          const errorData = `url: ${url}, error: ${error}, body: ${body}`;
          reject(new Error(`Failed to fetch decorator - ${errorData}`));
        }
      });
    }
  });

module.exports = getDecorator;
