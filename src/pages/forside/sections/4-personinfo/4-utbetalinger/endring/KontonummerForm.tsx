import React, { useState } from 'react';
import { Alert, Button, Radio, RadioGroup } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import HttpFeilmelding, { Feilmelding } from '@/components/httpFeilmelding/HttpFeilmelding';
import Kilde from '@/components/kilde/Kilde';
import { normalizeNummer } from '@/utils/formattering';
import { fetchPersonInfo, postKontonummer } from '@/clients/apiClient';
import { PersonInfo } from '@/types/personInfo';
import { useStore } from '@/store/Context';
import { UtenlandskBankkonto } from '@/types/personalia';
import { UNKNOWN } from '@/utils/text';
import { Action, Locale } from '@/store/Store';
import { FormFields, OutboundNorskKontonummer, OutboundUtenlandsbankonto } from './types';
import OpprettEllerEndreNorskKontonr, { setOutboundNorskKontonummer } from './norsk-bankkonto/NorskKontonummer';
import OpprettEllerEndreUtenlandsbank, { setOutboundUtenlandsbankonto } from './utenlandsk-bankkonto/UtenlandsBankkonto';

interface Props {
    utenlandskbank?: UtenlandskBankkonto;
    personident?: { verdi: string; type: string };
    kontonr?: string;
    settOpprettEllerEndre: (arg: boolean) => void;
    submit?: () => void;
}

const NORSK = 'NORSK';
const UTENLANDSK = 'UTENLANDSK';

const KontonummerForm = (props: Props) => {
    const { kontonr, utenlandskbank, personident, settOpprettEllerEndre } = props;

    const { submit = submitKontonummer } = props;

    const methods = useForm<FormFields>({
        reValidateMode: 'onChange',
        defaultValues: utenlandskbank
            ? {
                  ...utenlandskbank,
                  kontonummer: undefined,
                  kontonummerIban: utenlandskbank.kontonummer || utenlandskbank.iban,
                  bickode: utenlandskbank.swiftkode,
                  land: {
                      label: utenlandskbank.land.toUpperCase(),
                      value: UNKNOWN,
                  },
                  valuta: {
                      label: utenlandskbank.valuta,
                      value: UNKNOWN,
                  },
              }
            : {
                  kontonummer: kontonr,
              },
    });

    const {
        handleSubmit,
        reset,
        formState: { isValid, isSubmitted },
    } = methods;

    const { formatMessage: msg } = useIntl();
    const [loading, settLoading] = useState(false);
    const [alert, settAlert] = useState<Feilmelding | null>(null);
    const [kontonummerType, setKontonummerType] = useState(utenlandskbank ? UTENLANDSK : NORSK);

    const [{ locale }, dispatch] = useStore();

    const onSubmit = (values: FieldValues) => {
        submit(values, kontonummerType, settAlert, settLoading, settOpprettEllerEndre, dispatch, locale);
    };

    return (
        <FormProvider {...methods}>
            <form className="kontonummerForm" onSubmit={handleSubmit(onSubmit)}>
                <RadioGroup legend={msg({ id: 'felter.kontonummer.grouplegend' })} defaultValue={kontonummerType}>
                    <Radio
                        value={NORSK}
                        onChange={(e) => {
                            setKontonummerType(e.target.value);
                            reset();
                        }}
                    >
                        {msg({ id: 'felter.kontonummervalg.norsk' })}
                    </Radio>
                    {kontonummerType === NORSK && <OpprettEllerEndreNorskKontonr personident={personident} />}
                    <Radio
                        value={UTENLANDSK}
                        onChange={(e) => {
                            setKontonummerType(e.target.value);
                            reset();
                        }}
                    >
                        {msg({ id: 'felter.kontonummervalg.utenlandsk' })}
                    </Radio>
                </RadioGroup>
                {kontonummerType === UTENLANDSK && <OpprettEllerEndreUtenlandsbank personident={personident} />}
                <Alert variant={'info'}>
                    <FormattedMessage id={'endreKontonummer.authInfo'} />
                </Alert>
                <div className="utbetalinger__knapper">
                    <Button variant={'primary'} type={'submit'} disabled={isSubmitted && !isValid} loading={loading}>
                        <FormattedMessage id={'side.lagre'} />
                    </Button>
                    <Button variant={'tertiary'} type={'button'} disabled={loading} onClick={() => settOpprettEllerEndre(false)}>
                        <FormattedMessage id={'side.avbryt'} />
                    </Button>
                </div>
                {alert && <HttpFeilmelding {...alert} />}
                <Kilde kilde="personalia.source.nav" lenkeType={'INGEN'} />
            </form>
        </FormProvider>
    );
};

const submitKontonummer = (
    values: FieldValues,
    kontonummerType: string,
    settAlert: (value: Feilmelding) => void,
    settLoading: (value: boolean) => void,
    settOpprettEllerEndre: (value: boolean) => void,
    dispatch: React.Dispatch<Action>,
    locale: Locale
) => {
    type Outbound = OutboundNorskKontonummer | OutboundUtenlandsbankonto;
    const outbound: { [key: string]: () => Outbound } = {
        NORSK: () => {
            values.kontonummer = normalizeNummer(values.kontonummer);
            return setOutboundNorskKontonummer(values);
        },
        UTENLANDSK: () => setOutboundUtenlandsbankonto(values),
    };

    settLoading(true);
    postKontonummer(outbound[kontonummerType](), locale)
        .then(() => getUpdatedData(dispatch))
        .then(() => settOpprettEllerEndre(false))
        .catch((error: Feilmelding) => settAlert(error))
        .then(() => settLoading(false));
};

const getUpdatedData = (dispatch: React.Dispatch<Action>) =>
    fetchPersonInfo().then((personInfo) => {
        dispatch({
            type: 'SETT_PERSON_INFO_RESULT',
            payload: personInfo as PersonInfo,
        });
    });

export default KontonummerForm;
