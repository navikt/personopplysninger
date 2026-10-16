import { initializeFaro } from "@grafana/faro-web-sdk";
import { Fragment, useEffect } from "react";
import { useIntl } from "react-intl";
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { basePath } from "./constants";
import PageNotFound from "./pages/404/404";
import DetaljertArbeidsforhold from "./pages/detaljert-arbeidsforhold/DetaljertArbeidsforhold";
import DsopDetaljer from "./pages/digital-samhandling-offentlig-privat/detaljer/DsopDetaljer";
import DsopHistorikk from "./pages/digital-samhandling-offentlig-privat/historikk/DsopHistorikk";
import { EndreKontonummer } from "./pages/endre-kontonummer/EndreKontonummer";
import EndreOpplysninger from "./pages/endre-personopplysninger/EndreOpplysninger";
import Forside from "./pages/forside/Forside";
import InstDetaljer from "./pages/institusjonsopphold/detaljer/InstDetaljer";
import InstHistorikk from "./pages/institusjonsopphold/historikk/InstHistorikk";
import MedlHistorikk from "./pages/medlemskap-i-folketrygden/MedlHistorikk";
import { useStore } from "./store/Context";
import { WithAuth } from "./store/providers/WithAuth";
import { getRedirectPathFromParam, tillatteTjenester } from "./utils/redirects";

import "@navikt/ds-css";
import "@navikt/arbeidsforhold/index.css";

const localeUrlPattern = new RegExp(`${basePath}(/en|/nb|/nn)($|\\/)`);
if (import.meta.env.VITE_ENV !== "local") {
    initializeFaro({
        url: import.meta.env.VITE_TELEMETRY_URL,
        app: {
            name: "personopplysninger",
            version: import.meta.env.VITE_BUILD_VERSION,
        },
    });
}

const App = () => {
    const { locale } = useIntl();
    const [, dispatch] = useStore();
    const redirectPath = getRedirectPathFromParam();

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
                            <Routes>
                                {redirectPath && <Navigate to={redirectPath} />}
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
                                    element={<DetaljertArbeidsforholdRoute />}
                                />
                                <Route caseSensitive={true} path={`${basePathWithLanguage}/dsop`} element={<DsopHistorikk />} />
                                <Route caseSensitive={true} path={`${basePathWithLanguage}/dsop/:id`} element={<DsopDetaljerRoute />} />
                                <Route caseSensitive={true} path={`${basePathWithLanguage}/institusjonsopphold`} element={<InstHistorikk />} />
                                <Route
                                    caseSensitive={true}
                                    path={`${basePathWithLanguage}/institusjonsopphold/:id`}
                                    element={<InstDetaljerRoute />}
                                />
                                {tillatteTjenester.map((tjeneste) => (
                                    <Fragment key={tjeneste}>
                                        <Route
                                            caseSensitive={true}
                                            path={`${basePathWithLanguage}/sendt-fra/${tjeneste}/:redirectUrl`}
                                            element={<EndreOpplysningerRoute tjeneste={tjeneste} />}
                                        />
                                        <Route
                                            caseSensitive={true}
                                            path={`${basePathWithLanguage}/endre-opplysninger/sendt-fra/${tjeneste}/:redirectUrl`}
                                            element={<EndreOpplysningerRoute tjeneste={tjeneste} />}
                                        />
                                    </Fragment>
                                ))}
                                <Route caseSensitive={true} path={`${basePathWithLanguage}/medlemskap-i-folketrygden`} element={<MedlHistorikk />} />
                                <Route caseSensitive={true} path={`${basePathWithLanguage}/endre-kontonummer`} element={<EndreKontonummerRoute />} />
                                <Route element={<PageNotFound />} />
                            </Routes>
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

const DetaljertArbeidsforholdRoute = () => {
    const { id } = useParams();
    return <DetaljertArbeidsforhold id={id} />;
};

const DsopDetaljerRoute = () => {
    const { id } = useParams();
    return <DsopDetaljer id={id} />;
};

const InstDetaljerRoute = () => {
    const { id } = useParams();
    return <InstDetaljer id={id} />;
};

const EndreOpplysningerRoute = ({ tjeneste }: { tjeneste: string }) => {
    const { redirectUrl } = useParams();
    return <EndreOpplysninger tjeneste={tjeneste} redirectUrl={redirectUrl} />;
};

const EndreKontonummerRoute = () => {
    const location = useLocation();
    const state = location.state as { backTo?: string } | null;
    const backTo = state?.backTo ?? new URLSearchParams(location.search).get("backTo") ?? undefined;

    return <EndreKontonummer backTo={backTo} />;
};

export default App;
