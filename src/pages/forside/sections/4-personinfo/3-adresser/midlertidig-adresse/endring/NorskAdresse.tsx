import React, { ChangeEvent, useState } from "react";
import { Select } from "nav-frontend-skjema";
import { Tilleggsadresse } from "types/adresser/tilleggsadresse";
import OpprettEllerEndreGateadresse from "./norske-adresser/Gateadresse";
import OpprettEllerEndrePostboksadresse from "./norske-adresser/Postboksadresse";
import OpprettEllerEndreStedsadresse from "./norske-adresser/Stedsadresse";
import { InjectedIntlProps, injectIntl } from "react-intl";

interface Props {
  tilleggsadresse?: Tilleggsadresse;
  settOpprettEllerEndre: (opprettEllerEndre: boolean) => void;
}

type Adresser = "GATEADRESSE" | "POSTBOKSADRESSE" | "STEDSADRESSE";
const OpprettEllerEndreNorskAdresse = (props: Props & InjectedIntlProps) => {
  const { intl, tilleggsadresse } = props;
  const [type, settType] = useState((tilleggsadresse &&
  tilleggsadresse.postboksnummer
    ? "POSTBOKSADRESSE"
    : "GATEADRESSE") as Adresser);

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) =>
    settType(e.target.value as Adresser);

  return (
    <>
      <div className="adresse__rad">
        <div className="adresse__kolonne">
          <Select
            label={"Type adresse"}
            className="input--l"
            onChange={onSelectChange}
            defaultValue={type}
          >
            <option value="GATEADRESSE">
              {intl.messages["felter.adressetype.gateadresse"]}
            </option>
            <option value="POSTBOKSADRESSE">
              {intl.messages["felter.adressetype.postboksadresse"]}
            </option>
            <option value="STEDSADRESSE">
              {intl.messages["felter.adressetype.stedsadresse"]}
            </option>
          </Select>
        </div>
        <div className="adresse__kolonne" />
      </div>
      {
        {
          GATEADRESSE: <OpprettEllerEndreGateadresse {...props} />,
          POSTBOKSADRESSE: <OpprettEllerEndrePostboksadresse {...props} />,
          STEDSADRESSE: <OpprettEllerEndreStedsadresse {...props} />
        }[type]
      }
    </>
  );
};

export default injectIntl(OpprettEllerEndreNorskAdresse);
