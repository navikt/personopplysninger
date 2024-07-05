import * as React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import ListElement from '@/components/listelement/ListElement';
import { Heading, ReadMore } from '@navikt/ds-react';

interface Props {
    tittel: string;
    bruksenhetsnummer?: string;
    kommune?: string;
    flyttedatoFormatert?: string;
    gyldigTilOgMedFormatert?: string;
    children: JSX.Element | JSX.Element[];
}

const AdressePanel = (props: Props) => {
    const { formatMessage: msg } = useIntl();
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const toggleReadMore = () => {
        setIsOpen(!isOpen);
    };
    const readMoreLabel = isOpen ? msg({ id: 'adresse.bostedsadresse.lukkTekst' }) : msg({ id: 'adresse.bostedsadresse.apneTekst' });

    return (
        <div className="adresse__box">
            <div className="underseksjon__header">
                <Heading level={'4'} size={'xsmall'}>
                    <FormattedMessage id={props.tittel} />
                </Heading>
            </div>
            {props.children}
            {(props.bruksenhetsnummer || props.kommune || props.flyttedatoFormatert || props.gyldigTilOgMedFormatert) && (
                <ReadMore className="adresse__lesmer" header={readMoreLabel} onClick={toggleReadMore}>
                    <dl className="list address-columns">
                        {props.bruksenhetsnummer && <ListElement titleId="adresse.bolignummer" content={props.bruksenhetsnummer} />}
                        {props.kommune && <ListElement titleId="adresse.kommune" content={props.kommune} />}
                        {props.flyttedatoFormatert && <ListElement titleId="adresse.dato" content={props.flyttedatoFormatert} />}
                        {props.gyldigTilOgMedFormatert && <ListElement titleId="adresse.dato.gyldigtil" content={props.gyldigTilOgMedFormatert} />}
                    </dl>
                </ReadMore>
            )}
            <div className={'adresse__divider'} />
        </div>
    );
};

export default AdressePanel;
