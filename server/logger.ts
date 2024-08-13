import { LoggerOptions, pino } from 'pino';

const options = {
    formatters: {
        level: (label) => {
            return { level: label };
        },
    },
} as LoggerOptions;

export const logger = pino(options);
