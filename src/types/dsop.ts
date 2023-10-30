export interface DsopInnslag {
    person: string;
    mottaker: string;
    mottakernavn: string;
    tema: string;
    behandlingsGrunnlag: string;
    uthentingsTidspunkt: string;
    leverteData: string;
    samtykkeToken: string;
}

export type DsopInfo = DsopInnslag[];
