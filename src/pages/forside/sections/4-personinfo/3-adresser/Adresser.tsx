import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Adresser as IAdresser } from "types/adresser";
import Box from "components/box/Box";
import adresseIkon from "assets/img/Adresse.svg";
import Kilde from "components/kilde/Kilde";
import endreIkon from "assets/img/Pencil.svg";
import leggTilIkon from "assets/img/LeggTil.svg";
import slettIkon from "assets/img/Slett.svg";
import Folkeregisteret from "./folkeregisteret/Folkeregisteret";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import { Radio, RadioGruppe } from "nav-frontend-skjema";
import OpprettEllerEndreNorskAdresse from "./midlertidig-adresse/endring/NorskAdresse";
import OpprettEllerEndreUtenlandskAdresse from "./midlertidig-adresse/endring/UtenlandskAdresse";
import Modal from "nav-frontend-modal";
import { Fareknapp, Flatknapp } from "nav-frontend-knapper";
import Alert, { AlertType } from "components/alert/Alert";
import { slettKontaktadresse } from "clients/apiClient";
import { fetchPersonInfo } from "clients/apiClient";
import { PersonInfo } from "types/personInfo";
import { useStore } from "store/Context";
import driftsmeldinger from "driftsmeldinger";
import { AlertStripeAdvarsel } from "nav-frontend-alertstriper";
import Kontaktadresse from "./midlertidig-adresse/visning/Kontaktadresse";

interface Props {
  adresser: IAdresser;
}

const NORSK = "NORSK";
const UTENLANDSK = "UTENLANDSK";

const Adresser = (props: Props) => {
  const { formatMessage: msg } = useIntl();
  const [, dispatch] = useStore();
  const { adresser } = props;
  const { kontaktadresse } = adresser;
  const [slettLoading, settSlettLoading] = useState<boolean>();
  const [slettAlert, settSlettAlert] = useState<AlertType | undefined>();
  const [opprettEllerEndre, settOpprettEllerEndre] = useState<boolean>();
  const [visSlettModal, settVisSlettModal] = useState<boolean>(false);

  const [norskEllerUtenlandsk, settNorskEllerUtenlandsk] = useState(
    kontaktadresse?.type === "POSTADRESSE_I_FRITT_FORMAT" ||
      kontaktadresse?.type === "VEGADRESSE" ||
      kontaktadresse?.type === "POSTBOKSADRESSE"
      ? "NORSK"
      : kontaktadresse?.type === "UTENLANDSK_ADRESSE_I_FRITT_FORMAT" ||
        kontaktadresse?.type === "UTENLANDSK_ADRESSE"
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
    fetchPersonInfo().then((personInfo) => {
      dispatch({
        type: "SETT_PERSON_INFO_RESULT",
        payload: personInfo as PersonInfo,
      });
    });

  const onSlettSuccess = () => {
    lukkSlettModal();
  };

  const slettAdresse = () => {
    settSlettLoading(true);

    if (kontaktadresse) {
      slettKontaktadresse()
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
        {driftsmeldinger.pdl && (
          <div style={{ padding: "1rem 0" }}>
            <AlertStripeAdvarsel>{driftsmeldinger.pdl}</AlertStripeAdvarsel>
          </div>
        )}
        {opprettEllerEndre ? (
          <div className="adresse__form">
            <RadioGruppe>
              <Radio
                name={NORSK}
                checked={norskEllerUtenlandsk === NORSK}
                label={msg({ id: "felter.adressevalg.norsk" })}
                onChange={(e) => settNorskEllerUtenlandsk(e.target.name)}
              />
              <Radio
                name={UTENLANDSK}
                checked={norskEllerUtenlandsk === UTENLANDSK}
                label={msg({ id: "felter.adressevalg.utenlandsk" })}
                onChange={(e) => settNorskEllerUtenlandsk(e.target.name)}
              />
              {norskEllerUtenlandsk === NORSK && (
                <OpprettEllerEndreNorskAdresse
                  kontaktadresse={props.adresser.kontaktadresse!}
                  settOpprettEllerEndre={settOpprettEllerEndre}
                />
              )}
              {norskEllerUtenlandsk === UTENLANDSK && (
                <OpprettEllerEndreUtenlandskAdresse
                  kontaktadresse={props.adresser.kontaktadresse!}
                  settOpprettEllerEndre={settOpprettEllerEndre}
                />
              )}
            </RadioGruppe>
            <Kilde kilde="personalia.source.nav" lenkeType={"INGEN"} />
          </div>
        ) : (
          <>
            {kontaktadresse && (
              <Kontaktadresse kontaktadresse={kontaktadresse} />
            )}
            {!kontaktadresse && (
              <Normaltekst>
                <FormattedMessage
                  id="adresse.midlertidigadresse.leggtil.beskrivelse"
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
            )}
            <div className="adresse__endre-knapper">
              <button onClick={visEndreOpprett} className="kilde__lenke lenke">
                <span className="kilde__icon">
                  <img
                    src={kontaktadresse ? endreIkon : leggTilIkon}
                    alt="Ekstern lenke"
                  />
                </span>
                <Normaltekst>
                  <FormattedMessage
                    id={kontaktadresse ? "side.endre" : "side.leggtil"}
                  />
                </Normaltekst>
              </button>
              {kontaktadresse && (
                <button onClick={apneSlettModal} className="kilde__lenke lenke">
                  <span className="kilde__icon">
                    <img src={slettIkon} alt="Ekstern lenke" />
                  </span>
                  <Normaltekst>
                    <FormattedMessage id={"side.slett"} />
                  </Normaltekst>
                </button>
              )}
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
                        onClick={slettAdresse}
                        spinner={slettLoading}
                        autoDisableVedSpinner={true}
                      >
                        <FormattedMessage id={"side.slett"} />
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

export default Adresser;
