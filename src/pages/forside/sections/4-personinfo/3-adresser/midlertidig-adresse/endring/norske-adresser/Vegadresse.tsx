import React, { useState } from "react";
import { Feiloppsummering, Input } from "nav-frontend-skjema";
import { Knapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";
import { FormContext, FormValidation, ValidatorContext } from "calidation";
import DayPicker from "components/felter/day-picker/DayPicker";
import { fetchPersonInfo, postVegadresse } from "clients/apiClient";
import { RADIX_DECIMAL } from "utils/formattering";
import InputPostnummer from "components/felter/input-postnummer/InputPostnummer";
import InputMedHjelpetekst from "components/felter/input-med-hjelpetekst/InputMedHjelpetekst";
import { PersonInfo } from "types/personInfo";
import { useStore } from "store/Context";
import { useIntl } from "react-intl";
import moment from "moment";
import Alert, { AlertType } from "components/alert/Alert";
import { Vegadresse } from "types/adresser/kontaktadresse";
import SelectCO from "components/felter/select-co/SelectCO";
import { initialCoAdressenavn } from "components/felter/select-co/SelectCO";
import { initialCoType } from "components/felter/select-co/SelectCO";
import { OptionType } from "types/option";
import { UNKNOWN } from "utils/text";
import { mapErrorsToSummary } from "utils/kontonummer";

interface Props {
  vegadresse: Vegadresse;
  settOpprettEllerEndre: (opprettEllerEndre: boolean) => void;
}

interface FormFields {
  coType?: OptionType;
  coAdressenavn?: string;
  adressenavn?: string;
  husnummer?: string;
  husbokstav?: string;
  postnummer?: string;
  poststed?: string;
  bruksenhetsnummer?: string;
  kommunenummer?: string;
  tilleggsnavn?: string;
  gyldigTilOgMed?: string;
}

export interface OutboundNorskVegadresse {
  coAdressenavn?: string;
  adressenavn?: string;
  husnummer?: string;
  husbokstav?: string;
  postnummer?: string;
  poststed?: string;
  bruksenhetsnummer?: string;
  kommunenummer?: string;
  tilleggsnavn?: string;
  gyldigTilOgMed?: string;
  gyldigFraOgMed?: string;
}

const OpprettEllerEndreVegadresse = (props: Props) => {
  const { vegadresse, settOpprettEllerEndre } = props;
  const [alert, settAlert] = useState<AlertType | undefined>();
  const [loading, settLoading] = useState<boolean>();
  const { formatMessage: msg } = useIntl();
  const [{ formKey }, dispatch] = useStore();

  const initialValues: FormFields = {
    coType: initialCoType(vegadresse?.coAdressenavn),
    ...(vegadresse && {
      ...vegadresse,
      // Fjern coType
      ...(vegadresse.coAdressenavn && {
        coAdressenavn: initialCoAdressenavn(vegadresse.coAdressenavn),
      }),
      // Fjern tid, kun hent dato
      ...(vegadresse.gyldigTilOgMed && {
        gyldigTilOgMed: vegadresse.gyldigTilOgMed.split("T")[0],
      }),
      // Fjern nuller foran f.eks husnummer 002
      ...(vegadresse.husnummer && {
        husnummer: parseInt(vegadresse.husnummer, RADIX_DECIMAL).toString(),
      }),
    }),
  };

  const formConfig = {
    coType: {},
    coAdressenavn: {
      isRequired: {
        message: msg({ id: "validation.coadressenavn.pakrevd" }),
        validateIf: ({ fields }: ValidatorContext) =>
          fields.coType?.value !== UNKNOWN,
      },
      isBlacklistedCommon: msg({ id: "validation.svarteliste.felles" }),
      isFirstCharNotSpace: msg({ id: "validation.firstchar.notspace" }),
    },
    adressenavn: {
      isRequired: msg({ id: "validation.gatenavn.pakrevd" }),
      isBlacklistedCommon: msg({ id: "validation.svarteliste.felles" }),
      isFirstCharNotSpace: msg({ id: "validation.firstchar.notspace" }),
      isValidStreetName: msg({ id: "validation.gatenavn.valid" }),
    },
    husnummer: {
      isNumber: msg({ id: "validation.only.digits" }),
      isPositive: msg({ id: "validation.husnummer.positive" }),
    },
    husbokstav: {
      isBlacklistedCommon: msg({ id: "validation.svarteliste.felles" }),
      isLetters: msg({ id: "validation.only.letters" }),
    },
    bruksenhetsnummer: {
      isBlacklistedCommon: msg({ id: "validation.svarteliste.felles" }),
      isHouseNumber: msg({ id: "validation.bolignummer.ugyldig" }),
    },
    postnummer: {
      isRequired: msg({ id: "validation.postnummer.pakrevd" }),
      isNumber: msg({ id: "validation.only.digits" }),
    },
    tilleggsnavn: {
      isBlacklistedCommon: msg({ id: "validation.svarteliste.felles" }),
      isFirstCharNotSpace: msg({ id: "validation.firstchar.notspace" }),
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
      const { coAdressenavn, coType, husnummer, ...equalFields } = fields;

      const outbound = {
        ...equalFields,
        ...(coAdressenavn && {
          coAdressenavn:
            coType.value !== UNKNOWN
              ? `${coType.label} ${coAdressenavn}`
              : coAdressenavn,
        }),
        husnummer: husnummer.toString(),
        gyldigFraOgMed: moment().format("YYYY-MM-DD"),
      } as OutboundNorskVegadresse;

      settLoading(true);
      postVegadresse(outbound)
        .then(getUpdatedData)
        .then(onSuccess)
        .catch((error: AlertType) => settAlert(error))
        .then(() => settLoading(false));
    }
  };

  return (
    <FormValidation
      key={formKey}
      onSubmit={submit}
      config={formConfig}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, isValid, setField, setError }) => {
        const hasErrors = Object.values(errors).find((error) => error);
        return (
          <>
            <div className="adresse__rad">
              <SelectCO
                id={"coType"}
                submitted={submitted}
                option={fields.coType}
                label={msg({ id: "felter.tilleggslinje.label" })}
                error={submitted && errors.coType ? errors.coType : null}
                hjelpetekst={"adresse.hjelpetekster.co"}
                onChange={(value) => setField({ coType: value })}
              />
              <div className="adresse__without-label">
                <InputMedHjelpetekst
                  id={"coAdressenavn"}
                  bredde={"XL"}
                  maxLength={26}
                  submitted={submitted}
                  placeholder={msg({ id: "felter.tilleggslinje.placeholder" })}
                  onChange={(value) => setField({ coAdressenavn: value })}
                  value={fields.coAdressenavn}
                  error={errors.coAdressenavn}
                />
              </div>
            </div>
            <div className="adresse__rad">
              <div className="adresse__kolonne">
                <Input
                  id={"adressenavn"}
                  bredde={"XXL"}
                  maxLength={30}
                  value={fields.adressenavn}
                  label={msg({ id: "felter.gatenavn.label" })}
                  onChange={(e) => setField({ adressenavn: e.target.value })}
                  feil={submitted && errors.adressenavn}
                />
              </div>
              <div className="adresse__kolonne">
                <div className="adresse__rad">
                  <Input
                    id={"husnummer"}
                    min={1}
                    bredde={"XS"}
                    type={"number"}
                    label={msg({ id: "felter.gatenummer.label" })}
                    value={fields.husnummer || ""}
                    className="adresse__input-avstand"
                    feil={submitted && errors.husnummer}
                    onChange={({ target }) => {
                      if (target.value.length <= 6) {
                        setField({ husnummer: target.value });
                      }
                    }}
                  />
                  <Input
                    id={"husbokstav"}
                    bredde={"XS"}
                    maxLength={1}
                    value={fields.husbokstav}
                    className="adresse__input-avstand"
                    label={msg({ id: "felter.gatebokstav.label" })}
                    feil={submitted && errors.husbokstav}
                    onChange={({ target }) => {
                      if (target.value !== " ") {
                        setField({ husbokstav: target.value.toUpperCase() });
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="adresse__rad">
              <InputMedHjelpetekst
                id={"bruksenhetsnummer"}
                maxLength={5}
                submitted={submitted}
                value={fields.bruksenhetsnummer}
                hjelpetekst={"adresse.hjelpetekster.bolignummer"}
                className="adresse__input-avstand adresse__input-bolignummer"
                label={msg({ id: "felter.bolignummer.label" })}
                onChange={(value) => setField({ bruksenhetsnummer: value })}
                error={errors.bruksenhetsnummer}
                bredde={"S"}
              />
              <InputPostnummer
                id={"postnummer"}
                submitted={submitted}
                value={fields.postnummer}
                error={errors.postnummer}
                label={msg({ id: "felter.postnummer.label" })}
                onChange={(postnummer) => setField({ postnummer })}
                onErrors={(error) => setError({ ...errors, postnummer: error })}
              />
            </div>
            <InputMedHjelpetekst
              id={"tilleggsnavn"}
              submitted={submitted}
              value={fields.tilleggsnavn}
              hjelpetekst={"adresse.hjelpetekster.tilleggsnavn"}
              className="adresse__input-avstand"
              label={msg({ id: "felter.tilleggsnavn.label" })}
              onChange={(value) => setField({ tilleggsnavn: value })}
              error={errors.tilleggsnavn}
              bredde={"L"}
            />
            <div className="adresse__rad">
              <div className="adresse__kolonne">
                <DayPicker
                  id={"gyldigTilOgMed"}
                  submitted={submitted}
                  value={fields.gyldigTilOgMed}
                  error={errors.gyldigTilOgMed}
                  label={msg({ id: "felter.gyldigtom.label" })}
                  onChange={(value) => setField({ gyldigTilOgMed: value })}
                  onErrors={(error) =>
                    setError({ ...errors, gyldigTilOgMed: error })
                  }
                />
              </div>
              <div className="adresse__kolonne" />
            </div>
            {submitted && hasErrors && (
              <Feiloppsummering
                tittel={msg({ id: "validation.fix.errors" })}
                feil={mapErrorsToSummary(errors)}
              />
            )}
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

export default OpprettEllerEndreVegadresse;
