import React from "react";
import Sidetittel from "./sections/1-sidetittel/Sidetittel";
import Brodsmulesti from "./sections/2-brodsmulesti/Brodsmulesti";
import Arbeidsforhold from "./sections/5-arbeidsforhold/Arbeidsforhold";
import EksterneLenker from "./sections/6-eksterne/EksterneLenker";
import MerInformasjon from "./sections/7-informasjon/MerInformasjon";
import PersonInfo from "./sections/4-personinfo/PersonInfo";
import "./index.less";
import { useStore } from "./providers/Provider";
import { fetchFeatureToggles } from "./clients/apiClient";
import { FeatureToggles } from "./providers/Store";

const App = () => {
  const [{ featureToggles }, dispatch] = useStore();

  fetchFeatureToggles(featureToggles)
    .then(res =>
      dispatch({
        type: "SETT_FEATURE_TOGGLES",
        payload: res as FeatureToggles
      })
    )
    .catch(error => console.error("Failed to fetch feature toggles"));

  return (
    <div className="pagecontent">
      <Brodsmulesti />
      <Sidetittel />
      <PersonInfo />
      {featureToggles["personopplysninger.arbeidsforhold.liste"] && (
        <Arbeidsforhold />
      )}
      <EksterneLenker />
      <MerInformasjon />
    </div>
  );
};

export default App;
