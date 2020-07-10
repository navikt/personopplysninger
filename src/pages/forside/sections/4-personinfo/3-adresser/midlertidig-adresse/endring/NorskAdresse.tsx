import React, { ChangeEvent, Fragment, useState } from "react";
import { Select } from "nav-frontend-skjema";
import OpprettEllerEndreVegadresse from "./norske-adresser/Vegadresse";
import OpprettEllerEndrePostboksadresse from "./norske-adresser/Postboksadresse";
import { FormattedMessage, useIntl } from "react-intl";
import Hjelpetekst from "nav-frontend-hjelpetekst";
import { PopoverOrientering } from "nav-frontend-popover";
import { Vegadresse } from "types/adresser/kontaktadresse";
import { Postboksadresse } from "types/adresser/kontaktadresse";
import { Kontaktadresse } from "types/adresser/kontaktadresse";
import cls from "classnames";

interface Props {
  kontaktadresse: Kontaktadresse;
  settOpprettEllerEndre: (opprettEllerEndre: boolean) => void;
}

type Adresser = "VEGADRESSE" | "POSTBOKSADRESSE";

const OpprettEllerEndreNorskAdresse = (props: Props) => {
  const { formatMessage: msg } = useIntl();
  const { kontaktadresse } = props;
  const [type, settType] = useState(
    (kontaktadresse.type === "POSTBOKSADRESSE"
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
          VEGADRESSE: (
            <OpprettEllerEndreVegadresse
              vegadresse={props.kontaktadresse as Vegadresse}
              settOpprettEllerEndre={props.settOpprettEllerEndre}
            />
          ),
          POSTBOKSADRESSE: (
            <OpprettEllerEndrePostboksadresse
              postboksadresse={props.kontaktadresse as Postboksadresse}
              settOpprettEllerEndre={props.settOpprettEllerEndre}
            />
          ),
        }[type]
      }
    </>
  );
};

export default OpprettEllerEndreNorskAdresse;
