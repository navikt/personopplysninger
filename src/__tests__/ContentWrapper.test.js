import * as React from 'react';
import ContentWrapper from 'js/ContentWrapper';
import wrapIntl from 'js/IntlTestHelper';
import initialState from '../js/initialStateNy';
import ShallowRenderer from 'react-test-renderer/shallow';

test('render ContentWrapper with content', () => {
  const renderer = new ShallowRenderer()
  const result = renderer.render(wrapIntl(<ContentWrapper userInfo={initialState} />));
  expect(result).toMatchSnapshot()
});
