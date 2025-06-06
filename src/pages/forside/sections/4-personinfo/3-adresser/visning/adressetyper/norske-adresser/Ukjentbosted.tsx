import { BodyShort } from '@navikt/ds-react';
import { Ukjentbosted as UkjentbostedType } from '@/types/adresser/adresse';

const Ukjentbosted = (props: UkjentbostedType) => {
    const { bostedskommune, coAdressenavn } = props;
    return (
        <>
            {coAdressenavn && (
                <div className="adresse__linje">
                    <BodyShort>{coAdressenavn}</BodyShort>
                </div>
            )}
            {bostedskommune && (
                <div className="adresse__linje">
                    <BodyShort>{bostedskommune}</BodyShort>
                </div>
            )}
        </>
    );
};

export default Ukjentbosted;
