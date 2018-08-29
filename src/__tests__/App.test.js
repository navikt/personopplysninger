import React from 'react';
import ReactDOM from 'react-dom';
import App from 'js/App';
const ReactTestRenderer = require('react-test-renderer');
import wrapIntl from 'js/IntlTestHelper';

const mockApi = () => ({
  fetchPersonInfo: () => new Promise((resolve, reject) => {}),
});

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(wrapIntl(<App api={mockApi()} />), div);
  ReactDOM.unmountComponentAtNode(div);
});
