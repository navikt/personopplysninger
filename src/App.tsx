import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router-dom";
import { useStore } from "./store/Context";
import DetaljertArbeidsforhold from "./pages/detaljert-arbeidsforhold/DetaljertArbeidsforhold";
import Forside from "./pages/forside/Forside";
import WithAuth from "./store/providers/Auth";
import WithFeatureToggles from "./store/providers/FeatureToggles";
import EndreOpplysninger from "./pages/forside/endre-personopplysninger/EndreOpplysninger";
import PageNotFound from "./pages/404/404";
import { configureAnchors } from "react-scrollable-anchor";
import redirectsRaw from "./utils/redirects";
import SkattkortHistorikk from "./pages/skattetrekksmelding/SkattHistorikk";
import SkattekortDetaljer from "./pages/skattetrekksmelding/SkattDetaljer";
import InstHistorikk from "./pages/institusjonsopphold/InstHistorikk";
import InstDetaljer from "./pages/institusjonsopphold/InstDetaljer";
import DsopHistorikk from "./pages/digital-samhandling-offentlig-privat/DsopHistorikk";
import DsopDetaljer from "./pages/digital-samhandling-offentlig-privat/DsopDetaljer";
import Modal from "react-modal";
import Cookies from "js-cookie";
import { redirectAfterLoginCookie } from "./config";

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

  useEffect(() => {
    Modal.setAppElement("#app");
  }, []);

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
        <RedirectAfterLogin>
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
                    component={DsopHistorikk}
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
                    component={InstHistorikk}
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
                {featureToggles.data["personopplysninger.skatt"] && (
                  <Route
                    exact={true}
                    path={`${basePath}/skattetreksmelding`}
                    component={SkattkortHistorikk}
                  />
                )}
                {featureToggles.data["personopplysninger.skatt"] && (
                  <Route
                    exact={true}
                    path={`${basePath}/skattetreksmelding/:id`}
                    component={SkattekortDetaljer}
                  />
                )}
                {featureToggles.status === "RESULT" && (
                  <Route component={PageNotFound} />
                )}
              </Switch>
            </WithFeatureToggles>
          </WithAuth>
        </RedirectAfterLogin>
      </Router>
    </div>
  );
};

const RedirectAfterLogin = (props: { children: JSX.Element }) => {
  const redirectTo = Cookies.get(redirectAfterLoginCookie);
  console.log(redirectTo);
  return redirectTo ? (
    <RedirectAndClearStorage to={redirectTo} />
  ) : (
    <>{props.children}</>
  );
};

const RedirectAndClearStorage = (props: { to: string }) => {
  Cookies.remove(redirectAfterLoginCookie);
  return <Redirect to={props.to} />;
};

export default App;
