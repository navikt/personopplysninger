export interface MedlInnslag {
  unntakId: number;
  ident: string;
  fraOgMed: string;
  tilOgMed: string;
  status: string;
  statusaarsak: string;
  dekning: string;
  helsedel: boolean;
  medlem: boolean;
  lovvalgsland: string;
  lovvalg: string;
  grunnlag: string;
}

export type MedlInfo = MedlInnslag[];
