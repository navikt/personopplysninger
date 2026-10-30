import { Alert, Button, Radio, RadioGroup } from "@navikt/ds-react";
import { useState } from "react";
import { type FieldValues, FormProvider, useForm } from "react-hook-form";
import { postKontonummer } from "@/clients/apiClient";
import HttpFeilmelding, { type Feilmelding } from "@/components/httpFeilmelding/HttpFeilmelding";
import Kilde from "@/components/kilde/Kilde";
import type { Language } from "@/language/language";
import { text as felles } from "@/language/text";
import type { UtenlandskBankkonto } from "@/types/personalia";
import { normalizeNummer } from "@/utils/formattering";
import { UNKNOWN } from "@/utils/text";
import utbetalStyles from "@/views/forside/utbetalinger/Utbetalinger.module.css";
import formStyles from "./KontonummerForm.module.css";
import { text } from "./kontonummerSkjemaText";
import OpprettEllerEndreNorskKontonr, { setOutboundNorskKontonummer } from "./norsk-bankkonto/NorskKontonummer";
import type { FormFields, OutboundNorskKontonummer, OutboundUtenlandsbankonto } from "./types";
import OpprettEllerEndreUtenlandsbank, { setOutboundUtenlandsbankonto } from "./utenlandsk-bankkonto/UtenlandsBankkonto";

interface Props {
    utenlandskbank?: UtenlandskBankkonto;
    personident?: { verdi: string; type: string };
    kontonr?: string;
    settOpprettEllerEndre: (arg: boolean) => void;
    submit?: () => void;
    language: Language;
}

const NORSK = "NORSK";
const UTENLANDSK = "UTENLANDSK";

const KontonummerForm = (props: Props) => {
    const { kontonr, utenlandskbank, personident, settOpprettEllerEndre, language } = props;

    const { submit = submitKontonummer } = props;

    const methods = useForm<FormFields>({
        reValidateMode: "onChange",
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

    const [loading, settLoading] = useState(false);
    const [alert, settAlert] = useState<Feilmelding | null>(null);
    const [kontonummerType, setKontonummerType] = useState(utenlandskbank ? UTENLANDSK : NORSK);

    const onSubmit = (values: FieldValues) => {
        submit(values, kontonummerType, settAlert, settLoading, language);
    };

    return (
        <FormProvider {...methods}>
            <form className={formStyles.kontonummerForm} onSubmit={handleSubmit(onSubmit)}>
                <RadioGroup legend={text.kontonummerValg[language]} defaultValue={kontonummerType}>
                    <Radio
                        value={NORSK}
                        onChange={(e) => {
                            setKontonummerType(e.target.value);
                            reset();
                        }}
                    >
                        {text.norskKontonummer[language]}
                    </Radio>
                    {kontonummerType === NORSK && <OpprettEllerEndreNorskKontonr personident={personident} language={language} />}
                    <Radio
                        value={UTENLANDSK}
                        onChange={(e) => {
                            setKontonummerType(e.target.value);
                            reset();
                        }}
                    >
                        {text.utenlandskKontonummer[language]}
                    </Radio>
                </RadioGroup>
                {kontonummerType === UTENLANDSK && <OpprettEllerEndreUtenlandsbank personident={personident} language={language} />}
                <Alert variant={"info"}>{text.authInfo[language]}</Alert>
                <div className={utbetalStyles.knapper}>
                    <Button variant={"primary"} type={"submit"} disabled={loading || (isSubmitted && !isValid)} loading={loading}>
                        {felles.lagre[language]}
                    </Button>
                    <Button variant={"tertiary"} type={"button"} disabled={loading} onClick={() => settOpprettEllerEndre(false)}>
                        {felles.avbryt[language]}
                    </Button>
                </div>
                {alert && <HttpFeilmelding {...alert} language={language} />}
                <Kilde kilde={felles.kildeNav[language]} lenkeType={"INGEN"} />
            </form>
        </FormProvider>
    );
};

const submitKontonummer = (
    values: FieldValues,
    kontonummerType: string,
    settAlert: (value: Feilmelding) => void,
    settLoading: (value: boolean) => void,
    language: Language,
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
    postKontonummer(outbound[kontonummerType](), language).catch((error: Feilmelding) => {
        settAlert(error);
        settLoading(false);
    });
};

export default KontonummerForm;
