import { BodyShort } from "@navikt/ds-react";
import type { Ukjentbosted as UkjentbostedType } from "@/types/adresser/adresse";
import adresseStyles from "../../../Adresser.module.css";

const Ukjentbosted = (props: UkjentbostedType) => {
    const { bostedskommune, coAdressenavn } = props;
    return (
        <>
            {coAdressenavn && (
                <div className={adresseStyles.linje}>
                    <BodyShort>{coAdressenavn}</BodyShort>
                </div>
            )}
            {bostedskommune && (
                <div className={adresseStyles.linje}>
                    <BodyShort>{bostedskommune}</BodyShort>
                </div>
            )}
        </>
    );
};

export default Ukjentbosted;
