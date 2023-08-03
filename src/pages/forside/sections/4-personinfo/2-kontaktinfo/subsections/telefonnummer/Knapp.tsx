import { Button } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
    ariaLabel: string;
    onClick: () => void;
    ikon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>>;
    tekstId: string;
}

const Knapp = (props: Props) => {
    const { ariaLabel, onClick, ikon: Icon, tekstId } = props;
    return (
        <Button variant={'tertiary'} className={'knapp-med-ikon'} onClick={onClick} aria-label={ariaLabel}>
            <Icon className={'tlfnummer__ikon'} aria-hidden="true" />
            <span className={'tlfnummer__knapp-tekst'}>
                <FormattedMessage id={tekstId} />
            </span>
        </Button>
    );
};

export default Knapp;
