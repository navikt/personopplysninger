import React from "react";
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import { Systemtittel } from "nav-frontend-typografi";
import Box from "js/components/Box";

const Arbeidsforhold = ({ intl }) => {
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

Arbeidsforhold.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(Arbeidsforhold);
