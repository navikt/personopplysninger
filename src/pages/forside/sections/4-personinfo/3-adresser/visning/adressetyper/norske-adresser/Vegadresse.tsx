import { BodyShort } from '@navikt/ds-react';
import { Vegadresse as VegadresseType } from '@/types/adresser/adresse';
import Postnummer from '../../../komponenter/Postnummer';

const Vegadresse = (props: VegadresseType) => {
    const { husnummer, husbokstav } = props;
    const { adressenavn, tilleggsnavn } = props;
    const { postnummer, poststed, coAdressenavn } = props;
    return (
        <>
            {tilleggsnavn && (
                <div className="adresse__linje">
                    <BodyShort>{tilleggsnavn}</BodyShort>
                </div>
            )}
            {coAdressenavn && (
                <div className="adresse__linje">
                    <BodyShort>{coAdressenavn}</BodyShort>
                </div>
            )}
            {(adressenavn || husnummer || husbokstav) && (
                <div className="adresse__linje">
                    <BodyShort>
                        {adressenavn || ''} {husnummer || ''} {husbokstav || ''}
                    </BodyShort>
                </div>
            )}
            <Postnummer postnummer={postnummer} poststed={poststed} />
        </>
    );
};

export default Vegadresse;
