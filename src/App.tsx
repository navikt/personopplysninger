import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
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
import Modal from "react-modal";
import Spinner from "./components/spinner/Spinner";
import MedlHistorikk from "./pages/medlemskap-i-folketrygden/MedlHistorikk";
import { Auth } from "./types/authInfo";
import { fetchInnloggingsStatus, sendTilLogin } from "./clients/apiClient";

const redirects: {
  [key: string]: {
    beskrivelse: string;
    knapp: string;
    allowed: string;
  };
} = redirectsRaw;

export const basePath = "/person/personopplysninger";
export const basePathWithLanguage = `${basePath}/(nb|en)`;

const redirectedPathSegment = "sendt-fra";

const getRedirectUrl = () => {
  console.log(window.location.pathname, redirectedPathSegment);
  if (window.location.href.includes(redirectedPathSegment)) {
    const segments = window.location.href.split("/");
    const [lastSegment] = segments.slice(-1);
    return `${segments.slice(0, -1).join("/")}?url=${lastSegment}`;
  }
  return undefined;
};

const App = () => {
  const { locale } = useIntl();
  const [{ featureToggles, authInfo }, dispatch] = useStore();
  const returnUrlToApp = new URLSearchParams(window.location.search).get("url");
  console.log("Redirect url:", returnUrlToApp);

  useEffect(() => {
    fetchInnloggingsStatus().then((auth: Auth) => {
      console.log("received auth status:", auth);
      if (!auth?.authenticated || auth.securityLevel !== "4") {
        sendTilLogin(getRedirectUrl());
      } else {
        dispatch({ type: "SETT_AUTH_RESULT", payload: auth });
      }
    });
  }, []);

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

  return (
    <div className="pagecontent">
      <div className="wrapper">
        {authInfo.status === "RESULT" ? (
          <Router>
            <WithFeatureToggles>
              <Switch>
                <Redirect to={`${basePath}/nb/`} exact={true} path={"/"} />
                <RedirectToLocale>
                  <Switch>
                    <Route
                      exact={true}
                      path={`${basePathWithLanguage}/`}
                      component={Forside}
                    />
                    {returnUrlToApp ? (
                      <Route
                        exact={true}
                        path={`${basePathWithLanguage}/sendt-fra/:tjeneste(${tillatteTjenester})`}
                      >
                        <Forside redirectUrlProp={returnUrlToApp} />
                      </Route>
                    ) : (
                      <Route
                        exact={true}
                        path={`${basePathWithLanguage}/sendt-fra/:tjeneste(${tillatteTjenester})/:redirectUrl(${tillatteUrler})`}
                        component={Forside}
                      />
                    )}
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
                      returnUrlToApp ? (
                        <Route
                          exact={true}
                          path={`${basePathWithLanguage}/endre-opplysninger/sendt-fra/:tjeneste(${tillatteTjenester})`}
                        >
                          <EndreOpplysninger redirectUrlProp={returnUrlToApp} />
                        </Route>
                      ) : (
                        <Route
                          exact={true}
                          path={`${basePathWithLanguage}/endre-opplysninger/sendt-fra/:tjeneste(${tillatteTjenester})/:redirectUrl(${tillatteUrler})`}
                          component={EndreOpplysninger}
                        />
                      )
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
              </Switch>
            </WithFeatureToggles>
          </Router>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

const RedirectToLocale = (props: { children: JSX.Element }) => {
  const location = useLocation();
  const history = useHistory();
  const [{ locale }] = useStore();

  useEffect(() => {
    const localeUrlPattern = new RegExp(`${basePath}(/en|/nb)($|\\/)`);
    const urlHasLocale = localeUrlPattern.test(location.pathname);

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

export default App;
