import { Alert, BodyLong } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

type Result = 'success' | 'error';

const RESULT_COOKIE = 'kontonr-result';

const resultTextIdMap: Record<string, string> = {
    success: 'endreKontonummer.success',
    error: 'endreKontonummer.error',
} as const;

export const EndreKontonummerResult = () => {
    const result = Cookies.get(RESULT_COOKIE) as Result | undefined;

    useEffect(() => {
        return () => Cookies.remove(RESULT_COOKIE);
    }, []);

    if (!result) {
        return null;
    }

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
