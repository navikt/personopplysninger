import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useStore } from "./providers/Provider";
import { fetchFeatureToggles } from "./clients/apiClient";
import { FeatureToggles } from "./providers/Store";
import DetaljertArbeidsforhold from "./pages/detaljert-arbeidsforhold/DetaljertArbeidsforhold";
import Forside from "./pages/forside/Forside";
import "./index.less";

export const baseUrl = "/person/personopplysninger";
const App = () => {
  const [{ featureToggles }, dispatch] = useStore();

  useEffect(() => {
    fetchFeatureToggles(featureToggles)
      .then(res =>
        dispatch({
          type: "SETT_FEATURE_TOGGLES",
          payload: res as FeatureToggles
        })
      )
      .catch(error =>
        console.error(`Failed to fetch feature toggles - ${error}`)
      );
  }, []);

  return (
    <div className="pagecontent">
      <Router>
        <Route exact={true} path={`(/|${baseUrl}/)`} component={Forside} />
        {featureToggles["personopplysninger.arbeidsforhold.detaljert"] && (
          <Route
            exact={true}
            path={`${baseUrl}/arbeidsforhold/:id`}
            component={DetaljertArbeidsforhold}
          />
        )}
      </Router>
    </div>
  );
};

export default App;
