/* eslint-disable react/no-danger */

import React from "react";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import { Normaltekst } from "nav-frontend-typografi";
import {
  FormattedHTMLMessage,
  injectIntl,
  InjectedIntlProps
} from "react-intl";

interface Props {
  tittel: string;
  melding: string;
}
const Alternativ = (props: Props & InjectedIntlProps) => {
  const { tittel, melding, intl } = props;
  return (
    <React.Fragment>
      <div className="alternativ-panel">
        <Ekspanderbartpanel
          tittel={intl.formatMessage({ id: tittel })}
          tittelProps="element"
        >
          <Normaltekst>
            <FormattedHTMLMessage id={melding} />
          </Normaltekst>
        </Ekspanderbartpanel>
      </div>
    </React.Fragment>
  );
};

export default injectIntl(Alternativ);
