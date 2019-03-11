import * as React from "react";
import Lenke from "nav-frontend-lenker";
import { Element } from "nav-frontend-typografi";
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
      <Lenke href="https://tjenester.nav.no/dittnav/">Ditt NAV</Lenke>
    </Brodsmule>
    /
    <Brodsmule>
      <span>Dine personopplysninger</span>
    </Brodsmule>
  </div>
);
export default Brodsmulesti;
