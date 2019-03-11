import * as React from "react";
import Lenke from "nav-frontend-lenker";
import { Element } from "nav-frontend-typografi";
import { FormattedMessage, injectIntl, InjectedIntlProps } from "react-intl";
import account from "../../assets/img/account-circle.svg";

interface Props {
  children: JSX.Element | JSX.Element[];
}
const Brodsmule = (props: Props) => (
  <div className="brodsmule">{props.children}</div>
);

const Brodsmulesti = () => (
  <div className="brodsmulesti">
    <Brodsmule>
      <img className="brodsmulesti__account" src={account} />
    </Brodsmule>
    <Brodsmule>
      <Lenke href="https://tjenester.nav.no/dittnav/">
        <FormattedMessage id="brodsmulesti.dittnav" />
      </Lenke>
    </Brodsmule>
    /
    <Brodsmule>
      <FormattedMessage id="brodsmulesti.dinepersonopplysninger" />
    </Brodsmule>
  </div>
);
export default Brodsmulesti;
