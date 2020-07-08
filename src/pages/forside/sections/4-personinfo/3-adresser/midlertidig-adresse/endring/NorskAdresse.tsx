import React, { ChangeEvent, Fragment, useState } from "react";
import { Select } from "nav-frontend-skjema";
import { Tilleggsadresse } from "types/adresser/tilleggsadresse";
import OpprettEllerEndreVegadresse from "./norske-adresser/Vegadresse";
import OpprettEllerEndrePostboksadresse from "./norske-adresser/Postboksadresse";
import { FormattedMessage, useIntl } from "react-intl";
import Hjelpetekst from "nav-frontend-hjelpetekst";
import { PopoverOrientering } from "nav-frontend-popover";
import cls from "classnames";

interface Props {
  tilleggsadresse?: Tilleggsadresse;
  settOpprettEllerEndre: (opprettEllerEndre: boolean) => void;
}

type Adresser = "VEGADRESSE" | "POSTBOKSADRESSE";
const MapTPStilPDL: { [key: string]: Adresser } = {
  GATEADRESSE: "VEGADRESSE",
  POSTBOKSADRESSE: "POSTBOKSADRESSE",
  STEDSADRESSE: "VEGADRESSE",
};

const OpprettEllerEndreNorskAdresse = (props: Props) => {
  const { formatMessage: msg } = useIntl();
  const { tilleggsadresse } = props;
  const [type, settType] = useState(
    (tilleggsadresse?.type && MapTPStilPDL[tilleggsadresse.type]) ||
      ("VEGADRESSE" as Adresser)
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
          VEGADRESSE: <OpprettEllerEndreVegadresse {...props} />,
          POSTBOKSADRESSE: <OpprettEllerEndrePostboksadresse {...props} />,
        }[type]
      }
    </>
  );
};

export default OpprettEllerEndreNorskAdresse;
