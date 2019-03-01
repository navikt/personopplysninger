import React from "react";
import { FormattedMessage, injectIntl, InjectedIntlProps } from "react-intl";
import { Systemtittel } from "nav-frontend-typografi";
import Box from "./Box";

const Arbeidsforhold = ({ intl }: InjectedIntlProps) => {
  return (
    <Box
      id="arbeidsforhold"
      header={intl.formatMessage({ id: "arbeidsforhold.tittel" })}
    >
      <div className="header-content">
        <Systemtittel>
          <FormattedMessage id="arbeidsforhold.tittel" />
        </Systemtittel>
      </div>
    </Box>
  );
};

export default injectIntl(Arbeidsforhold);
