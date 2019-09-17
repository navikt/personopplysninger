import React, { ChangeEvent, useState } from "react";
import { Select } from "nav-frontend-skjema";
import { Tilleggsadresse } from "../../../../../../../types/adresser/tilleggsadresse";
import OpprettEllerEndreGateadresse from "./norske-adresser/Gateadresse";
import OpprettEllerEndrePostboksadresse from "./norske-adresser/Postboksadresse";
import OpprettEllerEndreStedsadresse from "./norske-adresser/Stedsadresse";

interface Props {
  tilleggsadresse?: Tilleggsadresse;
  onChangeSuccess: () => void;
}

type Adresser = "GATEADRESSE" | "POSTBOKSADRESSE" | "STEDSADRESSE";
const OpprettEllerEndreNorskAdresse = (props: Props) => {
  const [type, settType] = useState("GATEADRESSE" as Adresser);

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) =>
    settType(e.target.value as Adresser);

  return (
    <>
      <div className="addresse__rad">
        <div className="addresse__kolonne">
          <Select label={"Type adresse"} onChange={onSelectChange}>
            <option value="GATEADRESSE">Gateadresse</option>
            <option value="POSTBOKSADRESSE">Postboksadresse</option>
            <option value="STEDSADRESSE">Stedsadresse</option>
          </Select>
        </div>
        <div className="addresse__kolonne"></div>
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

export default OpprettEllerEndreNorskAdresse;
