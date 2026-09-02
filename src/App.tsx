import { initializeFaro } from "@grafana/faro-web-sdk";
import { Fragment, useEffect } from "react";
import { useIntl } from "react-intl";
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation, useNavigate } from "react-router-dom";
import { basePath } from "./constants";
import { useRuntimeConfig } from "./runtime-config/RuntimeConfigContext";
import { useStore } from "./store/Context";
import { WithAuth } from "./store/providers/WithAuth";
import { getRedirectPathFromParam, tillatteTjenester } from "./utils/redirects";
import PageNotFound from "./views/404/404";
import DetaljertArbeidsforhold from "./views/detaljert-arbeidsforhold/DetaljertArbeidsforhold";
import DsopDetaljer from "./views/digital-samhandling-offentlig-privat/detaljer/DsopDetaljer";
import DsopHistorikk from "./views/digital-samhandling-offentlig-privat/historikk/DsopHistorikk";
import { EndreKontonummer } from "./views/endre-kontonummer/EndreKontonummer";
import EndreOpplysninger from "./views/endre-personopplysninger/EndreOpplysninger";
import Forside from "./views/forside/Forside";
import InstDetaljer from "./views/institusjonsopphold/detaljer/InstDetaljer";
import InstHistorikk from "./views/institusjonsopphold/historikk/InstHistorikk";
import MedlHistorikk from "./views/medlemskap-i-folketrygden/MedlHistorikk";

import "@navikt/ds-css";
import "@navikt/arbeidsforhold/index.css";

const localeUrlPattern = new RegExp(`${basePath}(/en|/nb|/nn)($|\\/)`);

const App = () => {
    const { locale } = useIntl();
    const [, dispatch] = useStore();
    const runtimeConfig = useRuntimeConfig();
    const redirectPath = getRedirectPathFromParam();

    useEffect(() => {
        if (runtimeConfig.env === "local") {
            return;
        }
        initializeFaro({
            url: runtimeConfig.telemetryUrl,
            app: {
                name: "personopplysninger",
                version: runtimeConfig.buildVersion,
            },
        });
    }, [runtimeConfig]);

    useEffect(() => {
        // Reset forms dersom locale endrer seg
        dispatch({ type: "INCREASE_FORM_KEY" });
    }, [locale, dispatch]);

    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    const basePathWithLanguage = `${basePath}/${locale}`;

    return (
        <div className="pagecontent">
            <div className="wrapper">
                <Router>
                    <RedirectToLocale>
                        <WithAuth>
                            {redirectPath ? (
                                <Navigate replace={true} to={redirectPath} />
                            ) : (
                                <Routes>
                                    <Route caseSensitive={true} path={"/"} element={<Navigate to={`${basePath}/nb/`} />} />
                                    <Route path={`${basePathWithLanguage}/`} element={<Forside />} />
                                    <Route
                                        caseSensitive={true}
                                        path={`${basePathWithLanguage}/arbeidsforhold`}
                                        element={<Navigate replace={true} to={`${basePathWithLanguage}/#arbeidsforhold`} />}
                                    />
                                    <Route
                                        caseSensitive={true}
                                        path={`${basePathWithLanguage}/arbeidsforhold/:id`}
                                        element={<DetaljertArbeidsforhold />}
                                    />
                                    <Route caseSensitive={true} path={`${basePathWithLanguage}/dsop`} element={<DsopHistorikk />} />
                                    <Route caseSensitive={true} path={`${basePathWithLanguage}/dsop/:id`} element={<DsopDetaljer />} />
                                    <Route caseSensitive={true} path={`${basePathWithLanguage}/institusjonsopphold`} element={<InstHistorikk />} />
                                    <Route caseSensitive={true} path={`${basePathWithLanguage}/institusjonsopphold/:id`} element={<InstDetaljer />} />
                                    {tillatteTjenester.map((tjeneste) => (
                                        <Fragment key={tjeneste}>
                                            <Route
                                                caseSensitive={true}
                                                path={`${basePathWithLanguage}/sendt-fra/${tjeneste}/:redirectUrl`}
                                                element={<EndreOpplysninger tjeneste={tjeneste} />}
                                            />
                                            <Route
                                                caseSensitive={true}
                                                path={`${basePathWithLanguage}/endre-opplysninger/sendt-fra/${tjeneste}/:redirectUrl`}
                                                element={<EndreOpplysninger tjeneste={tjeneste} />}
                                            />
                                        </Fragment>
                                    ))}
                                    <Route
                                        caseSensitive={true}
                                        path={`${basePathWithLanguage}/medlemskap-i-folketrygden`}
                                        element={<MedlHistorikk />}
                                    />
                                    <Route caseSensitive={true} path={`${basePathWithLanguage}/endre-kontonummer`} element={<EndreKontonummer />} />
                                    <Route path="*" element={<PageNotFound />} />
                                </Routes>
                            )}
                        </WithAuth>
                    </RedirectToLocale>
                </Router>
            </div>
        </div>
    );
};

const RedirectToLocale = (props: { children: JSX.Element }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [{ locale }] = useStore();

    useEffect(() => {
        const urlHasLocale = localeUrlPattern.test(location.pathname);

        if (!urlHasLocale) {
            const redirectTo = `${location.pathname.replace(`${basePath}`, `${basePath}/${locale}`)}${location.hash}`;

            navigate(redirectTo);
        }
    }, [locale, location, history]);
    return props.children;
};

export default App;
