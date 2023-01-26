import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useStore } from "./store/Context";
import DetaljertArbeidsforhold from "./pages/detaljert-arbeidsforhold/DetaljertArbeidsforhold";
import Forside from "./pages/forside/Forside";
import WithFeatureToggles from "./store/providers/FeatureToggles";
import EndreOpplysninger from "./pages/endre-personopplysninger/EndreOpplysninger";
import PageNotFound from "./pages/404/404";
import { getRedirectPathFromParam, tillatteTjenester } from "./utils/redirects";
import InstHistorikk from "./pages/institusjonsopphold/historikk/InstHistorikk";
import InstDetaljer from "./pages/institusjonsopphold/detaljer/InstDetaljer";
import DsopHistorikk from "./pages/digital-samhandling-offentlig-privat/historikk/DsopHistorikk";
import DsopDetaljer from "./pages/digital-samhandling-offentlig-privat/detaljer/DsopDetaljer";
import Modal from "react-modal";
import MedlHistorikk from "./pages/medlemskap-i-folketrygden/MedlHistorikk";
import { WithAuth } from "./store/providers/WithAuth";

export const basePath = "/person/personopplysninger";

// Import this early, to ensure our own CSS gets higher specificity
import "@navikt/ds-css";
import moment from "moment";

const basePathWithLanguage = `${basePath}/(nb|en|nn)`;
const localeUrlPattern = new RegExp(`${basePath}(/en|/nb|/nn)($|\\/)`);

const App = () => {
  const { locale } = useIntl();
  const [{ featureToggles }, dispatch] = useStore();
  const redirectPath = getRedirectPathFromParam();

  useEffect(() => {
    Modal.setAppElement("#app");
  }, []);

  useEffect(() => {
    // Reset forms dersom locale endrer seg
    dispatch({ type: "INCREASE_FORM_KEY" });
  }, [locale, dispatch]);

  useEffect(() => {
    document.documentElement.lang = locale;
    moment.locale(locale);
  }, [locale]);

  return (
    <div role={"main"} className="pagecontent">
      <div className="wrapper">
        <Router>
          <WithAuth>
            <WithFeatureToggles>
              <Switch>
                {redirectPath && <Redirect to={redirectPath} />}
                <Redirect to={`${basePath}/nb/`} exact={true} path={"/"} />
                <RedirectToLocale>
                  <Switch>
                    <Route
                      exact={true}
                      path={[
                        `${basePathWithLanguage}/`,
                        `${basePathWithLanguage}/sendt-fra/:tjeneste(${tillatteTjenester})/:redirectUrl`,
                      ]}
                      component={Forside}
                    />
                    <Route
                      exact={true}
                      path={`${basePathWithLanguage}/arbeidsforhold`}
                      render={(routeProps) => (
                        <Redirect
                          to={routeProps.location.pathname.replace(
                            "arbeidsforhold",
                            "#arbeidsforhold"
                          )}
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
                        path={`${basePathWithLanguage}/endre-opplysninger/sendt-fra/:tjeneste(${tillatteTjenester})/:redirectUrl`}
                        component={EndreOpplysninger}
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
          </WithAuth>
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
