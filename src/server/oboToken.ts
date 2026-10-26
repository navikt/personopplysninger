import { requestTokenxOboToken } from "@navikt/oasis";

export const getOboToken = async (token: string | undefined, audience: string) => {
    if (process.env.NODE_ENV === "development") {
        return "Fake token";
    }

    if (!token) {
        throw new Error("Mangler brukertoken");
    }

    const result = await requestTokenxOboToken(token, audience);
    if (!result.ok) {
        throw new Error(`OBO-veksling mot ${audience} feilet: ${result.error.message}`);
    }

    return result.token;
};
