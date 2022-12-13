import React, { ForwardedRef } from "react";
import { FormattedMessage } from "react-intl";
import { electronicFormatIBAN } from "ibantools";
import {
  brukerBankkode,
  harValgtBic,
  harValgtUSA,
  validerBankkode,
  validerBic,
} from "../utils";
import AmerikanskKonto from "./AmerikanskKonto";
import LandMedBankkode from "./LandMedBankkode";
import LandUtenBankkode from "./LandUtenBankkode";
import { Alert, Link } from "@navikt/ds-react";
import { FieldValues, useFormContext } from "react-hook-form";
import { FormFields } from "../types";
import { useIntlFormatter } from "../../../../../../../hooks/useIntlFormatter";
import LandField from "./felter/LandField";
import ValutaField from "./felter/ValutaField";
import BanknavnField from "./felter/BanknavnField";
import KontonummerIbanField from "./felter/KontonummerIbanField";

interface Props {
  personident?: { verdi: string; type: string };
}

const OpprettEllerEndreUtenlandsbank = React.forwardRef(
  (props: Props, ref: ForwardedRef<any>) => {
    const { formatIntl } = useIntlFormatter();

    const {
      watch,
      formState: { errors, isSubmitted, isValid },
    } = useFormContext<FormFields>();

    const valgtLand = watch().land;

    return (
      <>
        <div className="utbetalinger__alert">
          <Alert variant="info">
            <FormattedMessage
              id="felter.utenlandskkonto.info"
              values={{
                a: (text: String) => (
                  <Link href="/no/NAV+og+samfunn/Kontakt+NAV/Utbetalinger/Utbetalinger/utbetaling-av-ytelser-fra-nav-til-utlandet">
                    {text}
                  </Link>
                ),
              }}
            />
          </Alert>
        </div>

        <LandField />

        {valgtLand && (
          <>
            <ValutaField />
            <BanknavnField />
            <KontonummerIbanField personident={props.personident} />

            {harValgtUSA(valgtLand) ? (
              <AmerikanskKonto />
            ) : brukerBankkode(valgtLand) ? (
              <LandMedBankkode valgtLand={valgtLand.label.toLowerCase()} />
            ) : (
              <LandUtenBankkode />
            )}
          </>
        )}
        {isSubmitted && !isValid && watch().land && (
          <></>
          // TODO: FIX
          // <ErrorSummary title={formatIntl("validation.fix.errors")}>
          //   {mapErrorsToSummary(errors).map((error, index) => (
          //     <ErrorSummary.Item
          //       key={error.skjemaelementId}
          //       href={`#${error.skjemaelementId}`}
          //     >
          //       {error.feilmelding}
          //     </ErrorSummary.Item>
          //   ))}
          // </ErrorSummary>
        )}
      </>
    );
  }
);

export const setOutboundUtenlandsbankonto = (values: FieldValues) => {
  const { bickode, ...fields } = values;

  const sendBankkode = validerBankkode(
    values.land,
    values.bickode,
    values.bankkode
  );
  const sendBICKode = validerBic(values.land, values.bickode, values.bankkode);
  const sendAdresse = !(
    !brukerBankkode(fields.land) && harValgtBic(fields.bankidentifier)
  );

  return {
    value: electronicFormatIBAN(fields.kontonummer),
    utenlandskKontoInformasjon: {
      landkode: fields.land.value,
      valuta: fields.valuta.value,
      ...(sendBICKode && {
        swift: bickode,
      }),
      bank: {
        ...(sendAdresse && {
          adresseLinje1: fields.adresse1,
          adresseLinje2: fields.adresse2,
          adresseLinje3: fields.adresse3,
        }),
        ...(sendBankkode && {
          kode: fields.bankkode,
        }),
        navn: fields.banknavn,
      },
    },
  };
};

export default OpprettEllerEndreUtenlandsbank;
