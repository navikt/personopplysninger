import React, { useState } from "react";
import Kilde from "components/kilde/Kilde";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import { FormattedMessage, useIntl } from "react-intl";
import { Kontaktadresse as IKontaktadresse } from "../../../../../../types/adresser/kontaktadresse";
import { Oppholdsadresse as IOppholdsadresse } from "../../../../../../types/adresser/oppholdsadresse";
import Adresse from "./Adresse";
import slettIkon from "../../../../../../assets/img/Slett.svg";
import Modal from "nav-frontend-modal";
import { Fareknapp, Flatknapp } from "nav-frontend-knapper";
import HttpFeilmelding, { FeilmeldingType } from "../../../../../../components/httpFeilmelding/HttpFeilmelding";
import {
  fetchPersonInfo,
  slettKontaktadresse,
} from "../../../../../../clients/apiClient";
import { PersonInfo } from "../../../../../../types/personInfo";
import { useStore } from "../../../../../../store/Context";

interface Props {
  kontaktadresse?: IKontaktadresse;
  oppholdsadresse?: IOppholdsadresse;
}

const AndreAdresser = (props: Props) => {
  const { formatMessage: msg } = useIntl();
  const { kontaktadresse, oppholdsadresse } = props;

  const [, dispatch] = useStore();
  const [slettLoading, settSlettLoading] = useState<boolean>();
  const [slettAlert, settSlettAlert] = useState<FeilmeldingType | undefined>();
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
      .catch((error: FeilmeldingType) => settSlettAlert(error))
      .then(() => settSlettLoading(false));
  };

  return (
    <>
      <div className="underseksjon__header underseksjon__divider">
        <Undertittel>
          <FormattedMessage id={"adresse.overskrift.ovrige"} />
        </Undertittel>
      </div>
      {oppholdsadresse && (
        <Adresse
          adresse={oppholdsadresse?.adresse}
          coAdressenavn={oppholdsadresse.coAdressenavn}
          tittel={"adresse.oppholdsadresse"}
        />
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
          <button onClick={apneSlettModal} className="kilde__lenke lenke">
            <span className="kilde__icon">
              <img src={slettIkon} alt="Ekstern lenke" />
            </span>
            <Normaltekst>
              <FormattedMessage id={"side.slett.kontaktadresse"} />
            </Normaltekst>
          </button>

          {visSlettModal && (
            <Modal
              closeButton={false}
              isOpen={visSlettModal}
              onRequestClose={lukkSlettModal}
              contentLabel={msg({ id: "side.slett" })}
            >
              <div style={{ padding: "2rem 2.5rem" }}>
                <Normaltekst>
                  <FormattedMessage
                    id="adresse.slett.alert"
                    values={{
                      br: (text: String) => (
                        <>
                          <br />
                          {text}
                        </>
                      ),
                    }}
                  />
                </Normaltekst>
                <div className="adresse__modal-knapper">
                  <Fareknapp
                    onClick={slettPdlKontaktadresse}
                    spinner={slettLoading}
                    autoDisableVedSpinner={true}
                  >
                    <FormattedMessage id={"side.slett"} />
                  </Fareknapp>
                  <Flatknapp onClick={lukkSlettModal} disabled={slettLoading}>
                    <FormattedMessage id="side.avbryt" />
                  </Flatknapp>
                </div>
                {slettAlert && <HttpFeilmelding {...slettAlert} />}
              </div>
            </Modal>
          )}
        </>
      )}
      {<Kilde kilde="personalia.source.nav" lenkeType={"INGEN"} />}
    </>
  );
};

export default AndreAdresser;
