import React from "react";
import { BodyShort, Button, Modal } from "@navikt/ds-react";
import { FormattedMessage } from "react-intl";
import HttpFeilmelding, {
  Feilmelding,
} from "../../../../../../../components/httpFeilmelding/HttpFeilmelding";

interface Props {
  lukkSlettModal: () => void;
  submitSlett: () => void;
  visSlettModal: boolean;
  isLoading: boolean;
  alert?: Feilmelding;
}

const SlettModal = (props: Props) => {
  const { visSlettModal, lukkSlettModal, submitSlett, isLoading, alert } =
    props;
  return (
    <>
      <Modal closeButton={false} open={visSlettModal} onClose={lukkSlettModal}>
        <Modal.Content>
          <div style={{ padding: "2rem 2.5rem" }}>
            <BodyShort>
              <FormattedMessage id="personalia.tlfnr.slett.alert" />
            </BodyShort>
            <div className="adresse__modal-knapper">
              <Button
                as="button"
                variant="danger"
                onClick={submitSlett}
                loading={isLoading}
                disabled={isLoading}
              >
                <FormattedMessage id={"side.slett"} />
              </Button>
              <Button
                variant="tertiary"
                onClick={lukkSlettModal}
                disabled={isLoading}
              >
                <FormattedMessage id="side.avbryt" />
              </Button>
            </div>
            {alert && <HttpFeilmelding {...alert} />}
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default SlettModal;
