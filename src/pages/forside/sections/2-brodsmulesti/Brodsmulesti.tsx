import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useLocation, useNavigate } from 'react-router-dom';
import { setAvailableLanguages } from '@navikt/nav-dekoratoren-moduler';
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { onLanguageSelect } from '@navikt/nav-dekoratoren-moduler';
import { onBreadcrumbClick } from '@navikt/nav-dekoratoren-moduler';
import { useStore } from 'store/Context';
import { Locale } from 'store/Store';
import { basePath } from '../../../../constants';

export interface BrodsmuleLenke {
    title: string;
    path?: string;
}

interface BrodsmulestiProps {
    hierarki?: BrodsmuleLenke[];
}

const Brodsmulesti = (props: BrodsmulestiProps) => {
    const [{ locale }, dispatch] = useStore();
    const { formatMessage } = useIntl();
    const location = useLocation();
    const navigate = useNavigate();
    const { hierarki } = props;

    onBreadcrumbClick((breadcrumb) => {
        navigate(breadcrumb.url);
    });

    onLanguageSelect((language) => {
        dispatch({ type: 'SETT_LOCALE', payload: language.locale as Locale });
        navigate(language.url!);
    });

    useEffect(() => {
        setAvailableLanguages([
            {
                url: `${location.pathname.replace(/\/(nn|en)(\/|$)/, '/nb/')}`,
                locale: 'nb',
                handleInApp: true,
            },
            {
                url: `${location.pathname.replace(/\/(nb|nn)(\/|$)/, '/en/')}`,
                locale: 'en',
                handleInApp: true,
            },
            {
                url: `${location.pathname.replace(/\/(nb|en)(\/|$)/, '/nn/')}`,
                locale: 'nn',
                handleInApp: true,
            },
        ]);
    }, [location]);

    // Set breadcrumbs in decorator
    useEffect(() => {
        const baseBreadcrumbs = [
            {
                url: `${process.env.REACT_APP_DITT_NAV_URL}`,
                title: formatMessage({ id: 'brodsmulesti.minside' }),
            },
            {
                url: `${basePath}/${locale}/`,
                title: formatMessage({ id: 'brodsmulesti.dinepersonopplysninger' }),
                handleInApp: true,
            },
        ];

        const appBreadcrumbs =
            hierarki?.map((lenke) => ({
                url: `${basePath}/${locale}${lenke.path || ''}`,
                title: formatMessage({ id: lenke.title }, { br: () => '' }),
                handleInApp: lenke.path?.includes('/') || false,
            })) || [];

        const breadcrumbs = baseBreadcrumbs.concat(appBreadcrumbs);
        setBreadcrumbs(breadcrumbs);
    }, [formatMessage, hierarki, location, locale]);

    return <></>;
};
export default Brodsmulesti;
