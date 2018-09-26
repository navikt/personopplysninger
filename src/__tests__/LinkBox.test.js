import * as React from 'react';
import LinkBox from 'js/components/LinkBox';
import wrapIntl from 'js/IntlTestHelper';
const ReactTestRenderer = require('react-test-renderer');

test('render LinkBox with content', () => {
  const link = {
    header: 'Pensjon',
    information: 'NAV har opplysninger om din pensjon i en egen tjeneste.',
    linkText: 'Gå til Din pensjon',
    url: 'https://www.nav.no/no/Person/Pensjon/Hva+kan+jeg+fa+i+pensjon',
    kilde: 'Pensjonsregisteret',
  };

  const component = ReactTestRenderer.create(wrapIntl(<LinkBox
    header={link.header}
    information={link.information}
    url={link.url}
    linkText={link.linkText}
    kilde={link.kilde}
  />));
  expect(component.toJSON()).toMatchSnapshot();
});
