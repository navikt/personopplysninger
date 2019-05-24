import React from "react";
import { Sidetittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";

const Tittel = () => (
  <div className="sidetittel__container">
    <Sidetittel>
      <FormattedMessage id="side.tittel" />
    </Sidetittel>
  </div>
);
export default Tittel;
