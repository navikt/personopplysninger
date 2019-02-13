import * as React from 'react';
import ContentWrapper from 'js/ContentWrapper';
import wrapIntl from 'js/IntlTestHelper';
import initialState from '../js/initialState';
import ShallowRenderer from 'react-test-renderer/shallow';

test('render ContentWrapper with content', () => {
  const renderer = new ShallowRenderer()
  const result = renderer.render(wrapIntl(<ContentWrapper
    personalia={initialState.personalia}
    adresser={initialState.adresser}
  />));
  expect(result).toMatchSnapshot()
});
