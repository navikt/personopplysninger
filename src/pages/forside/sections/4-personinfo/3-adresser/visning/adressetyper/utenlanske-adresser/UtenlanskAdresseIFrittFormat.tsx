import { BodyShort } from '@navikt/ds-react';
import { UtenlandskAdresseIFrittFormat as UtenlanskAdresseIFrittFormatType } from '@/types/adresser/adresse';
import GateAdresse from '../../../komponenter/GateAdresse';

const UtenlanskAdresseIFrittFormat = (props: UtenlanskAdresseIFrittFormatType) => {
    const { adresselinje1, adresselinje2, adresselinje3 } = props;
    const { land } = props;
    return (
        <>
            <GateAdresse adresse1={adresselinje1} adresse2={adresselinje2} adresse3={adresselinje3} />
            {land && (
                <div className="adresse__linje">
                    <BodyShort>{land}</BodyShort>
                </div>
            )}
        </>
    );
};

export default UtenlanskAdresseIFrittFormat;
