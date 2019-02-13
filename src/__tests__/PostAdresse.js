import * as React from 'react';
import wrapIntl from 'js/IntlTestHelper';
import PostAdresse from 'js/components/adresse/PostAdresse';
const ReactTestRenderer = require('react-test-renderer');

test('render Postadresse with content', () => {
  const postadresse = {
    adresse1: "12345 HFJEF IQUFJ HFURHGHQBEUQ",
    adresse2: "BATOOM LUNCHAGRAMA,GONGRUPEA,DD",
    adresse3: "GGLAM,10000 HCAMGHU,THAILAND",
    datoFraOgMed: "2018-03-13",
    land: "THA",
    postnummer: "9913"
  };

  const component = ReactTestRenderer.create(wrapIntl(<PostAdresse
    adresse1={postadresse.adresse1}
    adresse2={postadresse.adresse2}
    adresse3={postadresse.adresse3}
    datoFraOgMed={postadresse.datoFraOgMed}
    kilde={postadresse.kilde}
    land={postadresse.land}
    postnummer={postadresse.postnummer}
  />));
  expect(component.toJSON()).toMatchSnapshot();
});
