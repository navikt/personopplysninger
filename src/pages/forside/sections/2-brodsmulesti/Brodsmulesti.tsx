import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useLocation, useHistory } from "react-router-dom";
import { setAvailableLanguages } from "@navikt/nav-dekoratoren-moduler";
import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import { onLanguageSelect } from "@navikt/nav-dekoratoren-moduler";
import { onBreadcrumbClick } from "@navikt/nav-dekoratoren-moduler";
import { basePath } from "App";
import { useStore } from "store/Context";
import { Locale } from "store/Store";

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
  const history = useHistory();
  const { hierarki } = props;

  onBreadcrumbClick((breadcrumb) => {
    history.push(breadcrumb.url);
  });

  onLanguageSelect((language) => {
    dispatch({ type: "SETT_LOCALE", payload: language.locale as Locale });
    history.push(language.url!);
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
        url: `${process.env.REACT_APP_DITT_NAV_URL}`,
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
        url: `${basePath}/${locale}${lenke.path || ""}`,
        title: formatMessage({ id: lenke.title }, { br: () => "" }),
        handleInApp: lenke.path?.includes("/") || false,
      })) || [];

    const breadcrumbs = baseBreadcrumbs.concat(appBreadcrumbs);
    setBreadcrumbs(breadcrumbs);
  }, [formatMessage, hierarki, location, locale]);

  return <></>;
};
export default Brodsmulesti;
