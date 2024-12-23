import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { BodyLong, Label } from '@navikt/ds-react';
import { ChevronRightIcon } from '@navikt/aksel-icons';
import Icon from '@/components/icon/Icon';

export interface Props {
    id: string;
    tittel: string;
    beskrivelse: string;
    lenkeTekst: string;
    icon?: string;
    to: string;
    component: 'a' | 'Link';
}

const Box = (props: Props) => {
    return (
        <>
            <div className="linkbox__icon-container icon__container">
                <Icon backgroundImage={props.icon} ariaHidden={true} />
            </div>
            <div className="linkbox__content">
                <div className="linkbox__seksjon">
                    <div className="linkbox__tittel">
                        <div className="linkbox__lenke">
                            <Label as="div">
                                <FormattedMessage id={props.tittel} />
                            </Label>
                        </div>
                    </div>
                    <div className="linkbox__beskrivelse">
                        <BodyLong>
                            <FormattedMessage id={props.beskrivelse} />
                        </BodyLong>
                    </div>
                </div>
            </div>
            <ChevronRightIcon className="linkbox__next" aria-hidden="true" />
        </>
    );
};

const LinkBox = (props: Props) => {
    switch (props.component) {
        case 'Link':
            return (
                <Link className="linkbox__rad" to={props.to}>
                    <Box {...props} />
                </Link>
            );
        case 'a':
            return (
                <a className="linkbox__rad" href={props.to}>
                    <Box {...props} />
                </a>
            );
        default:
            return <Box {...props} />;
    }
};

export default LinkBox;
