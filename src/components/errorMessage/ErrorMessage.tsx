import { Alert } from '@navikt/ds-react';

export interface HTTPError {
    code: number;
    text: string;
}

interface Props {
    error: HTTPError;
}

const ErrorMessage = (props: Props) => {
    const { error } = props;
    return (
        <div className="errorMessage__container">
            <Alert role="alert" variant="error">
                Oisann, noe gikk galt ved henting av data!
                <br />
                {!!error.code && <span>{`${error.code}: `}</span>}
                {!!error.text && <span>{`${error.text}`}</span>}
            </Alert>
        </div>
    );
};

export default ErrorMessage;
