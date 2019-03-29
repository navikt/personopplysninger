import React from "react";
import Sidetittel from "./sections/1-sidetittel/Sidetittel";
import Brodsmulesti from "./sections/2-brodsmulesti/Brodsmulesti";
import EksterneLenker from "./sections/6-eksterne/EksterneLenker";
import MerInformasjon from "./sections/7-informasjon/MerInformasjon";
import PersonInfo from "./sections/4-personinfo/PersonInfo";
import "./index.less";

const App = () => (
  <main role="main">
    <div className="Content">
      <Brodsmulesti />
      <Sidetittel />
      <PersonInfo />
      <EksterneLenker />
      <MerInformasjon />
    </div>
  </main>
);

export default App;
