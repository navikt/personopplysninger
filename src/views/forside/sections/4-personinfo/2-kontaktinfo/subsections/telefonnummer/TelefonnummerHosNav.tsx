import { PlusCircleIcon } from "@navikt/aksel-icons";
import { Alert, Button, Label } from "@navikt/ds-react";
import { useState } from "react";
import Kilde from "@/components/kilde/Kilde";
import kildeStyles from "@/components/kilde/Kilde.module.css";
import driftsmeldinger from "@/driftsmeldinger";
import type { Language } from "@/language/language";
import { text as felles } from "@/language/text";
import type { Tlfnr } from "@/types/personalia";
import { fjernMellorom } from "@/utils/formattering";
import dkifStyles from "@/views/forside/sections/4-personinfo/2-kontaktinfo/subsections/kontakt-og-reservasjonsregisteret/DKIF.module.css";
import Telefonnummer from "./Telefonnummer";
import tlfStyles from "./Telefonnummer.module.css";
import TelefonnummerForm from "./TelefonnummerForm";
import { text } from "./telefonnummerText";

interface Props {
    tlfnr?: Tlfnr;
    language: Language;
}

const TelefonnummerHosNav = (props: Props) => {
    const [opprett, settOpprett] = useState<boolean>();

    const { tlfnr, language } = props;

    const onChangeSuccess = () => {
        settOpprett(false);
    };

    const onDeleteSuccess = () => {
        settOpprett(false);
    };

    const onLeggTil = () => settOpprett(!opprett);

    return (
        <>
            {driftsmeldinger.pdl && (
                <div style={{ paddingBottom: "1rem" }}>
                    <Alert role="status" variant="warning">
                        {driftsmeldinger.pdl}
                    </Alert>
                </div>
            )}
            {tlfnr && (tlfnr.telefonHoved || tlfnr.telefonAlternativ) ? (
                <div>
                    {tlfnr.telefonHoved && (
                        <Telefonnummer
                            prioritet={1}
                            hasTwoNumbers={!!(tlfnr.telefonHoved && tlfnr.telefonAlternativ)}
                            landskode={tlfnr.landskodeHoved}
                            tlfnummer={fjernMellorom(tlfnr.telefonHoved)}
                            onDeleteSuccess={onDeleteSuccess}
                            onChangeSuccess={onChangeSuccess}
                            language={language}
                        />
                    )}
                    {tlfnr.telefonAlternativ && (
                        <Telefonnummer
                            prioritet={2}
                            hasTwoNumbers={!!(tlfnr.telefonHoved && tlfnr.telefonAlternativ)}
                            landskode={tlfnr.landskodeAlternativ}
                            tlfnummer={fjernMellorom(tlfnr.telefonAlternativ)}
                            onDeleteSuccess={onDeleteSuccess}
                            onChangeSuccess={onChangeSuccess}
                            language={language}
                        />
                    )}
                    <div className={dkifStyles.marginKilde}>
                        <Kilde kilde={felles.kildeNav[language]} lenkeType={"INGEN"} />
                    </div>
                </div>
            ) : (
                <div className="underseksjon__beskrivelse">
                    {text.ingenDataFoer[language]}
                    <b>{text.ingenDataUthevet[language]}</b>
                    {text.ingenDataEtter[language]}
                </div>
            )}

            {!opprett && !(tlfnr && tlfnr.telefonHoved && tlfnr.telefonAlternativ) && (
                <Button
                    icon={<PlusCircleIcon className={kildeStyles.icon} aria-hidden="true" />}
                    variant="tertiary"
                    onClick={onLeggTil}
                    className={tlfStyles.leggtil}
                >
                    {text.leggTilTelefonnummer[language]}
                </Button>
            )}

            {opprett && (
                <div className={tlfStyles.radLeggtil}>
                    <div className={tlfStyles.container}>
                        <Label className={tlfStyles.verdi} as="p">
                            {text.leggTilTelefonnummer[language]}
                        </Label>
                    </div>
                    <TelefonnummerForm
                        type={"opprett"}
                        prioritet={tlfnr && tlfnr.telefonHoved ? 2 : 1}
                        onCancelClick={() => settOpprett(false)}
                        onChangeSuccess={onChangeSuccess}
                        tlfnr={tlfnr}
                        defaultValues={{
                            landskode: {
                                label: "Norge",
                                value: "+47",
                            },
                            tlfnummer: "",
                        }}
                        language={language}
                    />
                </div>
            )}
        </>
    );
};

export default TelefonnummerHosNav;
