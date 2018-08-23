import * as React from 'react';
import ContentWrapper from 'js/ContentWrapper';
import { IntlProvider } from 'react-intl';
import initialState from '../js/initialState';
const ReactTestRenderer = require('react-test-renderer');

test('render ContentWrapper with content', () => {
  const component = ReactTestRenderer.create((
    <IntlProvider locale="en"><ContentWrapper
      userInfo={initialState}
    />
    </IntlProvider>));
  expect(component.toJSON()).toMatchSnapshot();
});
