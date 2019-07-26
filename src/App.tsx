import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useStore } from "./providers/Provider";
import DetaljertArbeidsforhold from "./pages/detaljert-arbeidsforhold/DetaljertArbeidsforhold";
import Forside from "./pages/forside/Forside";
import WithAuth from "./components/auth/Auth";
import WithFeatureToggles from "./components/featuretoggles/FeatureToggles";
import Brodsmulesti from "./pages/forside/sections/2-brodsmulesti/Brodsmulesti";
import DSOP from "./pages/dsop/DSOP";
import DsopHistorikk from "./pages/dsop/Historikk";

export const basePath = "/person/personopplysninger";
const App = () => {
  const [{ featureToggles }] = useStore();

  return (
    <div className="pagecontent">
      <Router>
        <Brodsmulesti />
        <WithAuth>
          <WithFeatureToggles>
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
            {featureToggles.data["personopplysninger.dsop"] && (
              <Route
                exact={true}
                path={`${basePath}/dsop/historikk`}
                render={() => (
                  <DSOP>
                    <DsopHistorikk />
                  </DSOP>
                )}
              />
            )}
          </WithFeatureToggles>
        </WithAuth>
      </Router>
    </div>
  );
};

export default App;
