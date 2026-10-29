import type { MedlInnslag } from "@/types/medl";

export const grupperPerioder = (medlInfo: { perioder?: MedlInnslag[] }) => {
    const perioder = medlInfo.perioder || [];

    const medMedlemskap = perioder.filter((periode) => periode.medlem && !periode.studieinformasjon);
    const utenMedlemskap = perioder.filter((periode) => !periode.medlem);
    const fraLanekassen = perioder.filter((periode) => periode.studieinformasjon);
    const ingenPerioder = medMedlemskap.length === 0 && utenMedlemskap.length === 0 && fraLanekassen.length === 0;

    return { medMedlemskap, utenMedlemskap, fraLanekassen, ingenPerioder };
};
