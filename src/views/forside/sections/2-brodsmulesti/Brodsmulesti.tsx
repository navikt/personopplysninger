import { onBreadcrumbClick, onLanguageSelect, setAvailableLanguages, setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import { basePath } from "@/constants";
import { useRuntimeConfig } from "@/runtime-config/RuntimeConfigContext";
import { useStore } from "@/store/Context";
import type { Locale } from "@/store/Store";

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
    const runtimeConfig = useRuntimeConfig();

    onBreadcrumbClick((breadcrumb) => {
        navigate(breadcrumb.url);
    });

    onLanguageSelect((language) => {
        dispatch({ type: "SETT_LOCALE", payload: language.locale as Locale });
        navigate(language.url!);
    });

    useEffect(() => {
        setAvailableLanguages([
            {
                url: `${location.pathname.replace(/\/(nn|en)(\/|$)/, "/nb/")}`,
                locale: "nb",
                handleInApp: true,
            },
            {
                url: `${location.pathname.replace(/\/(nb|nn)(\/|$)/, "/en/")}`,
                locale: "en",
                handleInApp: true,
            },
            {
                url: `${location.pathname.replace(/\/(nb|en)(\/|$)/, "/nn/")}`,
                locale: "nn",
                handleInApp: true,
            },
        ]);
    }, [location]);

    // Set breadcrumbs in decorator
    useEffect(() => {
        const baseBreadcrumbs = [
            {
                url: `${runtimeConfig.dittNavUrl}`,
                title: formatMessage({ id: "brodsmulesti.minside" }),
            },
            {
                url: `${basePath}/${locale}/`,
                title: formatMessage({ id: "brodsmulesti.dinepersonopplysninger" }),
                handleInApp: true,
            },
        ];

        const appBreadcrumbs =
            hierarki?.map((lenke) => ({
                url: `${basePath}/${locale}${lenke.path ?? ""}`,
                title: formatMessage({ id: lenke.title }, { br: () => "" }),
                handleInApp: lenke.path?.includes("/") ?? false,
            })) ?? [];

        const breadcrumbs = baseBreadcrumbs.concat(appBreadcrumbs);
        setBreadcrumbs(breadcrumbs);
    }, [formatMessage, hierarki, location, locale, runtimeConfig]);

    return <></>;
};
export default Brodsmulesti;
