import React from 'react';
import ReactDOM from 'react-dom';
import App from 'js/App';
import api from 'js/Api';

import 'css/index.css';

ReactDOM.render(<App api={api} />, document.getElementById('app')); // eslint-disable-line
