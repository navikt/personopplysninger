import { friendlyFormatIBAN } from 'ibantools';
import { BodyShort } from '@navikt/ds-react';
import GateAdresse from '../../3-adresser/komponenter/GateAdresse';
import ListeElement from '@/components/listelement/ListElement';
import { UtenlandskBankkonto } from '@/types/personalia';
import { Liste } from '@/components/listelement/Liste';

interface Props {
    utenlandskBankkonto?: UtenlandskBankkonto;
}

const Utenlandskonto = ({ utenlandskBankkonto }: Props) => {
    return utenlandskBankkonto ? (
        <Liste>
            <ListeElement
                titleId={'personalia.bank'}
                content={
                    <>
                        {utenlandskBankkonto.banknavn && <BodyShort>{utenlandskBankkonto.banknavn}</BodyShort>}
                        <GateAdresse
                            adresse1={utenlandskBankkonto.adresse1}
                            adresse2={utenlandskBankkonto.adresse2}
                            adresse3={utenlandskBankkonto.adresse3}
                        />
                        {utenlandskBankkonto.land && <BodyShort>{utenlandskBankkonto.land}</BodyShort>}
                    </>
                }
            />
            {utenlandskBankkonto.kontonummer ? (
                <ListeElement titleId="personalia.kontonrelleriban" content={utenlandskBankkonto.kontonummer} />
            ) : utenlandskBankkonto.iban ? (
                <ListeElement titleId="personalia.iban" content={friendlyFormatIBAN(utenlandskBankkonto.iban)} />
            ) : null}
            <ListeElement titleId="personalia.bankkode" content={utenlandskBankkonto.bankkode} />
            <ListeElement titleId="personalia.valuta" content={utenlandskBankkonto.valuta} />
            <ListeElement titleId="personalia.bickode" content={utenlandskBankkonto.swiftkode} />
        </Liste>
    ) : null;
};

export default Utenlandskonto;
