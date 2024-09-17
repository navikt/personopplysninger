import { HTTPError } from '@/components/errorMessage/ErrorMessage';
import { Alert } from '@navikt/ds-react';
import { useIntl } from 'react-intl';

type FeilmeldingType = 'advarsel' | 'info' | 'feil';

export interface Feilmelding extends HTTPError {
    type: FeilmeldingType;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
type AlertVariant = { [key in FeilmeldingType]: 'error' | 'warning' | 'info' | 'success' };

const HttpFeilmelding = (props: Feilmelding) => {
    const { formatMessage, messages } = useIntl();

    const alertVarianter: AlertVariant = {
        advarsel: 'warning',
        info: 'info',
        feil: 'error',
    };

    const role = {
        success: 'status',
        warning: 'status',
        info: undefined,
        error: 'alert',
    };
    const variant = alertVarianter[props.type] || alertVarianter.info;
    const text = props.text in messages ? formatMessage({ id: props.text }) : props.text;
    return (
        <div className="error__container">
            <Alert role={role[variant]} variant={variant}>
                {text && <span>{text}</span>}
            </Alert>
        </div>
    );
};

export default HttpFeilmelding;
