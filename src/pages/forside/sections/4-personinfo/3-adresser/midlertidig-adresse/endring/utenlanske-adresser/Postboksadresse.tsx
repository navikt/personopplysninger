import React, { useState } from "react";
import { Knapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";
import { FormContext, FormValidation, ValidatorContext } from "calidation";
import InputMedHjelpetekst from "components/felter/input-med-hjelpetekst/InputMedHjelpetekst";
import SelectLand from "components/felter/select-kodeverk/SelectLand";
import DayPicker from "components/felter/day-picker/DayPicker";
import { fetchPersonInfo, postUtenlandskAdresse } from "clients/apiClient";
import { UNKNOWN } from "utils/text";
import { PersonInfo } from "types/personInfo";
import { useStore } from "store/Context";
import { useIntl } from "react-intl";
import Alert, { AlertType } from "components/alert/Alert";
import { UtenlandskAdresse } from "types/adresser/kontaktadresse";
import moment from "moment";
import { OptionType } from "types/option";
import { Input } from "nav-frontend-skjema";
import SelectCO from "components/felter/select-co/SelectCO";
import { initialCoAdressenavn } from "components/felter/select-co/SelectCO";
import { initialCoType } from "components/felter/select-co/SelectCO";

interface Props {
  utenlandskPostboksadresse?: UtenlandskAdresse;
  settOpprettEllerEndre: (opprettEllerEndre: boolean) => void;
}

interface FormFields {
  coType?: OptionType;
  coAdressenavn?: string;
  postboksNummerNavn?: string;
  regionDistriktOmraade?: string;
  postkode?: string;
  bySted?: string;
  land?: OptionType;
  gyldigFraOgMed?: string;
  gyldigTilOgMed?: string;
}

export interface OutboundUtenlandskPostboksadresse {
  coAdressenavn?: string;
  postboksNummerNavn?: string;
  regionDistriktOmraade?: string;
  postkode?: string;
  bySted?: string;
  landkode: string;
  gyldigFraOgMed: string;
  gyldigTilOgMed: string;
}

const OpprettEllerEndreUtenlandskVegadresse = (props: Props) => {
  const { utenlandskPostboksadresse, settOpprettEllerEndre } = props;
  const [alert, settAlert] = useState<AlertType | undefined>();
  const [loading, settLoading] = useState<boolean>();
  const [, dispatch] = useStore();
  const { formatMessage: msg } = useIntl();

  // Finn postboksanlegg
  // Eks "Postboks 12 Sørstranda" -> "Sørstranda"
  const initialPostboksNummerNavn = (postboks?: string) =>
    postboks?.replace("PO BOX ", "");

  const initialValues: FormFields = {
    coType: initialCoType(utenlandskPostboksadresse?.coAdressenavn),
    ...(utenlandskPostboksadresse && {
      ...utenlandskPostboksadresse,
      coAdressenavn: initialCoAdressenavn(
        utenlandskPostboksadresse.coAdressenavn
      ),
      postboksNummerNavn: initialPostboksNummerNavn(
        utenlandskPostboksadresse.postboksNummerNavn
      ),
      // Fjern tid, kun hent dato
      ...(utenlandskPostboksadresse.gyldigTilOgMed && {
        gyldigTilOgMed: utenlandskPostboksadresse.gyldigTilOgMed.split("T")[0],
      }),
      land: {
        label: utenlandskPostboksadresse.land || "",
        value: utenlandskPostboksadresse.landkode || UNKNOWN,
      },
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
    postboksNummerNavn: {
      isRequired: msg({ id: "validation.postboks.pakrevd" }),
      isBlacklistedCommon: msg({ id: "validation.svarteliste.felles" }),
      isFirstCharNotSpace: msg({ id: "validation.firstchar.notspace" }),
    },
    regionDistriktOmraade: {
      isBlacklistedCommon: msg({ id: "validation.svarteliste.felles" }),
      isFirstCharNotSpace: msg({ id: "validation.firstchar.notspace" }),
    },
    postkode: {
      isBlacklistedCommon: msg({ id: "validation.svarteliste.felles" }),
      isFirstCharNotSpace: msg({ id: "validation.firstchar.notspace" }),
    },
    bySted: {
      isBlacklistedCommon: msg({ id: "validation.svarteliste.felles" }),
      isFirstCharNotSpace: msg({ id: "validation.firstchar.notspace" }),
    },
    land: {
      isRequired: msg({ id: "validation.land.pakrevd" }),
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
    const {
      coAdressenavn,
      coType,
      postboksNummerNavn,
      land,
      ...extraFields
    } = fields;

    if (isValid) {
      const outbound: OutboundUtenlandskPostboksadresse = {
        ...extraFields,
        ...(coAdressenavn && {
          coAdressenavn:
            coType.value !== UNKNOWN
              ? `${coType.label} ${coAdressenavn}`
              : coAdressenavn,
        }),
        postboksNummerNavn: `PO BOX ${postboksNummerNavn}`,
        landkode: fields.land.value,
        gyldigFraOgMed: moment().format("YYYY-MM-DD"),
      };

      settLoading(true);
      postUtenlandskAdresse(outbound)
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
            <div className="adresse__rad">
              <SelectCO
                submitted={submitted}
                option={fields.coType}
                label={msg({ id: "felter.tilleggslinje.label" })}
                error={submitted && errors.coType ? errors.coType : null}
                hjelpetekst={"adresse.hjelpetekster.co"}
                onChange={(value) => setField({ coType: value })}
              />
              <div className="adresse__without-label">
                <InputMedHjelpetekst
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
              bredde={"XL"}
              label={msg({ id: "felter.postboks.label" })}
              value={fields.postboksNummerNavn}
              className="adresse__input-avstand"
              feil={submitted && errors.postboksNummerNavn}
              onChange={(e) => setField({ postboksNummerNavn: e.target.value })}
            />
            <InputMedHjelpetekst
              bredde={"XL"}
              submitted={submitted}
              maxLength={30}
              value={fields.regionDistriktOmraade}
              error={errors.regionDistriktOmraade}
              hjelpetekst={"adresse.hjelpetekster.regiondistriktomraade"}
              label={msg({ id: "felter.regiondistriktomraade.label" })}
              onChange={(value) => setField({ regionDistriktOmraade: value })}
            />
            <div className="adresse__rad">
              <div className="adresse__kolonne">
                <Input
                  bredde={"XL"}
                  label={msg({ id: "felter.postkode.label" })}
                  value={fields.postkode}
                  className="adresse__input-avstand"
                  feil={submitted && errors.postkode}
                  onChange={(e) => setField({ postkode: e.target.value })}
                />
              </div>
              <div className="adresse__kolonne">
                <Input
                  bredde={"XL"}
                  label={msg({ id: "felter.bysted.label" })}
                  value={fields.bySted}
                  className="adresse__input-avstand"
                  feil={submitted && errors.bySted}
                  onChange={(e) => setField({ bySted: e.target.value })}
                />
              </div>
            </div>
            <SelectLand
              label={msg({ id: "felter.land.label" })}
              submitted={submitted}
              option={fields.land}
              error={errors.land}
              onChange={(land) => setField({ land })}
            />
            <DayPicker
              submitted={submitted}
              value={fields.gyldigTilOgMed}
              error={errors.gyldigTilOgMed}
              label={msg({ id: "felter.gyldigtom.label" })}
              onChange={(value) => setField({ gyldigTilOgMed: value })}
              onErrors={(error) =>
                setError({ ...errors, gyldigTilOgMed: error })
              }
            />
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

export default OpprettEllerEndreUtenlandskVegadresse;
