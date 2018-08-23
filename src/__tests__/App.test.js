import React from 'react';
import ReactDOM from 'react-dom';
import App from 'js/App';
const ReactTestRenderer = require('react-test-renderer');
import { IntlProvider } from 'react-intl';


const mockApi = () => ({
  fetchPersonInfo: () => new Promise((resolve, reject) => {}),
});

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <IntlProvider locale="en">
      <App api={mockApi()} />
    </IntlProvider>
    , div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
