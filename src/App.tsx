import { Fragment, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from './store/Context';
import { initializeFaro } from '@grafana/faro-react';
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
import { EndreKontonummer } from './pages/endre-kontonummer/EndreKontonummer';
import { initLocalMock as initLocalArbeidsforholdMock } from '@navikt/arbeidsforhold';
import { basePath } from './constants';

import '@navikt/ds-css';
import '@navikt/arbeidsforhold/style.css';

const localeUrlPattern = new RegExp(`${basePath}(/en|/nb|/nn)($|\\/)`);
if (import.meta.env.VITE_ENV !== 'local') {
    initializeFaro({
        url: import.meta.env.VITE_TELEMETRY_URL,
        app: {
            name: 'personopplysninger',
            version: import.meta.env.VITE_BUILD_VERSION,
        },
    });
}

if (import.meta.env.VITE_ENV === 'local') {
    initLocalArbeidsforholdMock();
}

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
        <div className="pagecontent">
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
                                <Route caseSensitive={true} path={`${basePathWithLanguage}/medlemskap-i-folketrygden`} element={<MedlHistorikk />} />
                                <Route caseSensitive={true} path={`${basePathWithLanguage}/endre-kontonummer`} element={<EndreKontonummer />} />
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
