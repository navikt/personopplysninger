import React from "react";
import Sidetittel from "./sections/01-sidetittel/Sidetittel";
import Brodsmulesti from "./sections/02-brodsmulesti/Brodsmulesti";
import EksterneLenker from "./sections/06-eksterne/EksterneLenker";
import Alternativer from "./sections/07-alternativer/Alternativer";
import PersonInfo from "./sections/04-personinfo/PersonInfo";
import "./index.less";

const App = () => (
  <main role="main">
    <div className="Content">
      <Sidetittel />
      <Brodsmulesti />
      <PersonInfo />
      <EksterneLenker />
      <Alternativer />
    </div>
  </main>
);

export default App;
