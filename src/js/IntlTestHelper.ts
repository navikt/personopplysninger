import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import nb from 'react-intl/locale-data/nb';
import nbMessages from '../translations/nb.json';

addLocaleData([...nb]);

const wrapIntl = (children, props = { locale: 'nb' }) => (
  <IntlProvider {...props} messages={nbMessages} >
    {children}
  </IntlProvider>
);

export default wrapIntl;
