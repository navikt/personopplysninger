import { PencilIcon } from "@navikt/aksel-icons";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import Kilde from "@/components/kilde/Kilde";
import type { UtenlandskBankkonto } from "@/types/personalia";
import KontonummerForm from "./endring/KontonummerForm";
import NorskKontonummer from "./visning/NorskKontonummer";
import Utenlandskonto from "./visning/UtenlandsBankkonto";

interface Props {
    kontonr?: string;
    utenlandskbank?: UtenlandskBankkonto;
    personident?: { verdi: string; type: string };
}

const Kontonummer = ({ kontonr, utenlandskbank, personident }: Props) => {
    const [opprettEllerEndre, settOpprettEllerEndre] = useState(false);

    return opprettEllerEndre ? (
        <KontonummerForm utenlandskbank={utenlandskbank} personident={personident} kontonr={kontonr} settOpprettEllerEndre={settOpprettEllerEndre} />
    ) : (
        <>
            {kontonr || utenlandskbank ? (
                <>
                    <NorskKontonummer kontonummer={kontonr} />
                    <Utenlandskonto utenlandskBankkonto={utenlandskbank} />
                </>
            ) : (
                <div className="underseksjon__beskrivelse">
                    <FormattedMessage
                        id="personalia.kontonr.ingenData"
                        values={{
                            br: (text) => (
                                <>
                                    <br />
                                    {text}
                                </>
                            ),
                        }}
                    />
                </div>
            )}
            <Kilde
                kilde={"personalia.source.nav"}
                onClick={() => settOpprettEllerEndre(true)}
                lenkeTekst={kontonr || utenlandskbank ? "side.endre" : "side.leggtil"}
                lenkeType={"KNAPP"}
                ikon={PencilIcon}
            />
        </>
    );
};

export default Kontonummer;
