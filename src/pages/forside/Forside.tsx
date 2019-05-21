import React from "react";
import Sidetittel from "../../sections/1-sidetittel/Sidetittel";
import Brodsmulesti from "../../sections/2-brodsmulesti/Brodsmulesti";
import PersonInfo from "../../sections/4-personinfo/PersonInfo";
import Arbeidsforhold from "../../sections/5-arbeidsforhold/Arbeidsforhold";
import EksterneLenker from "../../sections/6-eksterne/EksterneLenker";
import MerInformasjon from "../../sections/7-informasjon/MerInformasjon";

const Forside = () => (
  <>
    <Brodsmulesti />
    <Sidetittel />
    <PersonInfo />
    <Arbeidsforhold />
    <EksterneLenker />
    <MerInformasjon />
  </>
);

export default Forside;
