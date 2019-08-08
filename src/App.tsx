import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useStore } from "./providers/Provider";
import DetaljertArbeidsforhold from "./pages/detaljert-arbeidsforhold/DetaljertArbeidsforhold";
import Forside from "./pages/forside/Forside";
import WithAuth from "./components/auth/Auth";
import WithFeatureToggles from "./components/featuretoggles/FeatureToggles";
import PageContainer from "./components/pagecontainer/PageContainer";
import WithDSOP from "./pages/dsop/DSOP";
import Brodsmulesti from "./pages/forside/sections/2-brodsmulesti/Brodsmulesti";

export const basePath = "/person/personopplysninger";
const App = () => {
  const [{ featureToggles }] = useStore();

  return (
    <div className="pagecontent">
      <Router>
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
              <>
                <Route
                  exact={true}
                  path={`${basePath}/dsop`}
                  render={() => (
                    <>
                      <Brodsmulesti hierarchy={[{ title: "dsop.tittel" }]} />
                      <PageContainer>
                        <WithDSOP />
                      </PageContainer>
                    </>
                  )}
                />
                <Route
                  exact={true}
                  path={`${basePath}/dsop/:id`}
                  render={() => (
                    <>
                      <Brodsmulesti
                        hierarchy={[
                          { title: "dsop.tittel", path: "/dsop" },
                          { title: "dsop.levertedata" }
                        ]}
                      />
                      <PageContainer>
                        <WithDSOP />
                      </PageContainer>
                    </>
                  )}
                />
              </>
            )}
          </WithFeatureToggles>
        </WithAuth>
      </Router>
    </div>
  );
};

export default App;
