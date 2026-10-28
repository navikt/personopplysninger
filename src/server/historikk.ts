import type { DsopDetaljInnslag, DsopHistorikkInfo, DsopInfo } from "@/types/dsop";
import type { HentetData } from "@/types/hentetData";
import type { InstInfo, InstInnslag } from "@/types/inst";

export const medData = <T, U>(hentet: HentetData<T>, bearbeid: (data: T) => U): HentetData<U> =>
    hentet.status === "RESULT" ? { status: "RESULT", data: bearbeid(hentet.data) } : hentet;

export const svarstatus = (innslag: HentetData<unknown>) => (innslag.status === "RESULT" && innslag.data === undefined ? 404 : 200);

export const tilDsopHistorikk = (sporingslogg: DsopInfo): DsopHistorikkInfo =>
    sporingslogg.map(({ uthentingsTidspunkt, mottakernavn }) => ({ uthentingsTidspunkt, mottakernavn }));

export const finnDsopInnslag = (sporingslogg: DsopInfo, id: string | undefined): DsopDetaljInnslag | undefined => {
    const innslag = sporingslogg.find((d) => d.uthentingsTidspunkt === id);
    if (!innslag) return undefined;

    const { samtykkeToken: _, ...detalj } = innslag;
    return detalj;
};

export const finnInstInnslag = (opphold: InstInfo, id: string | undefined): InstInnslag | undefined =>
    opphold.find((d) => d.registreringstidspunkt === id);
