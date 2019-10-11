import React, { useState } from "react";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { FormattedHTMLMessage } from "react-intl";
import { Adresser } from "types/adresser";
import Box from "components/box/Box";
import adresseIkon from "assets/img/Adresse.svg";
import Kilde from "components/kilde/Kilde";
import endreIkon from "assets/img/Pencil.svg";
import leggTilIkon from "assets/img/LeggTil.svg";
import slettIkon from "assets/img/Slett.svg";
import Folkeregisteret from "./folkeregisteret/Folkeregisteret";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import { Radio } from "nav-frontend-skjema";
import OpprettEllerEndreNorskMidlertidigAdresse from "./midlertidig-adresse/endring/NorskAdresse";
import OpprettEllerEndreUtenlandskAdresse from "./midlertidig-adresse/endring/UtenlandskAdresse";
import MidlertidigNorskAdresse from "./midlertidig-adresse/visning/NorskAdresse";
import UtenlandskAdresse from "./midlertidig-adresse/visning/UtenlandskAdresse";
import Modal from "nav-frontend-modal";
import { Fareknapp, Flatknapp } from "nav-frontend-knapper";
import Alert, { AlertType } from "components/alert/Alert";
import { slettUtenlandsAdresse } from "clients/apiClient";
import { slettMidlertidigAdresse } from "clients/apiClient";
import { fetchPersonInfo } from "clients/apiClient";
import { PersonInfo } from "types/personInfo";
import { useStore } from "providers/Provider";

interface Props {
  adresser: Adresser;
}

const NORSK = "NORSK";
const UTENLANDSK = "UTENLANDSK";

