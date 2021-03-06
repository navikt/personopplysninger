import { Element, Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import { Input } from "nav-frontend-skjema";
import React, { useState } from "react";
import { Fareknapp, Flatknapp, Knapp } from "nav-frontend-knapper";
import { FormContext, FormValidation, ValidatorContext } from "calidation";
import { fetchPersonInfo } from "clients/apiClient";
import { postTlfnummer, slettTlfnummer } from "clients/apiClient";
import endreIkon from "assets/img/Pencil.svg";
import slettIkon from "assets/img/Slett.svg";
import SelectLandskode from "components/felter/select-kodeverk/SelectLandskode";
import { formatTelefonnummer } from "utils/formattering";
import { PersonInfo } from "types/personInfo";
import { useStore } from "store/Context";
import { useIntl } from "react-intl";
import { isNorwegianNumber } from "utils/validators";
import Alert, { AlertType } from "components/alert/Alert";
import { UNKNOWN } from "utils/text";
import Modal from "nav-frontend-modal";

export interface OutboundTlfnummer {
  prioritet: 1 | 2;
  landskode?: string;
  nummer: string;
}

interface Props {
  prioritet: 1 | 2;
  titleId: string;
  hasTwoNumbers: boolean;
  onDeleteSuccess: () => void;
  onChangeSuccess: () => void;
  landskode?: string;
  tlfnummer?: string;
}

const EndreTelefonnummer = (props: Props) => {
  const { prioritet, titleId, landskode, tlfnummer, hasTwoNumbers } = props;
  const [visSlettModal, settVisSlettModal] = useState(false);
  const [endreLoading, settEndreLoading] = useState(false);
  const [slettLoading, settSlettLoading] = useState(false);
  const [endre, settEndre] = useState(false);
  const [alert, settAlert] = useState<AlertType | undefined>();
  const { formatMessage: msg } = useIntl();
  const [{ formKey }, dispatch] = useStore();

  const initialValues = {
    tlfnummer: tlfnummer,
    landskode: {
      label: UNKNOWN,
      value: landskode || "",
    },
  };

  const formConfig = {
    landskode: {
      isRequired: msg({ id: "validation.retningsnr.pakrevd" }),
    },
    tlfnummer: {
      isRequired: msg({ id: "validation.tlfnr.pakrevd" }),
      isNumber: msg({ id: "validation.tlfnr.siffer" }),
      isValidNorwegianNumber: {
        message: msg({ id: "validation.tlfnr.norske" }),
        validateIf: ({ fields }: ValidatorContext) =>
          isNorwegianNumber(fields.landskode),
      },
      isMaxLength: {
        message: msg({ id: "validation.tlfnr.makslengde" }),
        length: 16,
      },
    },
  };

  const apneSlettModal = () => {
    settVisSlettModal(true);
  };
  const lukkSlettModal = () => {
    settVisSlettModal(false);
  };

  const onChangeSuccess = () => {
    props.onChangeSuccess();
    settEndre(false);
  };

  const onDeleteSuccess = () => {
    props.onDeleteSuccess();
    settVisSlettModal(false);
  };

  const getUpdatedData = () =>
    fetchPersonInfo().then((personInfo) => {
      dispatch({
        type: "SETT_PERSON_INFO_RESULT",
        payload: personInfo as PersonInfo,
      });
    });

  const submitEndre = (e: FormContext) => {
    const { isValid, fields } = e;

    if (isValid) {
      const outbound = {
        prioritet,
        landskode: fields.landskode.value,
        nummer: fields.tlfnummer,
      };

      settEndreLoading(true);
      postTlfnummer(outbound)
        .then(getUpdatedData)
        .then(onChangeSuccess)
        .catch((error: AlertType) => settAlert(error))
        .then(() => settEndreLoading(false));
    }
  };

  const submitSlett = () => {
    if (!tlfnummer) {
      return;
    }

    const outbound = {
      prioritet,
      landskode: landskode,
      nummer: tlfnummer,
    };

    settSlettLoading(true);
    slettTlfnummer(outbound)
      .then(getUpdatedData)
      .then(onDeleteSuccess)
      .catch((error: AlertType) => {
        settSlettLoading(false);
        settAlert(error);
      });
  };

  return tlfnummer ? (
    <FormValidation
      key={formKey}
      config={formConfig}
      onSubmit={submitEndre}
      className={"tlfnummer__rad"}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, isValid, setField }) => {
        const tlfNummerMaxLength =
          fields.landskode && fields.landskode.value === "+47" ? 8 : 16;

        return (
          <>
            <div className={"tlfnummer__container"}>
              <div className={"tlfnummer__verdi"}>
                <Element>
                  <FormattedMessage
                    id={titleId}
                    values={{ x: hasTwoNumbers ? prioritet : `` }}
                  />
                </Element>
                {!endre && (
                  <Normaltekst>
                    {landskode && <span>{landskode} </span>}
                    {formatTelefonnummer(prioritet, tlfnummer, landskode)}
                  </Normaltekst>
                )}
              </div>
              {!endre && (
                <div className={"tlfnummer__knapper"}>
                  <Knapp
                    type={"flat"}
                    htmlType={"button"}
                    className={"tlfnummer__knapp-med-ikon"}
                    onClick={() => settEndre(!endre)}
                  >
                    <div className={"tlfnummer__knapp-ikon"}>
                      <img alt={"Endre telefonnummer"} src={endreIkon} />
                    </div>
                    <div className={"tlfnummer__knapp-tekst"}>
                      <FormattedMessage id={"side.endre"} />
                    </div>
                  </Knapp>
                  <Knapp
                    type={"flat"}
                    htmlType={"button"}
                    className={"tlfnummer__knapp-med-ikon"}
                    onClick={apneSlettModal}
                  >
                    <div className={"tlfnummer__knapp-ikon"}>
                      <img alt={"Slett telefonnummer"} src={slettIkon} />
                    </div>
                    <div className={"tlfnummer__knapp-tekst"}>
                      <FormattedMessage id={"side.slett"} />
                    </div>
                  </Knapp>
                </div>
              )}
            </div>
            {visSlettModal && (
              <Modal
                closeButton={false}
                isOpen={visSlettModal}
                onRequestClose={lukkSlettModal}
                contentLabel={msg({ id: "side.opphor" })}
              >
                <div style={{ padding: "2rem 2.5rem" }}>
                  <Normaltekst>
                    <FormattedMessage id="personalia.tlfnr.slett.alert" />
                  </Normaltekst>
                  <div className="adresse__modal-knapper">
                    <Fareknapp
                      onClick={submitSlett}
                      spinner={slettLoading}
                      autoDisableVedSpinner={true}
                    >
                      <FormattedMessage id={"side.slett"} />
                    </Fareknapp>
                    <Flatknapp onClick={lukkSlettModal} disabled={slettLoading}>
                      <FormattedMessage id="side.avbryt" />
                    </Flatknapp>
                  </div>
                  {alert && <Alert {...alert} />}
                </div>
              </Modal>
            )}
            {endre && (
              <div className={"tlfnummer__form"}>
                <div className={"tlfnummer__input-container"}>
                  <div className={"tlfnummer__input input--s"}>
                    <SelectLandskode
                      option={fields.landskode}
                      label={msg({ id: "felter.landkode.label" })}
                      onChange={(option) => setField({ landskode: option })}
                      error={errors.landskode}
                      submitted={submitted}
                    />
                  </div>
                  <div className={"tlfnummer__input input--m"}>
                    <Input
                      type={"tel"}
                      bredde={"M"}
                      value={fields.tlfnummer}
                      label={msg({ id: "felter.tlfnr.label" })}
                      onChange={(e) => setField({ tlfnummer: e.target.value })}
                      maxLength={tlfNummerMaxLength}
                      feil={submitted && errors.tlfnummer}
                    />
                  </div>
                </div>
                <div className={"tlfnummer__knapper"}>
                  <div className={"tlfnummer__submit"}>
                    <Knapp
                      type={"standard"}
                      htmlType={"submit"}
                      disabled={submitted && !isValid}
                      autoDisableVedSpinner={true}
                      spinner={endreLoading}
                    >
                      <FormattedMessage id={"side.lagre"} />
                    </Knapp>
                  </div>
                  <Knapp
                    type={"flat"}
                    htmlType={"button"}
                    className={"tlfnummer__knapp"}
                    onClick={() => {
                      settAlert(undefined);
                      settEndre(!endre);
                    }}
                  >
                    <FormattedMessage id={"side.avbryt"} />
                  </Knapp>
                </div>
              </div>
            )}
            {alert && <Alert {...alert} />}
          </>
        );
      }}
    </FormValidation>
  ) : null;
};

export default EndreTelefonnummer;
