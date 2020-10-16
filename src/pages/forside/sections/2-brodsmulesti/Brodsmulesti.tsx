import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useLocation, useHistory } from "react-router-dom";
import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import { onBreadcrumbClick } from "@navikt/nav-dekoratoren-moduler";
import { basePath } from "../../../../App";

export interface BrodsmuleLenke {
  title: string;
  path?: string;
}

interface BrodsmuleProps {
  className?: string;
  children: "" | JSX.Element | JSX.Element[];
}

interface BrodsmulestiProps {
  hierarki?: BrodsmuleLenke[];
}

const Brodsmulesti = (props: BrodsmulestiProps) => {
  const { formatMessage } = useIntl();
  const location = useLocation();
  const history = useHistory();
  const { hierarki } = props;

  onBreadcrumbClick((breadcrumb) => {
    history.push(breadcrumb.url);
  });

  // Set breadcrumbs in decorator
  useEffect(() => {
    const baseBreadcrumbs = [
      {
        url: `${process.env.REACT_APP_TJENESTER_URL}/dittnav`,
        title: formatMessage({ id: "brodsmulesti.dittnav" }),
      },
      {
        url: `${basePath}`,
        title: formatMessage({ id: "brodsmulesti.dinepersonopplysninger" }),
        handleInApp: true,
      },
    ];

    const appBreadcrumbs =
      hierarki?.map((lenke) => ({
        url: `${basePath}${lenke.path || ""}`,
        title: formatMessage({ id: lenke.title }, { br: () => "" }),
        handleInApp: lenke.path?.includes("/") || false,
      })) || [];

    const breadcrumbs = baseBreadcrumbs.concat(appBreadcrumbs);
    setBreadcrumbs(breadcrumbs);
  }, [formatMessage, hierarki, location]);

  return <></>;
};
export default Brodsmulesti;
