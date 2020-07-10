import React, { useState } from "react";
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
import { Postboksadresse } from "types/adresser/kontaktadresse";
import moment from "moment";

interface Props {
  postboksadresse?: Postboksadresse;
  settOpprettEllerEndre: (opprettEllerEndre: boolean) => void;
}

interface FormFields {
  postbokseier?: string;
  postboksnummer?: number;
  postboksanlegg?: string;
  postnummer?: string;
  gyldigTilOgMed?: string;
}

export interface OutboundPostboksadresse {
  postbokseier?: string;
  postboks: string;
  postnummer: string;
  gyldigTilOgMed: string;
  gyldigFraOgMed: string;
}

const OpprettEllerEndrePostboksadresse = (props: Props) => {
  const { postboksadresse, settOpprettEllerEndre } = props;
  const [alert, settAlert] = useState<AlertType | undefined>();
  const [loading, settLoading] = useState<boolean>();
  const { formatMessage: msg } = useIntl();
  const [, dispatch] = useStore();

  const initialValues: FormFields = {
    ...(postboksadresse && {
      // Fjern tid, kun hent dato
      ...(postboksadresse.gyldigTilOgMed && {
        gyldigTilOgMed: postboksadresse.gyldigTilOgMed.split("T")[0],
      }),
    }),
  };

  const formConfig = {
    postbokseier: {
      isBlacklistedCommon: msg({ id: "validation.svarteliste.felles" }),
      isFirstCharNotSpace: msg({ id: "validation.firstchar.notspace" }),
    },
    postboksnummer: {
      isRequired: msg({ id: "validation.postboksnummer.pakrevd" }),
      isNumber: msg({ id: "validation.only.digits" }),
    },
    postboksanlegg: {
      isBlacklistedCommon: msg({ id: "validation.svarteliste.felles" }),
      isMinOneLetter: msg({ id: "validation.min.one.letter" }),
      isLettersSpaceAndDigits: msg({
        id: "validation.only.letters.space.and.digits",
      }),
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
      const { postboksanlegg, postboksnummer, ...equalFields } = fields;

      const outbound: OutboundPostboksadresse = {
        ...equalFields,
        postboks: `Postboks ${parseInt(postboksnummer, RADIX_DECIMAL)}${
          postboksanlegg ? ` ${postboksanlegg}` : ``
        }`,
        gyldigFraOgMed: moment().format("YYYY-MM-DD"),
      };

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
                value={fields.postboksnummer}
                className="adresse__input-avstand"
                feil={submitted && errors.postboksnummer}
                onChange={({ target }) => {
                  if (target.value.length <= 4) {
                    setField({
                      postboksnummer: parseInt(target.value, RADIX_DECIMAL),
                    });
                  }
                }}
              />
              <Input
                bredde={"M"}
                maxLength={30}
                value={fields.postboksanlegg}
                label={msg({ id: "felter.postboksanlegg.label" })}
                onChange={(e) => setField({ postboksanlegg: e.target.value })}
                className="adresse__input-avstand"
                feil={submitted && errors.postboksanlegg}
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
