import type { DsopDetaljInnslag, DsopHistorikkInfo, DsopInfo } from "@/types/dsop";
import type { HentetData } from "@/types/hentetData";

export const medData = <T, U>(hentet: HentetData<T>, bearbeid: (data: T) => U): HentetData<U> =>
    hentet.status === "RESULT" ? { status: "RESULT", data: bearbeid(hentet.data) } : hentet;

// Et innslag som ikke finnes er 404. Feil fra API-et viser dagens feilmelding på siden, med 200.
export const svarstatus = (innslag: HentetData<unknown>) => (innslag.status === "RESULT" && innslag.data === undefined ? 404 : 200);

export const tilDsopHistorikk = (sporingslogg: DsopInfo): DsopHistorikkInfo =>
    sporingslogg.map(({ uthentingsTidspunkt, mottakernavn }) => ({ uthentingsTidspunkt, mottakernavn }));

export const finnDsopInnslag = (sporingslogg: DsopInfo, id: string | undefined): DsopDetaljInnslag | undefined => {
    const innslag = sporingslogg.find((d) => d.uthentingsTidspunkt === id);
    if (!innslag) return undefined;

    const { samtykkeToken: _, ...detalj } = innslag;
    return detalj;
};
