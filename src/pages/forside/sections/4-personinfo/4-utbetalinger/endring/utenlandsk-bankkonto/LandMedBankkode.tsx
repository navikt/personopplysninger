import { FormattedMessage } from 'react-intl';
import { Alert } from '@navikt/ds-react';
import BickodeField from './felter/BickodeField';
import BankkodeField from './felter/BankkodeField';
import AdresseFields from './felter/AdresseFields';

interface Props {
    valgtLand: string;
}

const LandMedBankkode = (props: Props) => {
    const { valgtLand } = props;

    return (
        <>
            <div className="utbetalinger__bic-bankkode">
                <Alert role="status" variant="warning">
                    <FormattedMessage
                        id="felter.landetbrukerbankkode.advarsel"
                        values={{
                            land: valgtLand,
                            span: (text) => <span className="capitalize">{text}</span>,
                        }}
                    />
                </Alert>
                <BickodeField />
                <BankkodeField />
            </div>
            <AdresseFields />
        </>
    );
};
export default LandMedBankkode;
