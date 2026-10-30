import { BodyShort, Button, Heading, Modal } from "@navikt/ds-react";
import HttpFeilmelding, { type Feilmelding } from "@/components/httpFeilmelding/HttpFeilmelding";
import type { Language } from "@/language/language";
import { text as felles } from "@/language/text";
import sharedStyles from "@/styles/shared.module.css";
import { text } from "./telefonnummerText";

interface Props {
    lukkSlettModal: () => void;
    submitSlett: () => void;
    visSlettModal: boolean;
    isLoading: boolean;
    alert?: Feilmelding;
    language: Language;
}

const SlettModal = (props: Props) => {
    const { visSlettModal, lukkSlettModal, submitSlett, isLoading, alert, language } = props;
    return (
        <>
            <Modal open={visSlettModal} onClose={lukkSlettModal} aria-labelledby="tlfnr-slett-overskrift">
                <Modal.Header closeButton={false}>
                    <Heading id="tlfnr-slett-overskrift" level="2" size="small">
                        {text.slettOverskrift[language]}
                    </Heading>
                </Modal.Header>
                <Modal.Body>
                    <BodyShort>{text.slettAlert[language]}</BodyShort>
                    <div className={sharedStyles.modalKnapper}>
                        <Button variant="tertiary" onClick={lukkSlettModal} disabled={isLoading}>
                            {felles.avbryt[language]}
                        </Button>
                        <Button as="button" variant="danger" onClick={submitSlett} loading={isLoading} disabled={isLoading}>
                            {felles.slett[language]}
                        </Button>
                    </div>
                    {alert && <HttpFeilmelding {...alert} language={language} />}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SlettModal;
