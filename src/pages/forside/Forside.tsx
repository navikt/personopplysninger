import React from "react";
import Sidetittel from "./sections/1-sidetittel/Sidetittel";
import PersonInfo from "./sections/4-personinfo/PersonInfo";
import Arbeidsforhold from "./sections/5-arbeidsforhold/Arbeidsforhold";
import EksterneLenker from "./sections/6-flere-opplysninger/Lenker";
import MerInformasjon from "./sections/7-mer-informasjon/MerInformasjon";
import Header from "./sections/3-header/Header";
import Brodsmulesti from "./sections/2-brodsmulesti/Brodsmulesti";
import { useParams } from "react-router-dom";
import RedirectKnapp from "components/knapper/Redirect";

interface Routes {
  tjeneste?: string;
  redirectUrlLegacy?: string;
}

interface Props {
  redirectUrl?: string | null;
}

const Forside = ({ redirectUrl }: Props) => {
  const params = useParams<Routes>();
  const { tjeneste, redirectUrlLegacy } = params;

  const _redirectUrl = redirectUrl || redirectUrlLegacy;

  return (
    <>
      <Brodsmulesti />
      <Sidetittel />
      <Header />
      <PersonInfo />
      <Arbeidsforhold />
      <EksterneLenker />
      <MerInformasjon />
      {tjeneste && _redirectUrl && (
        <RedirectKnapp tjeneste={tjeneste} redirectUrl={_redirectUrl} />
      )}
    </>
  );
};

export default Forside;
