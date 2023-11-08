import { FormattedMessage } from 'react-intl';
import ListElement from 'components/listelement/ListElement';
import { KontaktInfo } from 'types/kontaktInfo';
import Kilde from 'components/kilde/Kilde';
import { useStore } from '../../../../../../../store/Context';
import { Alert } from '@navikt/ds-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';

interface Props {
    info: KontaktInfo;
}

const KontaktInformasjon = (props: Props) => {
    const { mobiltelefonnummer, epostadresse, kanVarsles, spraak } = props.info;
    const [{ locale }] = useStore();
    return mobiltelefonnummer || epostadresse || kanVarsles ? (
        <>
            {' '}
            <div className="telefonnummer">
                <dl className="list">
                    <ListElement titleId="personalia.tlfnr" content={mobiltelefonnummer} />
                    <ListElement titleId="personalia.spraak" content={spraak} />
                    <ListElement titleId="personalia.email" content={epostadresse} />
                </dl>
            </div>
            <div className="telefonnummer">
                <Alert variant="info" inline={true}>
                    <FormattedMessage
                        id="kontaktogreservasjonsregister-disclaimer"
                        values={{
                            br: (text) => (
                                <>
                                    <br />
                                    {text}
                                </>
                            ),
                        }}
                    />
                </Alert>
            </div>
            <div className="margin-kilde">
                <Kilde
                    kilde="personalia.source.dkif"
                    lenke={`https://brukerprofil.difi.no/minprofil${locale === 'en' ? '?locale=en' : ''}`}
                    lenkeTekst="personalia.link.dkif.endre"
                    lenkeType={'EKSTERN'}
                    ikon={ExternalLinkIcon}
                />
            </div>
        </>
    ) : (
        <>
            <div className="underseksjon__beskrivelse">
                <FormattedMessage
                    id={'personalia.dkif.ingenData'}
                    values={{
                        b: (text) => <b>{text}</b>,
                    }}
                />
            </div>
            <Alert variant="info" inline>
                <FormattedMessage
                    id="kontaktogreservasjonsregister-disclaimer"
                    values={{
                        br: (text) => (
                            <>
                                <br />
                                {text}
                            </>
                        ),
                    }}
                />
            </Alert>
            <Kilde
                kilde="personalia.source.dkif"
                lenke="https://brukerprofil.difi.no/minprofil"
                lenkeTekst="personalia.link.dkif.leggtil"
                lenkeType={'EKSTERN'}
                ikon={ExternalLinkIcon}
            />
        </>
    );
};

export default KontaktInformasjon;
