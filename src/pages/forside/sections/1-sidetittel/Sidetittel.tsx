import React from "react";
import { FormattedMessage } from "react-intl";
import { Heading } from "@navikt/ds-react";

const Tittel = () => (
  <div className="sidetittel__container">
    <Heading size={"xlarge"} level={"1"}>
      <FormattedMessage id="side.tittel" />
    </Heading>
  </div>
);
export default Tittel;
