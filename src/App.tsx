import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { useStore } from "./providers/Provider";
import DetaljertArbeidsforhold from "./pages/detaljert-arbeidsforhold/DetaljertArbeidsforhold";
import Forside from "./pages/forside/Forside";
import WithAuth from "./providers/auth/Auth";
import WithFeatureToggles from "./providers/featuretoggles/FeatureToggles";
import EndreOpplysninger from "./pages/forside/endre-personopplysninger/EndreOpplysninger";
import { DsopHistorik } from "./pages/digital-samhandling-offentlig-privat/DsopWrapper";
import { DsopDetaljer } from "./pages/digital-samhandling-offentlig-privat/DsopWrapper";
import PageNotFound from "./pages/404/404";
import { configureAnchors } from "react-scrollable-anchor";
import redirectsRaw from "./utils/redirects";
import { InstHistorik } from "./pages/institusjonsopphold/InstWrapper";
import { InstDetaljer } from "./pages/institusjonsopphold/InstWrapper";
import { SkattkortDetaljer } from "./pages/skattetrekksmelding/SkattPages";

const redirects: {
  [key: string]: {
    beskrivelse: string;
    knapp: string;
    allowed: string;
  };
} = redirectsRaw;

export const basePath = "/person/personopplysninger";
const App = () => {
  const [{ featureToggles }] = useStore();

  configureAnchors({
    offset: -65,
    scrollDuration: 0,
    keepLastAnchorHash: true
  });

  const tillatteTjenester = Object.keys(redirects)
    .map(key => key)
    .join("|");

  const tillatteUrler = Object.keys(redirects)
    .map(key => redirects[key].allowed)
    .join("|");

  return (
    <div className="pagecontent">
      <Router>
        <WithAuth>
          <WithFeatureToggles>
            <Switch>
              <Route
                exact={true}
                path={`(/|${basePath})`}
                component={Forside}
              />
              <Route
                exact={true}
                path={`${basePath}/sendt-fra/:tjeneste(${tillatteTjenester})/:redirectUrl(${tillatteUrler})`}
                component={Forside}
              />
              <Route
                exact={true}
                path={`${basePath}/arbeidsforhold`}
                render={() => <Redirect to={`${basePath}/#arbeidsforhold`} />}
              />
              <Route
                exact={true}
                path={`${basePath}/arbeidsforhold/:id`}
                component={DetaljertArbeidsforhold}
              />
              {featureToggles.data["personopplysninger.dsop"] && (
                <Route
                  exact={true}
                  path={`${basePath}/dsop`}
                  component={DsopHistorik}
                />
              )}
              {featureToggles.data["personopplysninger.dsop"] && (
                <Route
                  exact={true}
                  path={`${basePath}/dsop/:id`}
                  component={DsopDetaljer}
                />
              )}
              {featureToggles.data["personopplysninger.inst"] && (
                <Route
                  exact={true}
                  path={`${basePath}/institusjonsopphold`}
                  component={InstHistorik}
                />
              )}
              {featureToggles.data["personopplysninger.inst"] && (
                <Route
                  exact={true}
                  path={`${basePath}/institusjonsopphold/:id`}
                  component={InstDetaljer}
                />
              )}
              {featureToggles.data["personopplysninger.pdl"] && (
                <Route
                  exact={true}
                  path={`${basePath}/endre-opplysninger/sendt-fra/:tjeneste(${tillatteTjenester})/:redirectUrl(${tillatteUrler})`}
                  component={EndreOpplysninger}
                />
              )}
              <Route
                exact={true}
                path={`${basePath}/skattetreksmelding/:id`}
                component={SkattkortDetaljer}
              />
              {featureToggles.status === "RESULT" && (
                <Route component={PageNotFound} />
              )}
            </Switch>
          </WithFeatureToggles>
        </WithAuth>
      </Router>
    </div>
  );
};

export default App;
