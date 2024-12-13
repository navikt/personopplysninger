import { Accordion, BodyLong } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import { MedlInnslag } from '@/types/medl';
import Periode from './Periode';

interface Props {
    tittelId: string;
    tittelIdIngress: string;
    perioder: MedlInnslag[];
}

const Panel = (props: Props) => {
    const { perioder } = props;
    const { tittelId, tittelIdIngress } = props;
    return (
        <Accordion className={'medl__space'}>
            <Accordion.Item>
                <Accordion.Header>
                    <FormattedMessage id={tittelId} />
                </Accordion.Header>
                <Accordion.Content>
                    <BodyLong>
                        <FormattedMessage id={tittelIdIngress} />
                    </BodyLong>
                    <div className={'medl__flex-table '}>
                        {perioder.map((periode, i) => (
                            <Periode key={i} periode={periode} />
                        ))}
                    </div>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default Panel;
