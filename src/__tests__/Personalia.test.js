import * as React from 'react';
import wrapIntl from 'js/IntlTestHelper';
import Personalia from 'js/components/Personalia';
const ReactTestRenderer = require('react-test-renderer');

test('render Personalia with content', () => {
  const personalia = {
    fornavn: '',
    etternavn: '',
    personident: {
      verdi: '',
      type: '',
    },
    kontonr: '',
    tlfnr: {
      jobb: '',
      mobil: '',
      privat: '',
    },
    spraak: '',
    epostadr: '',
    statsborgerskap: '',
    foedested: '',
    sivilstand: '',
    kjoenn: '',
  };

  const component = ReactTestRenderer.create(wrapIntl(<Personalia
    fornavn={personalia.fornavn}
    etternavn={personalia.etternavn}
    personident={personalia.personident}
    kontonr={personalia.kontonr}
    tlfnr={personalia.tlfnr}
    spraak={personalia.spraak}
    epostadr={personalia.epostadr}
    statsborgerskap={personalia.statsborgerskap}
    foedested={personalia.foedested}
    sivilstand={personalia.sivilstand}
    kjoenn={personalia.kjoenn}
  />));
  expect(component.toJSON()).toMatchSnapshot();
});
