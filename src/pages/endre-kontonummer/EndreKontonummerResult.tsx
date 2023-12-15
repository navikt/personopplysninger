import { Alert, BodyLong } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

export const EndreKontonummerSuccess = () => {
    return (
        <Alert variant={'success'}>
            <FormattedMessage
                id={'endreKontonummer.success'}
                values={{
                    p: (text) => <BodyLong>{text}</BodyLong>,
                }}
            />
        </Alert>
    );
};
