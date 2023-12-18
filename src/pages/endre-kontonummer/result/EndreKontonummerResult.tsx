import { Alert, BodyLong } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import Cookies from 'js-cookie';

type Result = 'success' | 'error';

const RESULT_COOKIE = 'kontonr-result';

const resultTextIdMap: Record<string, string> = {
    success: 'endreKontonummer.success',
    error: 'endreKontonummer.error',
} as const;

export const EndreKontonummerResult = () => {
    const result = Cookies.get(RESULT_COOKIE) as Result | undefined;
    if (!result) {
        return null;
    }

    Cookies.remove(RESULT_COOKIE);

    const resultTextId = resultTextIdMap[result];
    if (!resultTextId) {
        return null;
    }

    return (
        <Alert variant={result} className={'endreKontonrResult'}>
            <FormattedMessage
                id={resultTextId}
                values={{
                    p: (text) => <BodyLong>{text}</BodyLong>,
                }}
            />
        </Alert>
    );
};
