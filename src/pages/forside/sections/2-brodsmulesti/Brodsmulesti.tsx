import { onBreadcrumbClick, onLanguageSelect, setAvailableLanguages, setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { runtimeEnvironment } from "@/config/runtimeEnvironment";
import { basePath } from "@/constants";
import { useStore } from "@/store/Context";

export interface BrodsmuleLenke {
    title: string;
    path?: string;
}

interface BrodsmulestiProps {
    hierarki?: BrodsmuleLenke[];
    pathname?: string;
}

const Brodsmulesti = (props: BrodsmulestiProps) => {
    const [{ locale }] = useStore();
    const { formatMessage } = useIntl();
    const { hierarki, pathname = typeof window === "undefined" ? "" : window.location.pathname } = props;

    useEffect(() => {
        onBreadcrumbClick((breadcrumb) => {
            window.location.assign(breadcrumb.url);
        });

        onLanguageSelect((language) => {
            if (language.url) {
                window.location.assign(language.url);
            }
        });

        setAvailableLanguages([
            {
                url: `${pathname.replace(/\/(nn|en)(\/|$)/, "/nb/")}`,
                locale: "nb",
            },
            {
                url: `${pathname.replace(/\/(nb|nn)(\/|$)/, "/en/")}`,
                locale: "en",
            },
            {
                url: `${pathname.replace(/\/(nb|en)(\/|$)/, "/nn/")}`,
                locale: "nn",
            },
        ]);
    }, [pathname]);

    // Set breadcrumbs in decorator
    useEffect(() => {
        const baseBreadcrumbs = [
            {
                url: runtimeEnvironment.dittNavUrl,
                title: formatMessage({ id: "brodsmulesti.minside" }),
            },
            {
                url: `${basePath}/${locale}/`,
                title: formatMessage({ id: "brodsmulesti.dinepersonopplysninger" }),
            },
        ];

        const appBreadcrumbs =
            hierarki?.map((lenke) => ({
                url: `${basePath}/${locale}${lenke.path ?? ""}`,
                title: formatMessage({ id: lenke.title }, { br: () => "" }),
            })) ?? [];

        const breadcrumbs = baseBreadcrumbs.concat(appBreadcrumbs);
        setBreadcrumbs(breadcrumbs);
    }, [formatMessage, hierarki, locale]);

    return <></>;
};
export default Brodsmulesti;
