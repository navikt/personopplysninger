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

// Historikken lenker bare til innslagene, så utleverte data og samtykketoken sendes ikke til nettleseren.
export type DsopHistorikkInnslag = Pick<DsopInnslag, "uthentingsTidspunkt" | "mottakernavn">;

export type DsopHistorikkInfo = DsopHistorikkInnslag[];

// Detaljsiden trenger utleverte data for nedlastingen, men ikke samtykketokenet.
export type DsopDetaljInnslag = Omit<DsopInnslag, "samtykkeToken">;
