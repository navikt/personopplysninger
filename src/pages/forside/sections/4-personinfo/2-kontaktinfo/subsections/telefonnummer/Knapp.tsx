import { Button } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

interface Props {
    ariaLabel: string;
    onClick: () => void;
    ikon: string;
    tekstId: string;
}

const Knapp = (props: Props) => {
    const { ariaLabel, onClick, ikon, tekstId } = props;
    return (
        <Button variant={'tertiary'} className={'knapp-med-ikon'} onClick={onClick} aria-label={ariaLabel}>
            <img className="tlfnummer__knapp-ikon" alt="" src={ikon} />
            <span className={'tlfnummer__knapp-tekst'}>
                <FormattedMessage id={tekstId} />
            </span>
        </Button>
    );
};

export default Knapp;
