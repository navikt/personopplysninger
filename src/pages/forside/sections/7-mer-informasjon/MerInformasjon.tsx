import { Fragment } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import MerInformasjonPanelinnhold from './MerInformasjonPanelinnhold';
import merInformasjon from './MerInformasjonData';
import { Box, Heading, ReadMore } from '@navikt/ds-react';

const AlternativListe = () => {
    const { formatMessage: msg } = useIntl();

    return (
        <Box background="surface-default" className="el__panel">
            <div className="mi__content">
                <Heading size={'medium'} level={'2'}>
                    <FormattedMessage id="alternativer.tittel" />
                </Heading>
                {merInformasjon.map((info, i) => (
                    <Fragment key={i}>
                        <ReadMore key={info.id} header={msg({ id: info.tittel })}>
                            <MerInformasjonPanelinnhold melding={info.melding} />
                        </ReadMore>
                    </Fragment>
                ))}
            </div>
        </Box>
    );
};

export default AlternativListe;
