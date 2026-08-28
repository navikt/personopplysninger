import { BodyShort } from "@navikt/ds-react";
import type { Ukjentbosted as UkjentbostedType } from "@/types/adresser/adresse";
import styles from "../../../Adresser.module.css";

const Ukjentbosted = (props: UkjentbostedType) => {
    const { bostedskommune, coAdressenavn } = props;
    return (
        <>
            {coAdressenavn && (
                <div className={styles.linje}>
                    <BodyShort>{coAdressenavn}</BodyShort>
                </div>
            )}
            {bostedskommune && (
                <div className={styles.linje}>
                    <BodyShort>{bostedskommune}</BodyShort>
                </div>
            )}
        </>
    );
};

export default Ukjentbosted;
