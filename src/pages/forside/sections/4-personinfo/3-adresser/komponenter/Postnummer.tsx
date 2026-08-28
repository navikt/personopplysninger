import { BodyShort } from "@navikt/ds-react";
import styles from "../Adresser.module.css";

interface Props {
    postnummer?: string;
    poststed?: string;
}

const Postnummer = ({ postnummer, poststed }: Props) => (
    <div className={styles.linje}>
        <BodyShort>
            {!!postnummer && postnummer} {!!poststed && poststed}
        </BodyShort>
    </div>
);

export default Postnummer;
