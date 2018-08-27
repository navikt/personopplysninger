import * as React from 'react';
import Personalia from 'js/components/Personalia';
import { IntlProvider } from 'react-intl';
const ReactTestRenderer = require('react-test-renderer');

test('render Personalia with content', () => {
  const properties = {
    navn: {
      datoFraOgMed: '12.08.2008',
      forkortetNavn: 'Ole',
      fornavn: 'Ole',
      kilde: 'string',
      mellomnavn: '',
      slektsnavn: 'Nordmann',
      slektsnavnUgift: 'Nordmann',
    },
    ident: '08048503978',
    statsborgerskap: {
      datoFraOgMed: '12.08.2008',
      kilde: 'D',
      kode: 'Norsk',
    },
    status: {
      datoFraOgMed: '12.08.2008',
      kilde: 'D',
      kode: '',
    },
    telefon: {
      jobb: '12345678',
      jobbDatoRegistrert: '12.08.2010',
      jobbKilde: 'J',
      mobil: '47474747',
      mobilDatoRegistrert: '21.10.2012',
      mobilKilde: 'M',
      privat: '51515151',
      privatDatoRegistrert: '12.06.2008',
      privatKilde: 'P',
    },
    tiltak: {
      datoFraOgMed: '12.03.2018',
      datoTil: '12.03.2023',
      kilde: 'T',
      type: 'Kun telefonkontakt',
    },
    kjonn: 'Mann',
    spraak: {
      datoFraOgMed: '12.03.2009',
      kilde: 'S',
      kode: 'Norsk',
    },
    sivilstand: {
      datoFraOgMed: '12.08.2017',
      kilde: 'S',
      kode: 'Gift',
    },
    kontonummer: {
      datoFraOgMed: '12.08.2019',
      kilde: 'K',
      kode: '12345678911',
    },
    spesreg: {
      datoFraOgMed: '12.08.2019',
      kilde: 'K',
      kode: '12345678911',
    },
  };

  const component = ReactTestRenderer.create((
    <IntlProvider locale="en">
      <Personalia
        navn={properties.navn}
        ident={properties.ident}
        statsborgerskap={properties.statsborgerskap}
        status={properties.status}
        telefon={properties.telefon}
        tiltak={properties.tiltak}
        kjonn={properties.kjonn}
        spraak={properties.spraak}
        sivilstand={properties.sivilstand}
        kontonummer={properties.kontonummer}
        spesreg={properties.spesreg}
      />
    </IntlProvider>));
  expect(component.toJSON()).toMatchSnapshot();
});
