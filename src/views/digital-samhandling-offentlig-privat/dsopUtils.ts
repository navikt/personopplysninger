import dayjs from "dayjs";
import type { DsopHistorikkInfo } from "@/types/dsop";

export const grupperPerAar = (dsopInfo: DsopHistorikkInfo) => {
    const aarForste = dsopInfo.length > 0 ? `${dayjs(dsopInfo[0].uthentingsTidspunkt).year()}` : "";
    const aarListe = [...new Set(dsopInfo.map((innslag) => `${dayjs(innslag.uthentingsTidspunkt).year()}`))].sort((a, b) => b.localeCompare(a));

    return aarListe.map((aar) => ({
        aar,
        innslag: dsopInfo.filter((innslag) => `${dayjs(innslag.uthentingsTidspunkt).year()}` === aar),
        aapen: aar === aarForste,
    }));
};
