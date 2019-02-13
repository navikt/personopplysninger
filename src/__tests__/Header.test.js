import * as React from 'react';
import Header from 'js/components/Header';
import wrapIntl from 'js/IntlTestHelper';
const ReactTestRenderer = require('react-test-renderer');

test('render Header with content', () => {
  const component = ReactTestRenderer.create(wrapIntl(<Header
    fornavn="Donald"
  />));
  expect(component.toJSON()).toMatchSnapshot();
});
