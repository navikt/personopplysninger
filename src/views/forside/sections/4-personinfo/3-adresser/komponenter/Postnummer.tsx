import { BodyShort } from "@navikt/ds-react";
import adresseStyles from "../Adresser.module.css";

interface Props {
    postnummer?: string;
    poststed?: string;
}

const Postnummer = ({ postnummer, poststed }: Props) => (
    <div className={adresseStyles.linje}>
        <BodyShort>
            {!!postnummer && postnummer} {!!poststed && poststed}
        </BodyShort>
    </div>
);

export default Postnummer;
