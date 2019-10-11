import React from "react";
import Sidetittel from "./sections/1-sidetittel/Sidetittel";
import PersonInfo from "./sections/4-personinfo/PersonInfo";
import Arbeidsforhold from "./sections/5-arbeidsforhold/Arbeidsforhold";
import EksterneLenker from "./sections/6-eksterne/EksterneLenker";
import MerInformasjon from "./sections/7-informasjon/MerInformasjon";
import Header from "./sections/3-header/Header";
import Brodsmulesti from "./sections/2-brodsmulesti/Brodsmulesti";
import { withRouter, RouteComponentProps } from "react-router";
import RedirectKnapp from "../../components/knapper/Redirect";

interface Routes {
  tjeneste?: string;
}

const Forside = ({ match }: RouteComponentProps<Routes>) => {
  return (
    <>
      <Brodsmulesti />
      <Sidetittel />
      <Header />
      <PersonInfo />
      <Arbeidsforhold />
      <EksterneLenker />
      <MerInformasjon />
      {match.params.tjeneste && (
        <RedirectKnapp tjeneste={match.params.tjeneste} />
      )}
    </>
  );
};

export default withRouter(Forside);
