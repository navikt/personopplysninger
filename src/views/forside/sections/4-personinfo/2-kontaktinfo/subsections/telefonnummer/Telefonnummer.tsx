import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Label } from "@navikt/ds-react";
import { useState } from "react";
import { slettTlfnummer } from "@/clients/apiClient";
import HttpFeilmelding, { type Feilmelding } from "@/components/httpFeilmelding/HttpFeilmelding";
import type { Language } from "@/language/language";
import { text as felles } from "@/language/text";
import { formatTelefonnummer } from "@/utils/formattering";
import { UNKNOWN } from "@/utils/text";
import Knapp from "./Knapp";
import SlettModal from "./SlettModal";
import tlfStyles from "./Telefonnummer.module.css";
import TelefonnummerForm from "./TelefonnummerForm";
import { text } from "./telefonnummerText";

export interface OutboundTlfnummer {
    prioritet: 1 | 2;
    landskode?: string;
    nummer: string;
}

interface Props {
    prioritet: 1 | 2;
    hasTwoNumbers: boolean;
    onDeleteSuccess: () => void;
    onChangeSuccess: () => void;
    hentPaaNytt: () => Promise<void>;
    landskode?: string;
    tlfnummer: string;
    language: Language;
}

const Telefonnummer = (props: Props) => {
    const { prioritet, landskode, tlfnummer, hasTwoNumbers, hentPaaNytt, language } = props;
    const [visSlettModal, settVisSlettModal] = useState(false);
    const [slettLoading, settSlettLoading] = useState(false);
    const [endre, settEndre] = useState(false);
    const [alert, settAlert] = useState<Feilmelding | undefined>();

    const defaultValues = {
        tlfnummer: tlfnummer ?? "",
        landskode: {
            label: UNKNOWN,
            value: landskode ?? "",
        },
    };

    const apneSlettModal = () => {
        settVisSlettModal(true);
    };
    const lukkSlettModal = () => {
        settVisSlettModal(false);
    };

    const onChangeSuccess = () => {
        props.onChangeSuccess();
        settEndre(false);
    };

    const onDeleteSuccess = () => {
        props.onDeleteSuccess();
        settSlettLoading(false);
        settVisSlettModal(false);
    };

    const submitSlett = () => {
        if (!tlfnummer) {
            return;
        }

        const outbound = {
            prioritet,
            landskode: landskode,
            nummer: tlfnummer,
        };

        settSlettLoading(true);
        slettTlfnummer(outbound)
            .then(hentPaaNytt)
            .then(onDeleteSuccess)
            .catch((error: Feilmelding) => {
                settSlettLoading(false);
                settAlert(error);
            });
    };

    return (
        <div className={tlfStyles.rad}>
            <div className={tlfStyles.container}>
                <div className={tlfStyles.verdi}>
                    <Label as="p">{text.telefonPrioritet[language](hasTwoNumbers ? prioritet : "")}</Label>
                    {!endre && (
                        <BodyShort>
                            {landskode && <span>{landskode} </span>}
                            {formatTelefonnummer(prioritet, tlfnummer, landskode)}
                        </BodyShort>
                    )}
                </div>

                {!endre && (
                    <div className={tlfStyles.knapper}>
                        <Knapp ariaLabel={"Endre telefonnummer"} onClick={() => settEndre(!endre)} ikon={PencilIcon} tekst={felles.endre[language]} />
                        <Knapp ariaLabel={"Slett telefonnummer"} onClick={apneSlettModal} ikon={TrashIcon} tekst={felles.slett[language]} />
                    </div>
                )}
            </div>
            {visSlettModal && (
                <SlettModal
                    visSlettModal={visSlettModal}
                    lukkSlettModal={lukkSlettModal}
                    submitSlett={submitSlett}
                    isLoading={slettLoading}
                    alert={alert}
                    language={language}
                />
            )}
            {endre && (
                <TelefonnummerForm
                    type={"endre"}
                    prioritet={prioritet}
                    onCancelClick={() => settEndre(!endre)}
                    onChangeSuccess={onChangeSuccess}
                    hentPaaNytt={hentPaaNytt}
                    defaultValues={defaultValues}
                    language={language}
                />
            )}
            {alert && <HttpFeilmelding {...alert} language={language} />}
        </div>
    );
};

export default Telefonnummer;
