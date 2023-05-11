import { Feilmelding } from 'components/httpFeilmelding/HttpFeilmelding';

export const logApiError = (url: string, err: Feilmelding) => {
    switch (err.type) {
        default:
            console.log(url, err);
            break;
        case 'advarsel':
            console.warn(url, err);
            break;
        case 'feil':
            console.error(url, err);
            break;
    }
};
