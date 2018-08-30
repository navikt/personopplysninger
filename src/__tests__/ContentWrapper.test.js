import * as React from 'react';
import ContentWrapper from 'js/ContentWrapper';
import { IntlProvider } from 'react-intl';
import wrapIntl from 'js/IntlTestHelper';
import initialState from '../js/initialState';
const ReactTestRenderer = require('react-test-renderer');

test('render ContentWrapper with content', () => {
  const component = ReactTestRenderer.create(wrapIntl(<ContentWrapper userInfo={initialState} />));
  expect(component.toJSON()).toMatchSnapshot();
});
