import * as React from 'react';
import Error from 'js/components/Error';
import wrapIntl from 'js/IntlTestHelper';
const ReactTestRenderer = require('react-test-renderer');

test('render Error', () => {
  const component = ReactTestRenderer.create(wrapIntl(<Error
    statusCode={500}
  />));
  expect(component.toJSON()).toMatchSnapshot();
});
