import { FormattedMessage } from "react-intl";
import React, { useState } from "react";
import {
  FieldsConfig,
  FormContext,
  FormValidation,
  ValidatorContext,
} from "calidation";
import { fetchPersonInfo, postTlfnummer } from "clients/apiClient";
import SelectLandskode from "components/felter/select-kodeverk/SelectLandskode";
import { isNorwegianNumber } from "utils/validators";
import { PersonInfo } from "types/personInfo";
import { useStore } from "store/Context";
import { useIntl } from "react-intl";
import HttpFeilmelding, {
  Feilmelding,
} from "components/httpFeilmelding/HttpFeilmelding";
import { Tlfnr } from "../../../../../../../types/personalia";
import { Button, Label, TextField } from "@navikt/ds-react";
import classNames from "classnames";

interface Props {
  prioritet: 1 | 2;
  onCancelClick: () => void;
  onChangeSuccess: () => void;
  tlfnr?: Tlfnr;
}

const OpprettTelefonnummer = (props: Props) => {
  const { formatMessage: msg } = useIntl();
  const [loading, settLoading] = useState(false);
  const [alert, settAlert] = useState<Feilmelding | undefined>();
  const { prioritet, tlfnr, onChangeSuccess } = props;
  const [{ formKey }, dispatch] = useStore();

  const initialValues = {
    landskode: {
      label: "Norge",
      value: "+47",
    },
    tlfnummer: "",
  };

  const formConfig = {
    landskode: {
      isRequired: msg({ id: "validation.retningsnr.pakrevd" }),
    },
    tlfnummer: {
      isRequired: msg({ id: "validation.tlfnr.pakrevd" }),
      isNumber: msg({ id: "validation.tlfnr.siffer" }),
      ...(tlfnr &&
        (tlfnr.telefonHoved || tlfnr.telefonAlternativ) && {
          isBlacklisted: {
            message: msg({ id: "validation.tlfnr.eksisterer" }),
            blacklist: [tlfnr.telefonHoved, tlfnr.telefonAlternativ],
          },
        }),
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

  const getUpdatedData = () =>
    fetchPersonInfo().then((personInfo) => {
      dispatch({
        type: "SETT_PERSON_INFO_RESULT",
        payload: personInfo as PersonInfo,
      });
    });

  const submit = (e: FormContext) => {
    const { isValid, fields } = e;
    const { landskode, tlfnummer } = fields;

    if (isValid) {
      const outbound = {
        prioritet,
        landskode: landskode.value,
        nummer: tlfnummer,
      };

      settLoading(true);
      postTlfnummer(outbound)
        .then(getUpdatedData)
        .then(onChangeSuccess)
        .catch((error: Feilmelding) => settAlert(error))
        .then(() => settLoading(false));
    }
  };

  return (
    <>
      <FormValidation
        key={formKey}
        onSubmit={submit}
        config={formConfig as FieldsConfig}
        initialValues={initialValues}
        className={"tlfnummer__rad-leggtil"}
      >
        {({ errors, fields, submitted, isValid, setField }) => {
          const tlfNummerMaxLength =
            fields.landskode && fields.landskode.value === "+47" ? 8 : 16;

          return (
            <>
              <div className={"tlfnummer__container"}>
                <div className={"tlfnummer__verdi"}>
                  <Label as="p">
                    <FormattedMessage id="side.leggtil" />
                  </Label>
                </div>
              </div>
              <div className="tlfnummer__form">
                <div className={"tlfnummer__input-container"}>
                  <div
                    className={classNames(
                      "tlfnummer__input",
                      "tlfnummer__inputLandkode"
                    )}
                  >
                    <SelectLandskode
                      option={fields.landskode}
                      label={msg({ id: "felter.landkode.label" })}
                      onChange={(option) => setField({ landskode: option })}
                      error={errors.landskode}
                      submitted={submitted}
                    />
                  </div>
                  <div className={"tlfnummer__input input--m"}>
                    <TextField
                      type={"tel"}
                      size={"medium"}
                      value={fields.tlfnummer}
                      maxLength={tlfNummerMaxLength}
                      label={msg({ id: "felter.tlfnr.label" })}
                      onChange={(e) => setField({ tlfnummer: e.target.value })}
                      error={submitted && errors.tlfnummer}
                    />
                  </div>
                </div>
                <div className={"tlfnummer__knapper"}>
                  <div className={"tlfnummer__submit"}>
                    <Button
                      variant={"primary"}
                      type={"submit"}
                      disabled={submitted && !isValid}
                      loading={loading}
                    >
                      <FormattedMessage id={"side.lagre"} />
                    </Button>
                  </div>
                  <Button
                    variant={"tertiary"}
                    type={"button"}
                    disabled={loading}
                    className={"tlfnummer__knapp"}
                    onClick={() => {
                      settAlert(undefined);
                      props.onCancelClick();
                    }}
                  >
                    <FormattedMessage id={"side.avbryt"} />
                  </Button>
                </div>
                {alert && <HttpFeilmelding {...alert} />}
              </div>
            </>
          );
        }}
      </FormValidation>
    </>
  );
};

export default OpprettTelefonnummer;