const AdresserPDL = (props: Props & InjectedIntlProps) => {
  const [, dispatch] = useStore();
  const { intl, adresser } = props;
  const { tilleggsadresse, utenlandskAdresse } = adresser;
  const harMidlertidigAdr = tilleggsadresse || utenlandskAdresse;
  const [slettLoading, settSlettLoading] = useState();
  const [slettAlert, settSlettAlert] = useState<AlertType | undefined>();
  const [opprettEllerEndre, settOpprettEllerEndre] = useState();
  const [visSlettModal, settVisSlettModal] = useState(false);
  const [norskEllerUtenlandsk, settNorskEllerUtenlandsk] = useState(
    props.adresser.tilleggsadresse
      ? "NORSK"
      : props.adresser.utenlandskAdresse
      ? "UTENLANDSK"
      : undefined
  );

  const visEndreOpprett = () => {
    settOpprettEllerEndre(true);
  };

  const apneSlettModal = () => {
    settVisSlettModal(true);
  };

  const lukkSlettModal = () => {
    settVisSlettModal(false);
  };

  const getUpdatedData = () =>
    fetchPersonInfo().then(personInfo => {
      dispatch({
        type: "SETT_PERSON_INFO_RESULT",
        payload: personInfo as PersonInfo
      });
    });

  const onSlettSuccess = () => {
    lukkSlettModal();
  };

  const slettAdresse = () => {
    settSlettLoading(true);

    if (utenlandskAdresse) {
      slettUtenlandsAdresse()
        .then(getUpdatedData)
        .then(onSlettSuccess)
        .catch((error: AlertType) => settSlettAlert(error))
        .then(() => settSlettLoading(false));
    }
    if (tilleggsadresse) {
      slettMidlertidigAdresse()
        .then(getUpdatedData)
        .then(onSlettSuccess)
        .catch((error: AlertType) => settSlettAlert(error))
        .then(() => settSlettLoading(false));
    }
  };
  return (
    <Box
      id="adresser"
      tittel="adresse.tittel"
      beskrivelse="adresse.beskrivelse"
      icon={adresseIkon}
    >
      <Folkeregisteret adresser={props.adresser} />
      <div className="adresse__box">
        <div className="underseksjon__header underseksjon__divider">
          <Undertittel>
            <FormattedMessage id={"adresse.midlertidigadresse"} />
          </Undertittel>
        </div>
        {opprettEllerEndre ? (
          <div className="adresse__form">
            <Radio
              name={NORSK}
              checked={norskEllerUtenlandsk === NORSK}
              label={intl.messages["felter.adressevalg.norsk"]}
              onChange={e => settNorskEllerUtenlandsk(e.target.name)}
            />
            <Radio
              name={UTENLANDSK}
              checked={norskEllerUtenlandsk === UTENLANDSK}
              label={intl.messages["felter.adressevalg.utenlandsk"]}
              onChange={e => settNorskEllerUtenlandsk(e.target.name)}
            />
            {norskEllerUtenlandsk === NORSK && (
              <OpprettEllerEndreNorskMidlertidigAdresse
                tilleggsadresse={props.adresser.tilleggsadresse}
                settOpprettEllerEndre={settOpprettEllerEndre}
              />
            )}
            {norskEllerUtenlandsk === UTENLANDSK && (
              <OpprettEllerEndreUtenlandskAdresse
                utenlandskadresse={props.adresser.utenlandskAdresse}
                settOpprettEllerEndre={settOpprettEllerEndre}
              />
            )}
            <Kilde kilde="personalia.source.nav" lenkeType={"INGEN"} />
          </div>
        ) : (
          <>
            {tilleggsadresse && (
              <MidlertidigNorskAdresse tilleggsadresse={tilleggsadresse} />
            )}
            {utenlandskAdresse && (
              <UtenlandskAdresse utenlandskadresse={utenlandskAdresse} />
            )}
            {!tilleggsadresse && !utenlandskAdresse && (
              <Normaltekst>
                <FormattedHTMLMessage id="adresse.midlertidigadresse.leggtil.beskrivelse" />
              </Normaltekst>
            )}
            <div className="adresse__endre-knapper">
              <button onClick={visEndreOpprett} className="kilde__lenke lenke">
                <span className="kilde__icon">
                  <img
                    src={harMidlertidigAdr ? endreIkon : leggTilIkon}
                    alt="Ekstern lenke"
                  />
                </span>
                <Normaltekst>
                  <FormattedHTMLMessage
                    id={harMidlertidigAdr ? "side.endre" : "side.leggtil"}
                  />
                </Normaltekst>
              </button>
              {(tilleggsadresse || utenlandskAdresse) && (
                <button onClick={apneSlettModal} className="kilde__lenke lenke">
                  <span className="kilde__icon">
                    <img src={slettIkon} alt="Ekstern lenke" />
                  </span>
                  <Normaltekst>
                    <FormattedHTMLMessage id={"side.slett"} />
                  </Normaltekst>
                </button>
              )}
              {visSlettModal && (
                <Modal
                  closeButton={false}
                  isOpen={visSlettModal}
                  onRequestClose={lukkSlettModal}
                  contentLabel={intl.messages["side.slett"]}
                >
                  <div style={{ padding: "2rem 2.5rem" }}>
                    <FormattedHTMLMessage id="adresse.slett.alert" />
                    <div className="adresse__modal-knapper">
                      <Fareknapp
                        onClick={slettAdresse}
                        spinner={slettLoading}
                        autoDisableVedSpinner={true}
                      >
                        <FormattedHTMLMessage id={"side.slett"} />
                      </Fareknapp>
                      <Flatknapp
                        onClick={lukkSlettModal}
                        disabled={slettLoading}
                      >
                        <FormattedMessage id="side.avbryt" />
                      </Flatknapp>
                    </div>
                    {slettAlert && <Alert {...slettAlert} />}
                  </div>
                </Modal>
              )}
            </div>
            <Kilde kilde="personalia.source.nav" lenkeType={"INGEN"} />
          </>
        )}
      </div>
    </Box>
  );
};

export default injectIntl(AdresserPDL);
