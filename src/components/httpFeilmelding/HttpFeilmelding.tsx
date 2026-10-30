import { Alert } from "@navikt/ds-react";
import type { HTTPError } from "@/components/errorMessage/ErrorMessage";
import type { Language } from "@/language/language";
import { PAAGAAENDE_ENDRING, text } from "./httpFeilmeldingText";

type FeilmeldingType = "advarsel" | "info" | "feil";

export interface Feilmelding extends HTTPError {
    type: FeilmeldingType;
}

interface Props extends Feilmelding {
    language: Language;
}

type AlertVariant = { [key in FeilmeldingType]: "error" | "warning" | "info" | "success" };

const HttpFeilmelding = (props: Props) => {
    const alertVarianter: AlertVariant = {
        advarsel: "warning",
        info: "info",
        feil: "error",
    };

    const role = {
        success: "status",
        warning: "status",
        info: undefined,
        error: "alert",
    };
    const variant = alertVarianter[props.type] || alertVarianter.info;
    const melding = props.text === PAAGAAENDE_ENDRING ? text.paagaaendeEndring[props.language] : props.text;
    return (
        <div className="error__container">
            <Alert role={role[variant]} variant={variant}>
                {melding && <span>{melding}</span>}
            </Alert>
        </div>
    );
};

export default HttpFeilmelding;
