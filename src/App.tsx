import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from './store/Context';
import { initializeFaro } from '@grafana/faro-web-sdk';
import DetaljertArbeidsforhold from './pages/detaljert-arbeidsforhold/DetaljertArbeidsforhold';
import Forside from './pages/forside/Forside';
import EndreOpplysninger from './pages/endre-personopplysninger/EndreOpplysninger';
import PageNotFound from './pages/404/404';
import { getRedirectPathFromParam, tillatteTjenester } from './utils/redirects';
import InstHistorikk from './pages/institusjonsopphold/historikk/InstHistorikk';
import InstDetaljer from './pages/institusjonsopphold/detaljer/InstDetaljer';
import DsopHistorikk from './pages/digital-samhandling-offentlig-privat/historikk/DsopHistorikk';
import DsopDetaljer from './pages/digital-samhandling-offentlig-privat/detaljer/DsopDetaljer';
import MedlHistorikk from './pages/medlemskap-i-folketrygden/MedlHistorikk';
import { WithAuth } from './store/providers/WithAuth';
// Import this early, to ensure our own CSS gets higher specificity
import '@navikt/ds-css';

export const basePath = '/person/personopplysninger';

const localeUrlPattern = new RegExp(`${basePath}(/en|/nb|/nn)($|\\/)`);

initializeFaro({
    url: process.env.REACT_APP_TELEMETRY_URL,
    app: {
        name: 'personopplysninger',
        version: process.env.REACT_APP_VERSION,
    },
});

const App = () => {
    const { locale } = useIntl();
    const [, dispatch] = useStore();
    const redirectPath = getRedirectPathFromParam();

    useEffect(() => {
        // Reset forms dersom locale endrer seg
        dispatch({ type: 'INCREASE_FORM_KEY' });
    }, [locale, dispatch]);

    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    const basePathWithLanguage = `${basePath}/${locale}`;

    return (
        <div role={'main'} className="pagecontent">
            <div className="wrapper">
                <Router>
                    <RedirectToLocale>
                        <WithAuth>
                            <Routes>
                                {redirectPath && <Navigate to={redirectPath} />}
                                <Route caseSensitive={true} path={'/'} element={<Navigate to={`${basePath}/nb/`} />} />
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
                                    // react-router-dom no longes support regex in path
                                    // therefore, iterate each tjeneste and add as separate path. This is not ideal, but works for now.
                                    <Route
                                        caseSensitive={true}
                                        path={`${basePathWithLanguage}/sendt-fra/${tjeneste}/:redirectUrl`}
                                        element={<EndreOpplysninger tjeneste={tjeneste} />}
                                        key={tjeneste}
                                    />
                                ))}
                                {tillatteTjenester.map((tjeneste) => (
                                    // react-router-dom no longes support regex in path
                                    // therefore, iterate each tjeneste and add as separate path. This is not ideal, but works for now.
                                    <Route
                                        caseSensitive={true}
                                        path={`${basePathWithLanguage}/endre-opplysninger/sendt-fra/${tjeneste}/:redirectUrl`}
                                        element={<EndreOpplysninger tjeneste={tjeneste} />}
                                        key={tjeneste}
                                    />
                                ))}

                                <Route caseSensitive={true} path={`${basePathWithLanguage}/medlemskap-i-folketrygden`} element={<MedlHistorikk />} />
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

export default App;
