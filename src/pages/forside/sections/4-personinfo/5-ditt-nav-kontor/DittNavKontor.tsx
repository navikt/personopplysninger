import { BodyShort, Label, Link } from "@navikt/ds-react";
import { Reception } from "@navikt/nav-office-reception-info";
import { FormattedMessage } from "react-intl";
import dittNavKontorIkon from "@/assets/img/DittNavKontor.svg";
import Box from "@/components/box/Box";
import Kilde from "@/components/kilde/Kilde";
import ListElement from "@/components/listelement/ListElement";
import { useStore } from "@/store/Context";
import type { EnhetKontaktInfo } from "@/types/enhetKontaktInfo";

import "@navikt/nav-office-reception-info/dist/style.css";
import styles from "./DittNavKontor.module.css";

interface Props {
    enhetKontaktInformasjon: EnhetKontaktInfo;
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
            <div className={styles.ingress}>
                <BodyShort>
                    <FormattedMessage id="dittnavkontor.ingress" />
                    <Label as="span">{enhetNavn}</Label>
                </BodyShort>
            </div>
            <Reception receptions={publikumsmottak} language={locale} />
            <dl className={`${styles.footer} list`}>
                <ListElement
                    titleId="dittnavkontor.kontaktinfo.overskrift"
                    content={
                        <Link href={`/person/kontakt-oss/${locale === "en" ? "en" : "nb"}/`}>
                            <FormattedMessage id="dittnavkontor.kontaktinfo.lenke" />
                        </Link>
                    }
                />
            </dl>
            <Kilde kilde="personalia.source.nav" lenkeType={"INGEN"} />
        </Box>
    );
};

export default DittNavKontor;
