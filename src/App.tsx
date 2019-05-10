import React from "react";
import Sidetittel from "./sections/1-sidetittel/Sidetittel";
import Brodsmulesti from "./sections/2-brodsmulesti/Brodsmulesti";
import EksterneLenker from "./sections/6-eksterne/EksterneLenker";
import Arbeidsforhold from "./sections/5-arbeidsforhold/Arbeidsforhold";
import MerInformasjon from "./sections/7-informasjon/MerInformasjon";
import PersonInfo from "./sections/4-personinfo/PersonInfo";
import "./index.less";

const App = () => (
  <div className="pagecontent">
    <Brodsmulesti />
    <Sidetittel />
    <PersonInfo />
    <Arbeidsforhold />
    <EksterneLenker />
    <MerInformasjon />
  </div>
);

export default App;
