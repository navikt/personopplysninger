import React, { useState } from "react";
import { Tilleggsadresse } from "types/adresser/tilleggsadresse";
import { Input } from "nav-frontend-skjema";
import InputPostnummer from "components/felter/input-postnummer/InputPostnummer";
import DayPicker from "components/felter/day-picker/DayPicker";
import { Knapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";
import { FormContext, FormValidation } from "calidation";
import { fetchPersonInfo, postPostboksadresse } from "clients/apiClient";
import { PersonInfo } from "types/personInfo";
import { useStore } from "store/Context";
import { useIntl } from "react-intl";
import { RADIX_DECIMAL } from "utils/formattering";
import Alert, { AlertType } from "components/alert/Alert";
import InputMedHjelpetekst from "components/felter/input-med-hjelpetekst/InputMedHjelpetekst";
import moment from "moment";

interface Props {
  tilleggsadresse?: Tilleggsadresse;
  settOpprettEllerEndre: (opprettEllerEndre: boolean) => void;
}

interface FormFields {
  postbokseier?: string;
  postboks?: string;
  postnummer?: string;
  gyldigTilOgMed?: string;
}

export interface OutboundPostboksadresse {
  postbokseier?: string;
  postboks: number;
  postnummer: string;
  gyldigTilOgMed: string;
  gyldigFraOgMed: string;
}

const OpprettEllerEndrePostboksadresse = (props: Props) => {
  const { tilleggsadresse, settOpprettEllerEndre } = props;
  const [alert, settAlert] = useState<AlertType | undefined>();
  const [loading, settLoading] = useState<boolean>();
  const { formatMessage: msg } = useIntl();
  const [, dispatch] = useStore();

  const initialValues: FormFields = {
    ...(tilleggsadresse && {
      // Fjern nuller foran f.eks postnr 0024
      ...(tilleggsadresse.postboksnummer && {
        postboks: parseInt(
          tilleggsadresse.postboksnummer,
          RADIX_DECIMAL
        ).toString(),
      }),
    }),
  };

  const formConfig = {
    postbokseier: {
      isBlacklistedCommon: msg({ id: "validation.svarteliste.felles" }),
      isFirstCharNotSpace: msg({ id: "validation.firstchar.notspace" }),
    },
    postboks: {
      isRequired: msg({ id: "validation.postboksnummer.pakrevd" }),
      isNumber: msg({ id: "validation.only.digits" }),
    },
    postnummer: {
      isRequired: msg({ id: "validation.postnummer.pakrevd" }),
      isNumber: msg({ id: "validation.only.digits" }),
    },
    gyldigTilOgMed: {
      isRequired: msg({ id: "validation.tomdato.pakrevd" }),
    },
  };

  const getUpdatedData = () =>
    fetchPersonInfo().then((personInfo) => {
      dispatch({
        type: "SETT_PERSON_INFO_RESULT",
        payload: personInfo as PersonInfo,
      });
    });

  const onSuccess = () => {
    settOpprettEllerEndre(false);
  };

  const submit = (c: FormContext) => {
    const { isValid, fields } = c;
    if (isValid) {
      const { datoTilOgMed, postboks, tilleggslinje, ...equalFields } = fields;

      const outbound = {
        ...equalFields,
        postboks: parseInt(postboks, RADIX_DECIMAL).toString(),
        gyldigFraOgMed: moment().format("YYYY-MM-DD"),
      } as OutboundPostboksadresse;

      settLoading(true);
      postPostboksadresse(outbound)
        .then(getUpdatedData)
        .then(onSuccess)
        .catch((error: AlertType) => settAlert(error))
        .then(() => settLoading(false));
    }
  };

  return (
    <FormValidation
      onSubmit={submit}
      config={formConfig}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, isValid, setField, setError }) => {
        return (
          <>
            <InputMedHjelpetekst
              bredde={"L"}
              maxLength={26}
              submitted={submitted}
              hjelpetekst={"adresse.hjelpetekster.co"}
              label={msg({ id: "felter.tilleggslinje.label" })}
              placeholder={msg({ id: "felter.tilleggslinje.placeholder" })}
              onChange={(value) => setField({ postbokseier: value })}
              value={fields.postbokseier}
              error={errors.postbokseier}
            />
            <div className="adresse__rad">
              <Input
                min={1}
                bredde={"S"}
                type={"number"}
                label={msg({ id: "felter.postboksnummer.label" })}
                value={fields.postboks}
                className="adresse__input-avstand"
                feil={submitted && errors.postboks}
                onChange={({ target }) => {
                  if (target.value.length <= 4) {
                    setField({ postboks: target.value });
                  }
                }}
              />
            </div>
            <div className="adresse__rad">
              <div className="adresse__kolonne">
                <InputPostnummer
                  submitted={submitted}
                  value={fields.postnummer}
                  error={errors.postnummer}
                  label={msg({ id: "felter.postnummer.label" })}
                  onChange={(postnummer) => setField({ postnummer })}
                  onErrors={(error) =>
                    setError({ ...errors, postnummer: error })
                  }
                />
              </div>
              <div className="adresse__kolonne" />
            </div>
            <div className="adresse__rad">
              <div className="adresse__kolonne">
                <DayPicker
                  submitted={submitted}
                  value={fields.gyldigTilOgMed}
                  error={errors.gyldigTilOgMed}
                  label={msg({ id: "felter.gyldigtom.label" })}
                  ugyldigTekst={msg({ id: "validation.tomdato.ugyldig" })}
                  onChange={(value) => setField({ gyldigTilOgMed: value })}
                  onErrors={(error) =>
                    setError({ ...errors, gyldigTilOgMed: error })
                  }
                />
              </div>
              <div className="adresse__kolonne" />
            </div>
            <div className="adresse__form-knapper">
              <div className="adresse__knapp">
                <Knapp
                  type={"standard"}
                  htmlType={"submit"}
                  disabled={submitted && !isValid}
                  autoDisableVedSpinner={true}
                  spinner={loading}
                >
                  <FormattedMessage id={"side.lagre"} />
                </Knapp>
              </div>
              <div className="adresse__knapp">
                <Knapp
                  type={"flat"}
                  htmlType={"button"}
                  disabled={loading}
                  onClick={() => settOpprettEllerEndre(false)}
                >
                  <FormattedMessage id={"side.avbryt"} />
                </Knapp>
              </div>
            </div>
            {alert && <Alert {...alert} />}
          </>
        );
      }}
    </FormValidation>
  );
};

export default OpprettEllerEndrePostboksadresse;
