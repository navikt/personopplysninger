import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useStore } from "./providers/Provider";
import { fetchAuthInfo, fetchFeatureToggles } from "./clients/apiClient";
import { FeatureToggles } from "./providers/Store";
import DetaljertArbeidsforhold from "./pages/detaljert-arbeidsforhold/DetaljertArbeidsforhold";
import Forside from "./pages/forside/Forside";
import { HTTPError } from "./components/error/Error";
import Spinner from "./components/spinner/Spinner";
import { AuthInfo } from "./types/authInfo";
import Error from "./components/error/Error";
import Brodsmulesti from "./pages/forside/sections/2-brodsmulesti/Brodsmulesti";

export type FetchFeatureToggles = { data: FeatureToggles } & (
  | { status: "LOADING" }
  | { status: "RESULT" }
  | { status: "ERROR"; error: HTTPError });

export const basePath = "/person/personopplysninger";
const App = () => {
  const [{ featureToggles, auth }, dispatch] = useStore();

  useEffect(() => {
    if (featureToggles.status === "LOADING") {
      fetchFeatureToggles(featureToggles.data)
        .then(res =>
          dispatch({
            type: "SETT_FEATURE_TOGGLES",
            payload: res as FeatureToggles
          })
        )
        .catch((error: HTTPError) =>
          console.error(
            `Failed to fetch feature toggles - ${error.code} ${error.text}`
          )
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (auth.status === "LOADING") {
      fetchAuthInfo()
        .then((authInfo: AuthInfo) =>
          dispatch({ type: "SETT_AUTH_RESULT", payload: authInfo })
        )
        .catch((error: HTTPError) =>
          dispatch({ type: "SETT_AUTH_ERROR", payload: error })
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (auth.status) {
    case "LOADING":
      return <Spinner />;
    case "RESULT":
      return auth.data.authenticated ? (
        <div className="pagecontent">
          <Router>
            <Brodsmulesti />
            <Route exact={true} path={`(/|${basePath})`} component={Forside} />
            {featureToggles.data[
              "personopplysninger.arbeidsforhold.detaljert"
            ] && (
              <Route
                exact={true}
                path={`${basePath}/arbeidsforhold/:id`}
                component={DetaljertArbeidsforhold}
              />
            )}
          </Router>
        </div>
      ) : (
        <Spinner />
      );
    case "ERROR":
      return <Error error={auth.error} />;
  }
};

export default App;
