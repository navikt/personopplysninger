import Box from 'components/box/Box';
import dittNavKontorIkon from 'assets/img/DittNavKontor.svg';
import { EnhetKontaktInfo } from 'types/enhetKontaktInfo';
import { GeografiskTilknytning } from 'types/adresser';
import { FormattedMessage } from 'react-intl';
import ListElement from 'components/listelement/ListElement';
import Kilde from 'components/kilde/Kilde';
import { useStore } from 'store/Context';
import { BodyShort, Label, Link } from '@navikt/ds-react';
import { Reception } from '@navikt/nav-office-reception-info';

import '@navikt/nav-office-reception-info/dist/style.css';

interface Props {
    enhetKontaktInformasjon: EnhetKontaktInfo;
    geografiskTilknytning?: GeografiskTilknytning;
}

const DittNavKontor = (props: Props) => {
    const [{ locale }] = useStore();

    const enhetNavn = props.enhetKontaktInformasjon.navn;
    const publikumsmottak = props.enhetKontaktInformasjon.brukerkontakt.publikumsmottak;

    if (!enhetNavn || !publikumsmottak) {
        return null;
    }

    return (
        <Box id="ditt-nav-kontor" tittel="dittnavkontor.tittel" beskrivelse="dittnavkontor.beskrivelse" icon={dittNavKontorIkon} visAnkerlenke>
            <div className="dittnavkontor__ingress">
                <BodyShort>
                    <FormattedMessage id="dittnavkontor.ingress" />
                    <Label as="span">{enhetNavn}</Label>
                </BodyShort>
            </div>
            <Reception receptions={publikumsmottak} language={locale} />
            <dl className="dittnavkontor__footer list">
                <ListElement
                    titleId="dittnavkontor.kontaktinfo.overskrift"
                    content={
                        <Link href={`/person/kontakt-oss/${locale === 'en' ? 'en' : 'nb'}/`}>
                            <FormattedMessage id="dittnavkontor.kontaktinfo.lenke" />
                        </Link>
                    }
                />
            </dl>
            <Kilde kilde="personalia.source.nav" lenkeType={'INGEN'} />
        </Box>
    );
};

export default DittNavKontor;
