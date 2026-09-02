import { BodyShort } from "@navikt/ds-react";
import type { UtenlandskAdresse as UtenlandskAdresseType } from "@/types/adresser/adresse";
import adresseStyles from "../../../Adresser.module.css";

const UtenlanskAdresse = (props: UtenlandskAdresseType) => {
    const { postboksNummerNavn, postkode } = props;
    const { adressenavnNummer, bygningEtasjeLeilighet } = props;
    const { coAdressenavn } = props;
    const { bySted, regionDistriktOmraade, land } = props;
    return (
        <>
            {coAdressenavn && (
                <div className={adresseStyles.linje}>
                    <BodyShort>{coAdressenavn}</BodyShort>
                </div>
            )}
            {adressenavnNummer && (
                <div className={adresseStyles.linje}>
                    <BodyShort>{adressenavnNummer}</BodyShort>
                </div>
            )}
            {bygningEtasjeLeilighet && (
                <div className={adresseStyles.linje}>
                    <BodyShort>{bygningEtasjeLeilighet}</BodyShort>
                </div>
            )}
            {postboksNummerNavn && (
                <div className={adresseStyles.linje}>
                    <BodyShort>{postboksNummerNavn}</BodyShort>
                </div>
            )}
            {(postkode ?? bySted) && (
                <div className={adresseStyles.linje}>
                    <BodyShort>
                        {postkode ?? ""} {bySted ?? ""}
                    </BodyShort>
                </div>
            )}
            {regionDistriktOmraade && (
                <div className={adresseStyles.linje}>
                    <BodyShort>{regionDistriktOmraade}</BodyShort>
                </div>
            )}
            {land && (
                <div className={adresseStyles.linje}>
                    <BodyShort>{land}</BodyShort>
                </div>
            )}
        </>
    );
};

export default UtenlanskAdresse;
