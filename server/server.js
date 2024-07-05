const express = require('express');
const logger = require('./logger');
const path = require('path');
const compression = require('compression');
const localEnvFile = '.env';
if (process.env.NODE_ENV !== 'local') {
    require('dotenv').config(localEnvFile);
}
const getHtmlWithDecorator = require('./dekorator');
const buildPath = path.resolve(__dirname, '../build');
const basePath = '/person/personopplysninger';
const server = express();
server.disable('x-powered-by');

server.use(compression());
server.use(express.json());
server.use(`${basePath}`, express.static(buildPath, { index: false }));
server.get(`${basePath}/internal/isAlive|isReady`, (req, res) => res.sendStatus(200));

// Match everything except internal og static
server.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) =>
    getHtmlWithDecorator(`${buildPath}/index.html`)
        .then((html) => {
            res.send(html);
        })
        .catch((e) => {
            logger.error(e);
            res.status(500).send(e);
        })
);

const port = process.env.PORT || 8080;
server.listen(port, () => logger.info(`App listening on port: ${port}`));
