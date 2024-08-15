import express from 'express';
import path from 'path';
import compression from 'compression';
import dotenv from 'dotenv';

import { logger } from './logger.js';
import { getHtmlWithDecorator } from './dekorator.js';

const localEnvFile = '.env';
if (process.env.VITE_ENV === 'local') {
    dotenv.config({ path: localEnvFile });
}

const buildPath = path.resolve(__dirname, '../client');
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
