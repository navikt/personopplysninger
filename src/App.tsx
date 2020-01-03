import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
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
import { redirectLoginCookie } from "./utils/cookies";
import Modal from "react-modal";
import Cookies from "js-cookie";
import Spinner from "./components/spinner/Spinner";
import MedlHistorikk from "./pages/medlemskap-i-folketrygden/MedlHistorikk";
import MedlDetaljer from "./pages/medlemskap-i-folketrygden/MedlDetaljer";

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

  console.log(window.env.)
  return (
    <div className="pagecontent">
      <Router>
        <WithAuth>
          <WithFeatureToggles>
            <RedirectAfterLogin>
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
                    path={`${basePath}/skattetrekksmelding`}
                    component={SkattkortHistorikk}
                  />
                )}
                {featureToggles.data["personopplysninger.skatt"] && (
                  <Route
                    exact={true}
                    path={`${basePath}/skattetrekksmelding/:id`}
                    component={SkattekortDetaljer}
                  />
                )}
                {featureToggles.data["personopplysninger.medl"] && (
                  <Route
                    exact={true}
                    path={`${basePath}/medlemskap-i-folketrygden`}
                    component={MedlHistorikk}
                  />
                )}
                {featureToggles.data["personopplysninger.medl"] && (
                  <Route
                    exact={true}
                    path={`${basePath}/medlemskap-i-folketrygden/:id`}
                    component={MedlDetaljer}
                  />
                )}
                {featureToggles.status === "RESULT" && (
                  <Route component={PageNotFound} />
                )}
              </Switch>
            </RedirectAfterLogin>
          </WithFeatureToggles>
        </WithAuth>
      </Router>
    </div>
  );
};

const RedirectAfterLogin = (props: { children: JSX.Element }) => {
  const [loading, settLoading] = useState<boolean>(true);
  const history = useHistory();
  useEffect(() => {
    const redirectTo = Cookies.get(redirectLoginCookie);
    if (redirectTo) {
      Cookies.remove(redirectLoginCookie);
      history.replace(redirectTo);
    }
    settLoading(false);
  }, [history]);
  return loading ? <Spinner /> : props.children;
};

export default App;
