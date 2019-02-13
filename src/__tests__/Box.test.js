import * as React from 'react';
import Box from 'js/components/Box';
import wrapIntl from 'js/IntlTestHelper';
const ReactTestRenderer = require('react-test-renderer');

test('render Header with content', () => {
  const component = ReactTestRenderer.create(wrapIntl(<Box header="Arbeidsforhold">
    <h3>Header</h3>
    <div>content</div>
  </Box>));
  expect(component.toJSON()).toMatchSnapshot();
});
