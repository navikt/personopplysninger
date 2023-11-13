import { FormattedMessage } from 'react-intl';
import { Heading } from '@navikt/ds-react';

const Tittel = () => (
    <Heading size={'xlarge'} level={'1'} spacing align={'center'}>
        <FormattedMessage id="side.tittel" />
    </Heading>
);
export default Tittel;
