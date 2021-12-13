import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Adresser as IAdresser } from "types/adresser";
import Box from "components/box/Box";
import adresseIkon from "assets/img/Adresse.svg";
import Kilde from "components/kilde/Kilde";
import slettIkon from "assets/img/Slett.svg";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import Modal from "nav-frontend-modal";
import { Fareknapp, Flatknapp } from "nav-frontend-knapper";
import Alert, { AlertType } from "components/alert/Alert";
import { slettKontaktadresse } from "clients/apiClient";
import { fetchPersonInfo } from "clients/apiClient";
import { PersonInfo } from "types/personInfo";
import { useStore } from "store/Context";
import driftsmeldinger from "driftsmeldinger";
import { AlertStripeAdvarsel, AlertStripeInfo } from "nav-frontend-alertstriper";
import Kontaktadresse from "./midlertidig-adresse/visning/Kontaktadresse";
import moment from "moment";
import eksternLenkeIkon from "../../../../../assets/img/Link.svg";
import Folkeregisteret from "./midlertidig-adresse/visning/Folkeregisteret";

interface Props {
  adresser: IAdresser;
}

const Adresser = (props: Props) => {
  const [{ locale }] = useStore();
  const { formatMessage: msg } = useIntl();
  const [, dispatch] = useStore();
  const { adresser } = props;
  const { kontaktadresse, bostedsadresse, deltBosted, oppholdsadresse } = adresser;
  const [slettLoading, settSlettLoading] = useState<boolean>();
  const [slettAlert, settSlettAlert] = useState<AlertType | undefined>();
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
      visAnkerlenke={true}
    >
      <div className="adresse__box">
        {driftsmeldinger.pdl && (
            <div style={{ padding: "1rem 0" }}>
              <AlertStripeAdvarsel>{driftsmeldinger.pdl}</AlertStripeAdvarsel>
            </div>
        )}
        <Folkeregisteret bostedsadresse={bostedsadresse} deltBosted={deltBosted} oppholdsadresse={oppholdsadresse} />
        <div className="underseksjon__header underseksjon__divider">
          <Undertittel>
            <FormattedMessage id={"adresse.midlertidigadresse"} />
          </Undertittel>
        </div>
        {kontaktadresse?.kilde === "freg" && (
          <>
            {kontaktadresse && (
                <div>
                  <Kontaktadresse kontaktadresse={kontaktadresse} />
                  <AlertStripeInfo>
                    <FormattedMessage
                        id="adresse.midlertidig.alert"
                        values={{ dato: moment(kontaktadresse.gyldigTilOgMed).format("LL") }}
                    />
                  <div className={"adresse__divider"} />
                  </AlertStripeInfo>
                </div>
            )}
            <Kilde
              kilde="personalia.source.folkeregisteret"
              lenke={
                locale === "en"
                  ? "https://www.skatteetaten.no/en/person/national-registry/moving/changed-postal-address/"
                  : "https://www.skatteetaten.no/person/folkeregister/flytte/endre-postadresse/"
              }
              lenkeTekst="personalia.link.folkeregisteret"
              lenkeType={"EKSTERN"}
              ikon={eksternLenkeIkon}
            />
          </>
        )}
        {kontaktadresse?.kilde === "pdl" && (
          <>
            {kontaktadresse && (
                <div>
                  <Kontaktadresse kontaktadresse={kontaktadresse} />
                  <div className={"adresse__divider"} />
                  <AlertStripeInfo>
                    <FormattedMessage
                        id="adresse.midlertidig.alert"
                        values={{ dato: moment(kontaktadresse.gyldigTilOgMed).format("LL") }}
                    />
                  </AlertStripeInfo>
                </div>            )}
            <button onClick={apneSlettModal} className="kilde__lenke lenke">
                  <span className="kilde__icon">
                    <img src={slettIkon} alt="Ekstern lenke" />
                  </span>
              <Normaltekst>
                <FormattedMessage id={"side.slett.midlertidig.adresse"} />
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
           </>
        )}
        {kontaktadresse === null && (
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
            <Kilde
              kilde="personalia.source.folkeregisteret"
              lenke={
                locale === "en"
                  ? "https://www.skatteetaten.no/en/person/national-registry/moving/changed-postal-address/"
                  : "https://www.skatteetaten.no/person/folkeregister/flytte/endre-postadresse/"
              }
              lenkeTekst="adresse.midlertidigadresse.leggtil.folkeregisteret"
              lenkeType={"EKSTERN"}
              ikon={eksternLenkeIkon}
            />
          </Normaltekst>
        )
        }
      </div>
    </Box>
  );
};

export default Adresser;
