import React from "react";
import { IntlProvider, addLocaleData } from "react-intl";
import nb from "react-intl/locale-data/nb";
import nbMessages from "../../translations/nb";

addLocaleData([...nb]);

const wrapIntl = (children: JSX.Element, props = { locale: "nb" }): any => (
  <IntlProvider {...props} messages={nbMessages}>
    {children}
  </IntlProvider>
);

export default wrapIntl;
