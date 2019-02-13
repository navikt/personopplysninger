import * as React from 'react';
import wrapIntl from 'js/IntlTestHelper';
import LinksContainer from 'js/containers/LinksContainer';
const ReactTestRenderer = require('react-test-renderer');

test('render LinksContainer with content', () => {
  const component = ReactTestRenderer.create(wrapIntl(<LinksContainer />));
  expect(component.toJSON()).toMatchSnapshot();
});
