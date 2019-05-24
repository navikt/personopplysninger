import React from "react";
import Sidetittel from "./sections/1-sidetittel/Sidetittel";
import Brodsmulesti from "./sections/2-brodsmulesti/Brodsmulesti";
import PersonInfo from "./sections/4-personinfo/PersonInfo";
import Arbeidsforhold from "./sections/5-arbeidsforhold/Arbeidsforhold";
import EksterneLenker from "./sections/6-eksterne/EksterneLenker";
import MerInformasjon from "./sections/7-informasjon/MerInformasjon";
import { useStore } from "../../providers/Provider";

const Forside = () => {
  const [{ featureToggles }] = useStore();
  return (
    <>
      <Brodsmulesti />
      <Sidetittel />
      <PersonInfo />
      {featureToggles["personopplysninger.arbeidsforhold.liste"] && (
        <Arbeidsforhold />
      )}
      <EksterneLenker />
      <MerInformasjon />
    </>
  );
};

export default Forside;
