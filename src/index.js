/* eslint-disable import/default */
import React from 'react';
import { render } from 'react-dom';

import './styles/main.scss';
import './assets/favicon.ico';
import './semantic/dist/semantic.min.css';
import App from './containers/App';

render(<App />, document.getElementById('root'));
