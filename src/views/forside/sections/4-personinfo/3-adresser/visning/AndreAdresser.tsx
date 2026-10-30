import { TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Button, Heading, Modal } from "@navikt/ds-react";
import { useState } from "react";
import { slettKontaktadresse } from "@/clients/apiClient";
import HttpFeilmelding, { type Feilmelding } from "@/components/httpFeilmelding/HttpFeilmelding";
import Kilde from "@/components/kilde/Kilde";
import type { Language } from "@/language/language";
import { text as felles } from "@/language/text";
import sharedStyles from "@/styles/shared.module.css";
import type { Kontaktadresse as IKontaktadresse } from "@/types/adresser/kontaktadresse";
import type { Oppholdsadresse as IOppholdsadresse } from "@/types/adresser/oppholdsadresse";
import { text } from "@/views/forside/adresser/adresserText";
import adresseStyles from "../Adresser.module.css";
import Adresse from "./Adresse";

interface Props {
    kontaktadresse?: IKontaktadresse;
    oppholdsadresse?: IOppholdsadresse;
    hentPaaNytt: () => Promise<void>;
    language: Language;
}

const AndreAdresser = (props: Props) => {
    const { kontaktadresse, oppholdsadresse, hentPaaNytt, language } = props;
    const [slettLoading, settSlettLoading] = useState<boolean>();
    const [slettAlert, settSlettAlert] = useState<Feilmelding | undefined>();
    const [visSlettModal, settVisSlettModal] = useState<boolean>(false);

    const apneSlettModal = () => {
        settVisSlettModal(true);
    };

    const lukkSlettModal = () => {
        settVisSlettModal(false);
    };

    const onSlettSuccess = () => {
        lukkSlettModal();
    };

    const slettPdlKontaktadresse = () => {
        settSlettLoading(true);

        slettKontaktadresse()
            .then(hentPaaNytt)
            .then(onSlettSuccess)
            .catch((error: Feilmelding) => settSlettAlert(error))
            .then(() => settSlettLoading(false));
    };

    return (
        <>
            <div className="underseksjon__header underseksjon__divider">
                <Heading size={"small"} level={"3"}>
                    {text.overskriftOvrige[language]}
                </Heading>
            </div>
            {oppholdsadresse && (
                <Adresse
                    adresse={oppholdsadresse?.adresse}
                    coAdressenavn={oppholdsadresse.coAdressenavn}
                    tittel={text.oppholdsadresse[language]}
                    language={language}
                />
            )}
            {kontaktadresse && (
                <>
                    <Adresse
                        adresse={kontaktadresse.adresse}
                        coAdressenavn={kontaktadresse.coAdressenavn}
                        gyldigTilOgMed={kontaktadresse.gyldigTilOgMed}
                        tittel={text.kontaktadresseNav[language]}
                        language={language}
                    />
                    <Button
                        variant="tertiary"
                        onClick={apneSlettModal}
                        className={adresseStyles.slettKontaktadresse}
                        icon={<TrashIcon aria-hidden={true} />}
                    >
                        {text.slettKontaktadresse[language]}
                    </Button>

                    {visSlettModal && (
                        <Modal open={visSlettModal} onClose={lukkSlettModal} aria-labelledby="slett-kontaktadresse-overskrift">
                            <Modal.Header closeButton={false}>
                                <Heading id="slett-kontaktadresse-overskrift" level="2" size="small">
                                    {text.slettKontaktadresse[language]}
                                </Heading>
                            </Modal.Header>
                            <Modal.Body>
                                <BodyShort>
                                    {text.slettAlertFoer[language]}
                                    <br />
                                    {text.slettAlertEtter[language]}
                                </BodyShort>
                                <div className={sharedStyles.modalKnapper}>
                                    <Button variant={"tertiary"} onClick={lukkSlettModal} disabled={slettLoading}>
                                        {felles.avbryt[language]}
                                    </Button>
                                    <Button variant={"danger"} onClick={slettPdlKontaktadresse} loading={slettLoading} disabled={slettLoading}>
                                        {felles.slett[language]}
                                    </Button>
                                </div>
                                {slettAlert && <HttpFeilmelding {...slettAlert} language={language} />}
                            </Modal.Body>
                        </Modal>
                    )}
                </>
            )}
            <Kilde kilde={felles.kildeNav[language]} lenkeType={"INGEN"} />
        </>
    );
};

export default AndreAdresser;
