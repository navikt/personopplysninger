import React, { ChangeEvent, Fragment, useState } from "react";
import { Select } from "nav-frontend-skjema";
import { FormattedMessage, useIntl } from "react-intl";
import Hjelpetekst from "nav-frontend-hjelpetekst";
import { PopoverOrientering } from "nav-frontend-popover";
import OpprettEllerEndreUtenlandskVegadresse from "./utenlanske-adresser/Vegadresse";
import OpprettEllerEndreUtenlandskPostboksadresse from "./utenlanske-adresser/Postboksadresse";
import { Kontaktadresse } from "types/adresser/kontaktadresse";
import cls from "classnames";

interface Props {
  kontaktadresse?: Kontaktadresse;
  settOpprettEllerEndre: (opprettEllerEndre: boolean) => void;
}

type Adresser = "VEGADRESSE" | "POSTBOKSADRESSE";
const OpprettEllerEndreUtenlanskAdresse = (props: Props) => {
  const { formatMessage: msg } = useIntl();
  const { kontaktadresse } = props;

  const [type, settType] = useState(
    (kontaktadresse?.type === "UTENLANDSK_ADRESSE" &&
    kontaktadresse?.postboksNummerNavn
      ? "POSTBOKSADRESSE"
      : "VEGADRESSE") as Adresser
  );

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) =>
    settType(e.target.value as Adresser);

  return (
    <>
      <div className="adresse__rad">
        <div className="adresse__kolonne">
          <div className="adresse__select-header skjemaelement__label">
            <FormattedMessage id={"felter.adressetype"} />
            <Hjelpetekst type={PopoverOrientering.Hoyre} id={"hjelpetekst"}>
              <FormattedMessage
                id={"adresse.hjelpetekster.adressetyper"}
                values={{
                  b: (text: string) => <b>{text}</b>,
                  p: (...chunks: string[]) => (
                    <p>
                      {chunks.map((chunk, i) => (
                        <Fragment key={i}>{chunk}</Fragment>
                      ))}
                    </p>
                  ),
                }}
              />
            </Hjelpetekst>
          </div>
          <div className={cls("KodeverkSelect--select-wrapper input--l")}>
            <Select
              label={""}
              className="input--l"
              onChange={onSelectChange}
              defaultValue={type}
            >
              <option value="VEGADRESSE">
                {msg({ id: "felter.adressetype.gateadresse" })}
              </option>
              <option value="POSTBOKSADRESSE">
                {msg({ id: "felter.adressetype.postboksadresse" })}
              </option>
            </Select>
          </div>
        </div>
        <div className="adresse__kolonne" />
      </div>
      {
        {
          VEGADRESSE: <OpprettEllerEndreUtenlandskVegadresse {...props} />,
          POSTBOKSADRESSE: (
            <OpprettEllerEndreUtenlandskPostboksadresse {...props} />
          ),
        }[type]
      }
    </>
  );
};

export default OpprettEllerEndreUtenlanskAdresse;
