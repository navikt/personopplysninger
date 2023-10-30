import { Fragment } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import MerInformasjonPanelinnhold from './MerInformasjonPanelinnhold';
import merInformasjon from './MerInformasjonData';
import { Heading, Panel, ReadMore } from '@navikt/ds-react';

const AlternativListe = () => {
    const { formatMessage: msg } = useIntl();

    return (
        <Panel className="el__panel">
            <div className="mi__content">
                <div className="mi__overskrift">
                    <Heading size={'medium'} level={'2'}>
                        <FormattedMessage id="alternativer.tittel" />
                    </Heading>
                </div>
                {merInformasjon.map((info, i) => (
                    <Fragment key={i}>
                        <ReadMore key={info.id} header={msg({ id: info.tittel })} className="mi__enkeltpanel">
                            <MerInformasjonPanelinnhold melding={info.melding} />
                        </ReadMore>
                    </Fragment>
                ))}
            </div>
        </Panel>
    );
};

export default AlternativListe;
