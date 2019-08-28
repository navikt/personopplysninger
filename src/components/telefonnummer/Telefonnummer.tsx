import { Element, Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import { Input } from "nav-frontend-skjema";
import React, { useState } from "react";
import { NedChevron } from "nav-frontend-chevron";
import { Knapp } from "nav-frontend-knapper";

interface Props {
  titleId: string;
  value?: string;
}
const Telefonnummer = (props: Props) => {
  const { value, titleId } = props;
  const [endre, settEndre] = useState(false);
  return (
    <>
      <div className={"tlfnummer__container"}>
        <div>
          <Element>
            <FormattedMessage id={titleId} />
          </Element>
          <Normaltekst>{value}</Normaltekst>
        </div>
        <div className={"tlfnummer_knapper"} onClick={() => settEndre(!endre)}>
          <Knapp type={"standard"}>Endre</Knapp>
        </div>
      </div>
      {endre && (
        <div>
          <div className={"tlfnummer__endrestil"}>
            <div>Endres til</div>
            <div className={"tlfnummer__chevron"}>
              <NedChevron />
            </div>
          </div>
          <div className={"tlfnummer__input-container"}>
            <div className={"tlfnummer__input"}>
              <Input label={"Landkode"} value={value || ""} />
            </div>
            <div className={"tlfnummer__input"}>
              <Input label={"Telefonnummer"} value={value || ""} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Telefonnummer;
