import { Alert, BodyLong } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import Cookies from 'js-cookie';

type Result = 'success' | 'error';

const resultTextIdMap: Record<string, string> = {
    success: 'endreKontonummer.success',
    error: 'endreKontonummer.error',
} as const;

export const EndreKontonummerResult = () => {
    const result = Cookies.get('kontonr-result') as Result | undefined;

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
