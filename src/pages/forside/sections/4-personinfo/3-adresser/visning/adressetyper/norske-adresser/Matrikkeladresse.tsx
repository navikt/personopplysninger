import { BodyShort } from "@navikt/ds-react";
import type { Matrikkeladresse as MatrikkeladresseType } from "@/types/adresser/adresse";
import styles from "../../../Adresser.module.css";
import Postnummer from "../../../komponenter/Postnummer";

const Matrikkeladresse = (props: MatrikkeladresseType) => {
    const { tilleggsnavn, postnummer } = props;
    const { poststed, coAdressenavn } = props;
    return (
        <>
            {coAdressenavn && (
                <div className={styles.linje}>
                    <BodyShort>{coAdressenavn}</BodyShort>
                </div>
            )}
            {tilleggsnavn && (
                <div className={styles.linje}>
                    <BodyShort>{tilleggsnavn}</BodyShort>
                </div>
            )}
            <Postnummer postnummer={postnummer} poststed={poststed} />
        </>
    );
};

export default Matrikkeladresse;
