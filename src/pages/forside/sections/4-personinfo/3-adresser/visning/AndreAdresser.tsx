import { TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Button, Heading, Modal } from "@navikt/ds-react";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { fetchPersonInfo, slettKontaktadresse } from "@/clients/apiClient";
import HttpFeilmelding, { type Feilmelding } from "@/components/httpFeilmelding/HttpFeilmelding";
import Kilde from "@/components/kilde/Kilde";
import { useStore } from "@/store/Context";
import type { Kontaktadresse as IKontaktadresse } from "@/types/adresser/kontaktadresse";
import type { Oppholdsadresse as IOppholdsadresse } from "@/types/adresser/oppholdsadresse";
import type { PersonInfo } from "@/types/personInfo";
import Adresse from "./Adresse";

interface Props {
    kontaktadresse?: IKontaktadresse;
    oppholdsadresse?: IOppholdsadresse;
}

const AndreAdresser = (props: Props) => {
    const { kontaktadresse, oppholdsadresse } = props;
    const [, dispatch] = useStore();
    const [slettLoading, settSlettLoading] = useState<boolean>();
    const [slettAlert, settSlettAlert] = useState<Feilmelding | undefined>();
    const [visSlettModal, settVisSlettModal] = useState<boolean>(false);

    const apneSlettModal = () => {
        settVisSlettModal(true);
    };

    const lukkSlettModal = () => {
        settVisSlettModal(false);
    };

    const getUpdatedData = () =>
        fetchPersonInfo().then((personInfo) => {
            dispatch({
                type: "SETT_PERSON_INFO_RESULT",
                payload: personInfo as PersonInfo,
            });
        });

    const onSlettSuccess = () => {
        lukkSlettModal();
    };

    const slettPdlKontaktadresse = () => {
        settSlettLoading(true);

        slettKontaktadresse()
            .then(getUpdatedData)
            .then(onSlettSuccess)
            .catch((error: Feilmelding) => settSlettAlert(error))
            .then(() => settSlettLoading(false));
    };

    return (
        <>
            <div className="underseksjon__header underseksjon__divider">
                <Heading size={"small"} level={"3"}>
                    <FormattedMessage id={"adresse.overskrift.ovrige"} />
                </Heading>
            </div>
            {oppholdsadresse && (
                <Adresse adresse={oppholdsadresse?.adresse} coAdressenavn={oppholdsadresse.coAdressenavn} tittel={"adresse.oppholdsadresse"} />
            )}
            {kontaktadresse && (
                <>
                    {kontaktadresse && (
                        <Adresse
                            adresse={kontaktadresse?.adresse}
                            coAdressenavn={kontaktadresse.coAdressenavn}
                            gyldigTilOgMed={kontaktadresse.gyldigTilOgMed}
                            tittel={"adresse.kontaktadresse.nav"}
                        />
                    )}
                    <Button
                        variant="tertiary"
                        onClick={apneSlettModal}
                        className="adresse__slett-kontaktadresse knapp-med-ikon"
                        icon={<TrashIcon aria-hidden={true} />}
                    >
                        <FormattedMessage id={"side.slett.kontaktadresse"} />
                    </Button>

                    {visSlettModal && (
                        <Modal open={visSlettModal} onClose={lukkSlettModal} aria-labelledby="slett-kontaktadresse-overskrift">
                            <Modal.Header closeButton={false}>
                                <Heading id="slett-kontaktadresse-overskrift" level="2" size="small">
                                    <FormattedMessage id="side.slett.kontaktadresse" />
                                </Heading>
                            </Modal.Header>
                            <Modal.Body>
                                <BodyShort>
                                    <FormattedMessage
                                        id="adresse.slett.alert"
                                        values={{
                                            br: (text) => (
                                                <>
                                                    <br />
                                                    {text}
                                                </>
                                            ),
                                        }}
                                    />
                                </BodyShort>
                                <div className="adresse__modal-knapper">
                                    <Button variant={"tertiary"} onClick={lukkSlettModal} disabled={slettLoading}>
                                        <FormattedMessage id="side.avbryt" />
                                    </Button>
                                    <Button variant={"danger"} onClick={slettPdlKontaktadresse} loading={slettLoading} disabled={slettLoading}>
                                        <FormattedMessage id={"side.slett"} />
                                    </Button>
                                </div>
                                {slettAlert && <HttpFeilmelding {...slettAlert} />}
                            </Modal.Body>
                        </Modal>
                    )}
                </>
            )}
            {<Kilde kilde="personalia.source.nav" lenkeType={"INGEN"} />}
        </>
    );
};

export default AndreAdresser;
