import React from "react";
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import { Systemtittel } from "nav-frontend-typografi";
import Box from "js/components/Box";

const Familierelasjoner = ({ intl }) => {
  return (
    <Box
      id="familierelasjoner"
      header={intl.formatMessage({ id: "familierelasjoner.tittel" })}
    >
      <div className="header-content">
        <Systemtittel>
          <FormattedMessage id="familierelasjoner.tittel" />
        </Systemtittel>
      </div>
    </Box>
  );
};

Familierelasjoner.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(Familierelasjoner);
