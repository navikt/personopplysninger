import { BodyShort } from '@navikt/ds-react';
import Postnummer from '../../../komponenter/Postnummer';
import { Postboksadresse as PostboksadresseType } from '@/types/adresser/adresse';

const formatPostboks = (postboks: string) =>
    /^postboks\b/i.test(postboks.trim()) ? postboks : `Postboks ${postboks}`;

const Postboksadresse = (props: PostboksadresseType) => {
    const { postbokseier, postboks, postnummer, coAdressenavn } = props;
    const { poststed } = props;
    return (
        <>
            {coAdressenavn && (
                <div className="adresse__linje">
                    <BodyShort>{coAdressenavn}</BodyShort>
                </div>
            )}
            {postbokseier && (
                <div className="adresse__linje">
                    <BodyShort>{postbokseier}</BodyShort>
                </div>
            )}
            {postboks && (
                <div className="adresse__linje">
                    <BodyShort>{formatPostboks(postboks)}</BodyShort>
                </div>
            )}
            <Postnummer postnummer={postnummer} poststed={poststed} />
        </>
    );
};

export default Postboksadresse;
