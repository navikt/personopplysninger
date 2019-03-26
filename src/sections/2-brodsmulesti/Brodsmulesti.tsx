import * as React from "react";
import Lenke from "nav-frontend-lenker";
import { FormattedMessage } from "react-intl";
import Environment from "../../utils/Environments";
import account from "../../assets/img/account-circle.svg";

const { tjenesteUrl } = Environment();

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
      <Lenke href={`${tjenesteUrl}/dittnav`}>
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
