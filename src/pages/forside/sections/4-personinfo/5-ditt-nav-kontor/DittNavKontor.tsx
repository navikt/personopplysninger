import Box from 'components/box/Box';
import dittNavKontorIkon from 'assets/img/DittNavKontor.svg';
import { GeografiskTilknytning } from 'types/adresser';
import { FormattedMessage } from 'react-intl';
import ListElement from 'components/listelement/ListElement';
import Kilde from 'components/kilde/Kilde';
import { useStore } from 'store/Context';
import { BodyShort, Label, Link } from '@navikt/ds-react';
import { AudienceReception, Reception } from '@navikt/nav-office-reception-info';

import '@navikt/nav-office-reception-info/dist/style.css';

interface Props {
    enhetKontaktInformasjon: AudienceReception[];
    geografiskTilknytning?: GeografiskTilknytning;
}

const DittNavKontor = (props: Props) => {
    const [{ locale }] = useStore();
    const publikumsmottak = props.enhetKontaktInformasjon || [];

    console.log('publikumsmottak', publikumsmottak); //TODO: Remove

    if (!publikumsmottak || !props.geografiskTilknytning) {
        return null;
    }

    const { geografiskTilknytning } = props;

    return (
        <Box id="ditt-nav-kontor" tittel="dittnavkontor.tittel" beskrivelse="dittnavkontor.beskrivelse" icon={dittNavKontorIkon} visAnkerlenke>
            <div className="dittnavkontor__ingress">
                <BodyShort>
                    <FormattedMessage id="dittnavkontor.ingress" />
                    <Label as="span">{geografiskTilknytning.enhet}</Label>
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
