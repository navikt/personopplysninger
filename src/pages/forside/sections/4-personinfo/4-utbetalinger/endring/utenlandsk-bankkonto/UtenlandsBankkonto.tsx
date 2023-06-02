import { FormattedMessage } from 'react-intl';
import { electronicFormatIBAN } from 'ibantools';
import { brukerBankkode, harValgtUSA, validerBankkode, validerBic } from '../utils';
import AmerikanskKonto from './AmerikanskKonto';
import LandMedBankkode from './LandMedBankkode';
import LandUtenBankkode from './LandUtenBankkode';
import { Alert, ErrorSummary, Link } from '@navikt/ds-react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { FormFields } from '../types';
import LandField from './felter/LandField';
import ValutaField from './felter/ValutaField';
import BanknavnField from './felter/BanknavnField';
import KontonummerIbanField from './felter/KontonummerIbanField';
import { mapErrorsToSummary } from 'utils/kontonummer';
import { useIntlFormatter } from '../../../../../../../hooks/useIntlFormatter';
import { useStore } from 'store/Context';

interface Props {
    personident?: { verdi: string; type: string };
}

const OpprettEllerEndreUtenlandsbank = (props: Props) => {
    const [{ locale }] = useStore();
    const {
        watch,
        formState: { isSubmitted, errors },
    } = useFormContext<FormFields>();

    const { formatMessage } = useIntlFormatter();

    const valgtLand = watch().land;

    const utenlandskKontoInfoLenke = {
        nb: 'https://www.nav.no/utbetaling-utland',
        nn: 'https://www.nav.no/utbetaling-utland',
        en: 'https://www.nav.no/en/home/about-nav/relatert-informasjon/payment-of-benefits-from-nav-to-recipients-living-abroad',
    };

    return (
        <>
            <div className="utbetalinger__alert">
                <Alert variant="info">
                    <FormattedMessage
                        id="felter.utenlandskkonto.info"
                        values={{
                            a: (text) => <Link href={utenlandskKontoInfoLenke[locale]}>{text}</Link>,
                        }}
                    />
                </Alert>
            </div>

            <LandField />

            {valgtLand && (
                <>
                    <ValutaField />
                    <BanknavnField />
                    <KontonummerIbanField personident={props.personident} />

                    {harValgtUSA(valgtLand) ? (
                        <AmerikanskKonto />
                    ) : brukerBankkode(valgtLand) ? (
                        <LandMedBankkode valgtLand={valgtLand.label.toLowerCase()} />
                    ) : (
                        <LandUtenBankkode />
                    )}
                </>
            )}
            {isSubmitted && Object.keys(errors).length > 0 && (
                <ErrorSummary title={formatMessage('validation.fix.errors')}>
                    {mapErrorsToSummary(errors).map((error) => (
                        <ErrorSummary.Item key={error.skjemaelementId} href={`#${error.skjemaelementId}`}>
                            {error.feilmelding}
                        </ErrorSummary.Item>
                    ))}
                </ErrorSummary>
            )}
        </>
    );
};
export const setOutboundUtenlandsbankonto = (values: FieldValues) => {
    const sendBankkode = validerBankkode(values.land, values.bickode, values.bankkode);
    const sendBICKode = validerBic(values.land, values.bickode, values.bankkode);
    const sendAdresse = brukerBankkode(values.land);

    return {
        value: electronicFormatIBAN(values.kontonummerIban),
        utenlandskKontoInformasjon: {
            landkode: values.land.value,
            valuta: values.valuta.value,
            ...(sendBICKode && {
                swift: values.bickode,
            }),
            bank: {
                ...(sendAdresse && {
                    adresseLinje1: values.adresse1,
                    adresseLinje2: values.adresse2,
                    adresseLinje3: values.adresse3,
                }),
                ...(sendBankkode && {
                    kode: values.bankkode,
                }),
                navn: values.banknavn,
            },
        },
    };
};

export default OpprettEllerEndreUtenlandsbank;
