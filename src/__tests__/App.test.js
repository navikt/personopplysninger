import React from 'react';
import ReactDOM from 'react-dom';
import App from 'js/App';
const ReactTestRenderer = require('react-test-renderer');

const mockApi = () => {
  return {
    fetchPersonInfo: () => new Promise((resolve, reject) => {}),
  }
};

const flushPromises = () => {
  return new Promise(resolve => setImmediate(resolve));
};

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<App api={mockApi()} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
