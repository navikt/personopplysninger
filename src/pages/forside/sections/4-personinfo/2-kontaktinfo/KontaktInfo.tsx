import { Heading } from "@navikt/ds-react";
import { FormattedMessage } from "react-intl";
import kontaktIkon from "@/assets/img/Kontakt.svg";
import Box from "@/components/box/Box";
import Infotekst from "@/components/infotekst/Infotekst";
import type { Tlfnr } from "@/types/personalia";
import sharedStyles from "./kontaktinfo.module.css";
import dkifStyles from "./subsections/kontakt-og-reservasjonsregisteret/DKIF.module.css";
import DKIF from "./subsections/kontakt-og-reservasjonsregisteret/DKIF-Fetch";
import TelefonnummerHosNav from "./subsections/telefonnummer/TelefonnummerHosNav";

interface Props {
    tlfnr?: Tlfnr;
}

const KontaktInfo = (props: Props) => {
    return (
        <Box id="kontaktinformasjon" tittel="kontaktinfo.tittel" beskrivelse="kontaktinformasjon-kilde" icon={kontaktIkon} visAnkerlenke>
            {props.tlfnr && (props.tlfnr.telefonHoved || props.tlfnr.telefonAlternativ) ? (
                <>
                    <div className="underseksjon__header">
                        <Heading size={"small"} level={"3"}>
                            <FormattedMessage id="personalia.tlfnr.oveskrift" />
                        </Heading>
                    </div>

                    <div className={sharedStyles.telefonnummer}>
                        <TelefonnummerHosNav tlfnr={props.tlfnr} />
                    </div>
                    <div className={`underseksjon__header underseksjon__divider ${dkifStyles.overskriftContainer}`}>
                        <Heading size={"small"} level={"3"}>
                            <FormattedMessage id="personalia.dkif.overskrift" />
                        </Heading>
                        <Infotekst overskriftID="personalia.dkif.overskrift" beskrivelseID="personalia.dkif.beskrivelse" />
                    </div>
                    <div className={sharedStyles.telefonnummer}>
                        <DKIF />
                    </div>
                </>
            ) : (
                <>
                    <div className={sharedStyles.telefonnummer}>
                        <DKIF />
                    </div>
                    <div className={sharedStyles.telefonnummer}>
                        <TelefonnummerHosNav tlfnr={props.tlfnr} />
                    </div>
                </>
            )}
        </Box>
    );
};

export default KontaktInfo;
