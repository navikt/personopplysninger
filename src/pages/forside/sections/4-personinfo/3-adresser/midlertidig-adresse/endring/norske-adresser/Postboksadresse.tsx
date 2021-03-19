import React, { useState } from "react";
import { Feiloppsummering, Input } from "nav-frontend-skjema";
import InputPostnummer from "components/felter/input-postnummer/InputPostnummer";
import DayPicker from "components/felter/day-picker/DayPicker";
import { Knapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";
import { FormContext, FormValidation, ValidatorContext } from "calidation";
import { fetchPersonInfo, postPostboksadresse } from "clients/apiClient";
import { PersonInfo } from "types/personInfo";
import { useStore } from "store/Context";
import { useIntl } from "react-intl";
import { RADIX_DECIMAL } from "utils/formattering";
import Alert, { AlertType } from "components/alert/Alert";
import InputMedHjelpetekst from "components/felter/input-med-hjelpetekst/InputMedHjelpetekst";
import { Postboksadresse } from "types/adresser/kontaktadresse";
import moment from "moment";
import { OptionType } from "types/option";
import SelectCO from "components/felter/select-co/SelectCO";
import { initialCoAdressenavn } from "components/felter/select-co/SelectCO";
import { initialCoType } from "components/felter/select-co/SelectCO";
import { UNKNOWN } from "utils/text";
import { mapErrorsToSummary } from "../../../../../../../../utils/kontonummer";

interface Props {
  postboksadresse?: Postboksadresse;
  settOpprettEllerEndre: (opprettEllerEndre: boolean) => void;
}

interface FormFields {
  coType?: OptionType;
  coAdressenavn?: string;
  postbokseier?: string;
  postboksnummer?: number;
  postboksanlegg?: string;
  postnummer?: string;
  gyldigTilOgMed?: string;
}

export interface OutboundPostboksadresse {
  coAdressenavn?: string;
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
  const [{ formKey }, dispatch] = useStore();

  // Finn postboksnummer
  // Eks "Postboks 12 Sørstranda" -> "12"
  const initialPostboksNummber = (postboks?: string) => {
    const postboksnummer = postboks?.replace(/(^.+\D)(\d+)(\D.+$)/i, "$2");
    return postboksnummer?.match(/^-{0,1}\d+$/)
      ? parseInt(postboksnummer, RADIX_DECIMAL)
      : undefined;
  };

  // Finn postboksanlegg
  // Eks "Postboks 12 Sørstranda" -> "Sørstranda"
  const initialPostboksAnlegg = (postboks?: string) =>
    postboks?.replace("Postboks ", "").replace(/^[\s\d]+/, "");

  const initialValues: FormFields = {
    coType: initialCoType(postboksadresse?.coAdressenavn),
    ...(postboksadresse && {
      ...postboksadresse,
      // Fjern coType
      ...(postboksadresse.coAdressenavn && {
        coAdressenavn: initialCoAdressenavn(postboksadresse.coAdressenavn),
      }),
      // Legg i respektive felter
      ...(postboksadresse.postboks && {
        postboksnummer: initialPostboksNummber(postboksadresse.postboks),
        postboksanlegg: initialPostboksAnlegg(postboksadresse.postboks),
      }),
      // Fjern tid, kun hent dato
      ...(postboksadresse.gyldigTilOgMed && {
        gyldigTilOgMed: postboksadresse.gyldigTilOgMed.split("T")[0],
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
      const {
        coType,
        coAdressenavn,
        postboksanlegg,
        postboksnummer,
        ...equalFields
      } = fields;

      const outbound: OutboundPostboksadresse = {
        ...equalFields,
        ...(coAdressenavn && {
          coAdressenavn:
            coType.value !== UNKNOWN
              ? `${coType.label} ${coAdressenavn}`
              : coAdressenavn,
        }),
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
      key={formKey}
      onSubmit={submit}
      config={formConfig}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, isValid, setField, setError, submit }) => {
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
            <Input
              id={"postbokseier"}
              bredde={"L"}
              maxLength={30}
              label={msg({ id: "felter.postbokseier.label" })}
              value={fields.postbokseier}
              className="adresse__input-avstand"
              feil={submitted && errors.postbokseier}
              onChange={(e) => setField({ postbokseier: e.target.value })}
            />
            <div className="adresse__rad">
              <Input
                id={"postboksnummer"}
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
                id={"postboksanlegg"}
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
                  id={"postnummer"}
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

export default OpprettEllerEndrePostboksadresse;
