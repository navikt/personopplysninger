import React from 'react';
import ReactDOM from 'react-dom';
import App from 'js/App';
import wrapIntl from 'js/IntlTestHelper';

const mockApi = () => ({
  fetchPersonInfo: () => new Promise((resolve, reject) => {}), //eslint-disable-line
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(wrapIntl(<App api={mockApi()} />), div);
  ReactDOM.unmountComponentAtNode(div);
});
