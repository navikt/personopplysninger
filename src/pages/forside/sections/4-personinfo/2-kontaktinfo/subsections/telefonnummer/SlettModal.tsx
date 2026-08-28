import { BodyShort, Button, Heading, Modal } from "@navikt/ds-react";
import { FormattedMessage } from "react-intl";
import HttpFeilmelding, { type Feilmelding } from "@/components/httpFeilmelding/HttpFeilmelding";
import styles from "../../../3-adresser/Adresser.module.css";

interface Props {
    lukkSlettModal: () => void;
    submitSlett: () => void;
    visSlettModal: boolean;
    isLoading: boolean;
    alert?: Feilmelding;
}

const SlettModal = (props: Props) => {
    const { visSlettModal, lukkSlettModal, submitSlett, isLoading, alert } = props;
    return (
        <>
            <Modal open={visSlettModal} onClose={lukkSlettModal} aria-labelledby="tlfnr-slett-overskrift">
                <Modal.Header closeButton={false}>
                    <Heading id="tlfnr-slett-overskrift" level="2" size="small">
                        <FormattedMessage id="personalia.tlfnr.slett.overskrift" />
                    </Heading>
                </Modal.Header>
                <Modal.Body>
                    <BodyShort>
                        <FormattedMessage id="personalia.tlfnr.slett.alert" />
                    </BodyShort>
                    <div className={styles.modalKnapper}>
                        <Button variant="tertiary" onClick={lukkSlettModal} disabled={isLoading}>
                            <FormattedMessage id="side.avbryt" />
                        </Button>
                        <Button as="button" variant="danger" onClick={submitSlett} loading={isLoading} disabled={isLoading}>
                            <FormattedMessage id={"side.slett"} />
                        </Button>
                    </div>
                    {alert && <HttpFeilmelding {...alert} />}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SlettModal;
