import React, { useState } from "react";
import Kilde from "components/kilde/Kilde";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import { FormattedMessage, useIntl } from "react-intl";
import { Kontaktadresse as IKontaktadresse } from "../../../../../../../types/adresser/kontaktadresse";
import Kontaktadresse from "./Kontaktadresse";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import moment from "moment";
import eksternLenkeIkon from "../../../../../../../assets/img/Link.svg";
import slettIkon from "../../../../../../../assets/img/Slett.svg";
import Modal from "nav-frontend-modal";
import { Fareknapp, Flatknapp } from "nav-frontend-knapper";
import Alert, { AlertType } from "../../../../../../../components/alert/Alert";
import { fetchPersonInfo, slettKontaktadresse } from "../../../../../../../clients/apiClient";
import { PersonInfo } from "../../../../../../../types/personInfo";
import { useStore } from "../../../../../../../store/Context";

interface Props {
  kontaktadresser: IKontaktadresse[];
}

const Kontaktadresser = (props: Props) => {
  const [{ locale }] = useStore();
  const { formatMessage: msg } = useIntl();
  const { kontaktadresser } = props;
  const kontaktadresse = kontaktadresser[0];

  const [, dispatch] = useStore();
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

  const slettPdlKontaktadresse = () => {
    settSlettLoading(true);

    slettKontaktadresse()
      .then(getUpdatedData)
      .then(onSlettSuccess)
      .catch((error: AlertType) => settSlettAlert(error))
      .then(() => settSlettLoading(false));
  };

  return <>
    <div className="underseksjon__header underseksjon__divider">
        <Undertittel>
            <FormattedMessage id={"adresse.kontaktadresse"}/>
        </Undertittel>
    </div>
    {
        kontaktadresse?.kilde === "freg" && (
            <>
                {kontaktadresse && (
                    <div>
                        <Kontaktadresse kontaktadresse={kontaktadresse}/>
                        <AlertStripeInfo>
                            <FormattedMessage
                                id="adresse.kontaktadresse.alert"
                                values={{dato: moment(kontaktadresse.gyldigTilOgMed).format("LL")}}
                            />
                            <div className={"adresse__divider"}/>
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
                    lenkeTekst="personalia.link.folkeregisteret.adresse"
                    lenkeType={"EKSTERN"}
                    ikon={eksternLenkeIkon}
                />
            </>
        )
    }
    {
        kontaktadresse?.kilde === "pdl" && (
            <>
                {kontaktadresse && (
                    <div>
                        <Kontaktadresse kontaktadresse={kontaktadresse}/>
                        <div className={"adresse__divider"}/>
                        <AlertStripeInfo>
                            <FormattedMessage
                                id="adresse.kontaktadresse.alert"
                                values={{dato: moment(kontaktadresse.gyldigTilOgMed).format("LL")}}
                            />
                        </AlertStripeInfo>
                    </div>)}
                <button onClick={apneSlettModal} className="kilde__lenke lenke">
                  <span className="kilde__icon">
                    <img src={slettIkon} alt="Ekstern lenke"/>
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
            { <Kilde kilde="personalia.source.nav" lenkeType={"INGEN"} />}
        </>
    )}
    {kontaktadresse === null && (
        <Normaltekst>
            <FormattedMessage
                id="adresse.kontaktadresse.leggtil.beskrivelse"
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
                lenkeTekst="adresse.kontaktadresse.leggtil.folkeregisteret"
                lenkeType={"EKSTERN"}
                ikon={eksternLenkeIkon}
            />
        </Normaltekst>
    )
    }
    </>;
};

export default Kontaktadresser;
