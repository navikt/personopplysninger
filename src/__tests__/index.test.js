import React from 'react';
import ReactDOM from 'react-dom';
import nb from 'react-intl/locale-data/nb';
import en from 'react-intl/locale-data/en';
import App from '../js/App';
import api from '../js/Api';
import { IntlProvider, addLocaleData } from 'react-intl';
import nbMessages from '../translations/nb.json';
import enMessages from '../translations/en.json';

const messages = {
  nb: nbMessages,
  en: enMessages,
};

const browserLanguage = 'en';

addLocaleData([...nb, ...en]);

jest.mock('react-dom', () => ({ render: jest.fn() }));

it('index renders without crashing', () => {
  require('../index');
  expect(ReactDOM.render).toHaveBeenCalledWith(<IntlProvider locale={browserLanguage} messages={messages[browserLanguage]}>
    <App api={api} />
  </IntlProvider>, null);
});
