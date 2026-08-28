import { ExternalLinkIcon } from "@navikt/aksel-icons";
import { Alert } from "@navikt/ds-react";
import { FormattedMessage } from "react-intl";
import Kilde from "@/components/kilde/Kilde";
import ListElement from "@/components/listelement/ListElement";
import { Liste } from "@/components/listelement/Liste";
import { useStore } from "@/store/Context";
import type { KontaktInfo } from "@/types/kontaktInfo";
import sharedStyles from "../../kontaktinfo.module.css";

interface Props {
    info: KontaktInfo;
}

const KontaktInformasjon = (props: Props) => {
    const { mobiltelefonnummer, epostadresse, reservert, spraak } = props.info;
    const [{ locale }] = useStore();
    return mobiltelefonnummer || epostadresse ? (
        <>
            <div className={sharedStyles.telefonnummer}>
                <Liste>
                    <ListElement titleId="personalia.tlfnr" content={mobiltelefonnummer} />
                    <ListElement titleId="personalia.spraak" content={spraak} />
                    <ListElement titleId="personalia.email" content={epostadresse} />
                </Liste>
            </div>
            <div className={sharedStyles.telefonnummer}>
                <Alert variant="info" inline={true}>
                    <FormattedMessage
                        id={reservert ? "kontaktogreservasjonsregister-disclaimer-reservert" : "kontaktogreservasjonsregister-disclaimer"}
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
            <div className={sharedStyles.marginKilde}>
                <Kilde
                    kilde="personalia.source.dkif"
                    lenke={`https://minprofil.kontaktregisteret.no${locale === "en" ? "?locale=en" : ""}`}
                    lenkeTekst="personalia.link.dkif.endre"
                    lenkeType={"EKSTERN"}
                    ikon={ExternalLinkIcon}
                />
            </div>
        </>
    ) : (
        <>
            <div className="underseksjon__beskrivelse">
                <FormattedMessage
                    id={"personalia.dkif.ingenData"}
                    values={{
                        b: (text) => <b>{text}</b>,
                    }}
                />
            </div>
            <Alert variant="info" inline>
                <FormattedMessage
                    id={reservert ? "kontaktogreservasjonsregister-disclaimer-reservert" : "kontaktogreservasjonsregister-disclaimer"}
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
                lenke={`https://minprofil.kontaktregisteret.no${locale === "en" ? "?locale=en" : ""}`}
                lenkeTekst="personalia.link.dkif.leggtil"
                lenkeType={"EKSTERN"}
                ikon={ExternalLinkIcon}
            />
        </>
    );
};

export default KontaktInformasjon;
