import { BodyShort } from "@navikt/ds-react";
import type { Postboksadresse as PostboksadresseType } from "@/types/adresser/adresse";
import styles from "../../../Adresser.module.css";
import Postnummer from "../../../komponenter/Postnummer";

const formatPostboks = (postboks: string) => (/^postboks\b/i.test(postboks.trim()) ? postboks : `Postboks ${postboks}`);

const Postboksadresse = (props: PostboksadresseType) => {
    const { postbokseier, postboks, postnummer, coAdressenavn } = props;
    const { poststed } = props;
    return (
        <>
            {coAdressenavn && (
                <div className={styles.linje}>
                    <BodyShort>{coAdressenavn}</BodyShort>
                </div>
            )}
            {postbokseier && (
                <div className={styles.linje}>
                    <BodyShort>{postbokseier}</BodyShort>
                </div>
            )}
            {postboks && (
                <div className={styles.linje}>
                    <BodyShort>{formatPostboks(postboks)}</BodyShort>
                </div>
            )}
            <Postnummer postnummer={postnummer} poststed={poststed} />
        </>
    );
};

export default Postboksadresse;
