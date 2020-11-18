import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useHistory, useLocation } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router-dom";
import { useStore } from "./store/Context";
import DetaljertArbeidsforhold from "./pages/detaljert-arbeidsforhold/DetaljertArbeidsforhold";
import Forside from "./pages/forside/Forside";
import WithFeatureToggles from "./store/providers/FeatureToggles";
import EndreOpplysninger from "./pages/endre-personopplysninger/EndreOpplysninger";
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
import { EnforceLoginLoader } from "@navikt/nav-dekoratoren-moduler";
import { Auth } from "./types/authInfo";

const redirects: {
  [key: string]: {
    beskrivelse: string;
    knapp: string;
    allowed: string;
  };
} = redirectsRaw;

export const basePath = "/person/personopplysninger";
export const basePathWithLanguage = `${basePath}/(nb|en)`;

const App = () => {
  const { locale } = useIntl();
  const [{ featureToggles }, dispatch] = useStore();

  useEffect(() => {
    Modal.setAppElement("#app");
  }, []);

  useEffect(() => {
    // Reset forms dersom locale endrer seg
    dispatch({ type: "INCREASE_FORM_KEY" });
  }, [locale, dispatch]);

  configureAnchors({
    offset: -65,
    scrollDuration: 0,
    keepLastAnchorHash: true,
  });

  const tillatteTjenester = Object.keys(redirects)
    .map((key) => key)
    .join("|");

  const tillatteUrler = Object.keys(redirects)
    .map((key) => redirects[key].allowed)
    .join("|");

  const authCallback = (auth: Auth) => {
    dispatch({ type: "SETT_AUTH_RESULT", payload: auth });
  };

  return (
    <div className="pagecontent">
      <div className="wrapper">
        <Router>
          <EnforceLoginLoader authCallback={authCallback}>
            <WithFeatureToggles>
              <RedirectAfterLogin>
                <RedirectToLocale>
                  <Switch>
                    <Redirect to={`${basePath}/nb/`} exact={true} path={"/"} />
                    <Route
                      exact={true}
                      path={`${basePathWithLanguage}/`}
                      component={Forside}
                    />
                    <Route
                      exact={true}
                      path={`${basePathWithLanguage}/sendt-fra/:tjeneste(${tillatteTjenester})/:redirectUrl(${tillatteUrler})`}
                      component={Forside}
                    />
                    <Route
                      exact={true}
                      path={`${basePathWithLanguage}/arbeidsforhold`}
                      render={() => (
                        <Redirect
                          to={`${basePathWithLanguage}/#arbeidsforhold`}
                        />
                      )}
                    />
                    <Route
                      exact={true}
                      path={`${basePathWithLanguage}/arbeidsforhold/:id`}
                      component={DetaljertArbeidsforhold}
                    />
                    {featureToggles.data["personopplysninger.dsop"] && (
                      <Route
                        exact={true}
                        path={`${basePathWithLanguage}/dsop`}
                        component={DsopHistorikk}
                      />
                    )}
                    {featureToggles.data["personopplysninger.dsop"] && (
                      <Route
                        exact={true}
                        path={`${basePathWithLanguage}/dsop/:id`}
                        component={DsopDetaljer}
                      />
                    )}
                    {featureToggles.data["personopplysninger.inst"] && (
                      <Route
                        exact={true}
                        path={`${basePathWithLanguage}/institusjonsopphold`}
                        component={InstHistorikk}
                      />
                    )}
                    {featureToggles.data["personopplysninger.inst"] && (
                      <Route
                        exact={true}
                        path={`${basePathWithLanguage}/institusjonsopphold/:id`}
                        component={InstDetaljer}
                      />
                    )}
                    {featureToggles.data["personopplysninger.pdl"] && (
                      <Route
                        exact={true}
                        path={`${basePathWithLanguage}/endre-opplysninger/sendt-fra/:tjeneste(${tillatteTjenester})/:redirectUrl(${tillatteUrler})`}
                        component={EndreOpplysninger}
                      />
                    )}
                    {featureToggles.data["personopplysninger.skatt"] && (
                      <Route
                        exact={true}
                        path={`${basePathWithLanguage}/skattetrekksmelding`}
                        component={SkattkortHistorikk}
                      />
                    )}
                    {featureToggles.data["personopplysninger.skatt"] && (
                      <Route
                        exact={true}
                        path={`${basePathWithLanguage}/skattetrekksmelding/:id`}
                        component={SkattekortDetaljer}
                      />
                    )}
                    {featureToggles.data["personopplysninger.medl"] && (
                      <Route
                        exact={true}
                        path={`${basePathWithLanguage}/medlemskap-i-folketrygden`}
                        component={MedlHistorikk}
                      />
                    )}
                    {featureToggles.status === "RESULT" && (
                      <Route component={PageNotFound} />
                    )}
                  </Switch>
                </RedirectToLocale>
              </RedirectAfterLogin>
            </WithFeatureToggles>
          </EnforceLoginLoader>
        </Router>
      </div>
    </div>
  );
};

const RedirectToLocale = (props: { children: JSX.Element }) => {
  const location = useLocation();
  const history = useHistory();
  const [{ locale }] = useStore();

  useEffect(() => {
    const urlHasLocale =
      location.pathname.includes("/en/") || location.pathname.includes("/nb/");

    if (!urlHasLocale) {
      const redirectTo = `${location.pathname.replace(
        `${basePath}`,
        `${basePath}/${locale}`
      )}${location.hash}`;

      history.push(redirectTo);
    }
  }, [locale, location, history]);
  return props.children;
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
