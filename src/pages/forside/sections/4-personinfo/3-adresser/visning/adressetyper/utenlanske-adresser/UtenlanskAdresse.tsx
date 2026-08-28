import { BodyShort } from "@navikt/ds-react";
import type { UtenlandskAdresse as UtenlandskAdresseType } from "@/types/adresser/adresse";
import styles from "../../../Adresser.module.css";

const UtenlanskAdresse = (props: UtenlandskAdresseType) => {
    const { postboksNummerNavn, postkode } = props;
    const { adressenavnNummer, bygningEtasjeLeilighet } = props;
    const { coAdressenavn } = props;
    const { bySted, regionDistriktOmraade, land } = props;
    return (
        <>
            {coAdressenavn && (
                <div className={styles.linje}>
                    <BodyShort>{coAdressenavn}</BodyShort>
                </div>
            )}
            {adressenavnNummer && (
                <div className={styles.linje}>
                    <BodyShort>{adressenavnNummer}</BodyShort>
                </div>
            )}
            {bygningEtasjeLeilighet && (
                <div className={styles.linje}>
                    <BodyShort>{bygningEtasjeLeilighet}</BodyShort>
                </div>
            )}
            {postboksNummerNavn && (
                <div className={styles.linje}>
                    <BodyShort>{postboksNummerNavn}</BodyShort>
                </div>
            )}
            {(postkode ?? bySted) && (
                <div className={styles.linje}>
                    <BodyShort>
                        {postkode ?? ""} {bySted ?? ""}
                    </BodyShort>
                </div>
            )}
            {regionDistriktOmraade && (
                <div className={styles.linje}>
                    <BodyShort>{regionDistriktOmraade}</BodyShort>
                </div>
            )}
            {land && (
                <div className={styles.linje}>
                    <BodyShort>{land}</BodyShort>
                </div>
            )}
        </>
    );
};

export default UtenlanskAdresse;
