export interface MedlInnslag {
  fraOgMed: string;
  hjemmel: string;
  kilde: string;
  lovvalgsland: string;
  medlem: boolean;
  studieinformasjon?: Studieinformasjon;
  tilOgMed: string;
  trygdedekning: boolean;
}

export interface Studieinformasjon {
  statsborgerland: string;
  studieland: string;
}

export type MedlInfo = {
  perioder: MedlInnslag[];
};
