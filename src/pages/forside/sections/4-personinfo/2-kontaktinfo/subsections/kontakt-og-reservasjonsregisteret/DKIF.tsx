import { FormattedMessage } from 'react-intl';
import ListElement from 'components/listelement/ListElement';
import { KontaktInfo } from 'types/kontaktInfo';
import Kilde from 'components/kilde/Kilde';
import eksternLenkeIkon from 'assets/img/Link.svg';
import { useStore } from '../../../../../../../store/Context';
import { Alert } from '@navikt/ds-react';

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
            </div>
            <div className="margin-kilde">
                <Kilde
                    kilde="personalia.source.dkif"
                    lenke={`https://brukerprofil.difi.no/minprofil${locale === 'en' ? '?locale=en' : ''}`}
                    lenkeTekst="personalia.link.dkif.endre"
                    lenkeType={'EKSTERN'}
                    ikon={eksternLenkeIkon}
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
            <div className="arbeidsforhold__disclaimer">
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
            </div>
            <Kilde
                kilde="personalia.source.dkif"
                lenke="https://brukerprofil.difi.no/minprofil"
                lenkeTekst="personalia.link.dkif.leggtil"
                lenkeType={'EKSTERN'}
                ikon={eksternLenkeIkon}
            />
        </>
    );
};

export default KontaktInformasjon;
