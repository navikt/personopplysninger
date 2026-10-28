export interface DsopInnslag {
    person: string;
    mottaker: string;
    mottakernavn: string;
    tema: string;
    uthentingsTidspunkt: string;
    leverteData: string;
    samtykkeToken: string;
}

export type DsopInfo = DsopInnslag[];

export type DsopHistorikkInnslag = Pick<DsopInnslag, "uthentingsTidspunkt" | "mottakernavn">;

export type DsopHistorikkInfo = DsopHistorikkInnslag[];

export type DsopDetaljInnslag = Omit<DsopInnslag, "samtykkeToken">;
