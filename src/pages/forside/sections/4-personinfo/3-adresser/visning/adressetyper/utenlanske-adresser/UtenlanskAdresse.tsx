import { UtenlandskAdresse as UtenlandskAdresseType } from 'types/adresser/adresse';
import { BodyShort } from '@navikt/ds-react';

const UtenlanskAdresse = (props: UtenlandskAdresseType) => {
    const { postboksNummerNavn, postkode } = props;
    const { adressenavnNummer, bygningEtasjeLeilighet } = props;
    const { coAdressenavn } = props;
    const { bySted, regionDistriktOmraade, land } = props;
    return (
        <>
            {coAdressenavn && (
                <div className="adresse__linje">
                    <BodyShort>{coAdressenavn}</BodyShort>
                </div>
            )}
            {adressenavnNummer && (
                <div className="adresse__linje">
                    <BodyShort>{adressenavnNummer}</BodyShort>
                </div>
            )}
            {bygningEtasjeLeilighet && (
                <div className="adresse__linje">
                    <BodyShort>{bygningEtasjeLeilighet}</BodyShort>
                </div>
            )}
            {postboksNummerNavn && (
                <div className="adresse__linje">
                    <BodyShort>{postboksNummerNavn}</BodyShort>
                </div>
            )}
            {(postkode || bySted) && (
                <div className="adresse__linje">
                    <BodyShort>
                        {postkode || ''} {bySted || ''}
                    </BodyShort>
                </div>
            )}
            {regionDistriktOmraade && (
                <div className="adresse__linje">
                    <BodyShort>{regionDistriktOmraade}</BodyShort>
                </div>
            )}
            {land && (
                <div className="adresse__linje">
                    <BodyShort>{land}</BodyShort>
                </div>
            )}
        </>
    );
};

export default UtenlanskAdresse;
