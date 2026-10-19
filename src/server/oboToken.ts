type TokenResult = { ok: true; token: string } | { ok: false; error: Error };

interface Options {
    audience: string;
    isLocal: boolean;
    requestOboToken: (token: string, audience: string) => Promise<TokenResult>;
}

// Lokalt finnes verken innlogging eller TokenX; mockene godtar hvilket som helst token.
export const getOboToken = async (token: string | undefined, { audience, isLocal, requestOboToken }: Options) => {
    if (isLocal) {
        return "Fake token";
    }

    if (!token) {
        throw new Error("Mangler brukertoken");
    }

    const result = await requestOboToken(token, audience);
    if (!result.ok) {
        throw new Error(`OBO-veksling mot ${audience} feilet: ${result.error.message}`);
    }

    return result.token;
};
