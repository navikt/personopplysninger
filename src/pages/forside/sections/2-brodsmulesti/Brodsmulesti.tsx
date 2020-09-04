import React, { useEffect } from "react";
import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import { useIntl } from "react-intl";

export interface BrodsmuleLenke {
  title: string;
  path?: string;
}

interface BrodsmulestiProps {
  hierarki?: BrodsmuleLenke[];
}

const Brodsmulesti = (props: BrodsmulestiProps) => {
  const { formatMessage: msg } = useIntl();

  // Set breadcrumbs in decorator
  useEffect(() => {
    const breadcrumbs = [
      {
        name: msg({ id: "side.tittel" }),
        url: process.env.REACT_APP_URL as string,
      },
      ...(props.hierarki?.map((lenke) => ({
        name: msg({ id: lenke.title }),
        url: lenke.path || "",
      })) || []),
    ];
    setBreadcrumbs(breadcrumbs);
  }, [msg, props.hierarki]);

  return <></>;
};
export default Brodsmulesti;
