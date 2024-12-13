import { BodyShort } from '@navikt/ds-react';
import Postnummer from '../../../komponenter/Postnummer';
import { Matrikkeladresse as MatrikkeladresseType } from '@/types/adresser/adresse';

const Matrikkeladresse = (props: MatrikkeladresseType) => {
    const { tilleggsnavn, postnummer } = props;
    const { poststed, coAdressenavn } = props;
    return (
        <>
            {coAdressenavn && (
                <div className="adresse__linje">
                    <BodyShort>{coAdressenavn}</BodyShort>
                </div>
            )}
            {tilleggsnavn && (
                <div className="adresse__linje">
                    <BodyShort>{tilleggsnavn}</BodyShort>
                </div>
            )}
            <Postnummer postnummer={postnummer} poststed={poststed} />
        </>
    );
};

export default Matrikkeladresse;
