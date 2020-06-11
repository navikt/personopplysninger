import React, { ChangeEvent, useState } from "react";
import { Select } from "nav-frontend-skjema";
import { Tilleggsadresse } from "types/adresser/tilleggsadresse";
import OpprettEllerEndreGateadresse from "./norske-adresser/Gateadresse";
import OpprettEllerEndrePostboksadresse from "./norske-adresser/Postboksadresse";
import OpprettEllerEndreStedsadresse from "./norske-adresser/Stedsadresse";
import { FormattedMessage, useIntl } from "react-intl";
import Hjelpetekst from "nav-frontend-hjelpetekst";
import { PopoverOrientering } from "nav-frontend-popover";
import cls from "classnames";

interface Props {
  tilleggsadresse?: Tilleggsadresse;
  settOpprettEllerEndre: (opprettEllerEndre: boolean) => void;
}

type Adresser = "GATEADRESSE" | "POSTBOKSADRESSE" | "STEDSADRESSE";
const OpprettEllerEndreNorskAdresse = (props: Props) => {
  const { formatMessage: msg } = useIntl();
  const { tilleggsadresse } = props;
  const [type, settType] = useState(
    (tilleggsadresse && tilleggsadresse.type) || ("GATEADRESSE" as Adresser)
  );

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) =>
    settType(e.target.value as Adresser);

  return (
    <>
      <div className="adresse__rad">
        <div className="adresse__kolonne">
          <div className="adresse__select-header">
            <FormattedMessage id={"felter.adressetype"} />
            <Hjelpetekst type={PopoverOrientering.Hoyre} id={"hjelpetekst"}>
              <FormattedMessage id={"adresse.hjelpetekster.adressetyper"} />
            </Hjelpetekst>
          </div>
          <div className={cls("KodeverkSelect--select-wrapper input--l")}>
            <Select
              label={""}
              className="input--l"
              onChange={onSelectChange}
              defaultValue={type}
            >
              <option value="GATEADRESSE">
                {msg({ id: "felter.adressetype.gateadresse" })}
              </option>
              <option value="POSTBOKSADRESSE">
                {msg({ id: "felter.adressetype.postboksadresse" })}
              </option>
              <option value="STEDSADRESSE">
                {msg({ id: "felter.adressetype.stedsadresse" })}
              </option>
            </Select>
          </div>
        </div>
        <div className="adresse__kolonne" />
      </div>
      {
        {
          GATEADRESSE: <OpprettEllerEndreGateadresse {...props} />,
          POSTBOKSADRESSE: <OpprettEllerEndrePostboksadresse {...props} />,
          STEDSADRESSE: <OpprettEllerEndreStedsadresse {...props} />,
        }[type]
      }
    </>
  );
};

export default OpprettEllerEndreNorskAdresse;
