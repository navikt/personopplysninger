import type { AstroLoggerDestination, AstroLoggerLevel, AstroLoggerMessage } from "astro";
import { matchesLevel } from "astro/logger";

interface AstroLoggerOptions {
    level?: AstroLoggerLevel;
}

const writeLog = (message: AstroLoggerMessage) => {
    process.stdout.write(
        `${JSON.stringify({
            level: message.level,
            time: new Date().toISOString(),
            ...(message.label ? { label: message.label } : {}),
            message: message.message,
        })}\n`,
    );
};

const createAstroLogger = (options: AstroLoggerOptions = {}): AstroLoggerDestination => {
    const level = options.level ?? (process.env.LOG_LEVEL as AstroLoggerLevel | undefined) ?? "info";

    return {
        write(message: AstroLoggerMessage) {
            if (matchesLevel(message.level, level)) {
                writeLog(message);
            }
        },
        async flush() {},
        async close() {},
    };
};

export default createAstroLogger;
