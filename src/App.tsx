import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useStore } from "./providers/Provider";
import { fetchFeatureToggles } from "./clients/apiClient";
import { FeatureToggles } from "./providers/Store";
import DetaljertArbeidsforhold from "./pages/detaljert-arbeidsforhold/DetaljertArbeidsforhold";
import Forside from "./pages/forside/Forside";
import { HTTPError } from "./components/error/Error";

export type FetchFeatureToggles = { data: FeatureToggles } & (
  | { status: "LOADING" }
  | { status: "RESULT" }
  | { status: "ERROR"; error: HTTPError });

export const basePath = "/person/personopplysninger";
const App = () => {
  const [{ featureToggles }, dispatch] = useStore();

  useEffect(() => {
    if (featureToggles.status === "LOADING") {
      fetchFeatureToggles(featureToggles.data)
        .then(res =>
          dispatch({
            type: "SETT_FEATURE_TOGGLES",
            payload: res as FeatureToggles
          })
        )
        .catch(error =>
          console.error(`Failed to fetch feature toggles - ${error}`)
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pagecontent">
      <Router>
        <Route exact={true} path={`(/|${basePath})`} component={Forside} />
        {featureToggles.data["personopplysninger.arbeidsforhold.detaljert"] && (
          <Route
            exact={true}
            path={`${basePath}/arbeidsforhold/:id`}
            component={DetaljertArbeidsforhold}
          />
        )}
      </Router>
    </div>
  );
};

export default App;
