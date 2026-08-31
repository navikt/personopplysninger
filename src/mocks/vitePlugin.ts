import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";
import { createMockApp } from "./app";

const readBody = async (request: IncomingMessage) => {
    const chunks: Buffer[] = [];
    for await (const chunk of request) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    return chunks.length > 0 ? Buffer.concat(chunks) : undefined;
};

const createRequest = async (request: IncomingMessage) => {
    const headers = new Headers();
    for (const [name, value] of Object.entries(request.headers)) {
        if (Array.isArray(value)) {
            for (const item of value) {
                headers.append(name, item);
            }
        } else if (value !== undefined) {
            headers.set(name, value);
        }
    }

    const method = request.method ?? "GET";
    return new Request(`http://${request.headers.host ?? "localhost"}${request.url}`, {
        method,
        headers,
        body: method === "GET" || method === "HEAD" ? undefined : await readBody(request),
    });
};

const writeResponse = async (response: Response, serverResponse: ServerResponse) => {
    serverResponse.statusCode = response.status;
    response.headers.forEach((value, name) => {
        serverResponse.setHeader(name, value);
    });
    serverResponse.end(Buffer.from(await response.arrayBuffer()));
};

export const honoMockPlugin = (): Plugin => ({
    name: "personopplysninger-hono-mocks",
    apply: "serve",
    configureServer(server) {
        const app = createMockApp();

        server.middlewares.use(async (request, response, next) => {
            if (!request.url?.startsWith("/api/")) {
                next();
                return;
            }

            try {
                await writeResponse(await app.fetch(await createRequest(request)), response);
            } catch (error) {
                next(error);
            }
        });
    },
});
