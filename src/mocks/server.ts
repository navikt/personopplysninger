import { serve } from "@hono/node-server";
import { createMockApp } from "./app";

const port = Number(process.env.MOCK_SERVER_PORT) || 3007;

serve(
    {
        fetch: createMockApp().fetch,
        port,
    },
    (serverInfo) => {
        console.log(`Hono mock server listening on http://localhost:${serverInfo.port}`);
    },
);
