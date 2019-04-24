import React from "react";
import { FormattedMessage } from "react-intl";
import { Systemtittel } from "nav-frontend-typografi";
import Box from "../../components/box/Box";

const Arbeidsforhold = () => (
  <Box id="arbeidsforhold" tittel="arbeidsforhold.tittel">
    <div className="header-content">
      <Systemtittel>
        <FormattedMessage id="arbeidsforhold.tittel" />
      </Systemtittel>
    </div>
  </Box>
);
export default Arbeidsforhold;
