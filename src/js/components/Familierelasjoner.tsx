import React from "react";
import { FormattedMessage, injectIntl, InjectedIntlProps } from "react-intl";
import { Systemtittel } from "nav-frontend-typografi";
import Box from "./Box";

const Familierelasjoner = ({ intl }: InjectedIntlProps) => {
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

export default injectIntl(Familierelasjoner);
