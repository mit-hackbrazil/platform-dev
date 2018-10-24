import React from 'react';
import ReactDOM from 'react-dom';
//blueprintjs
import "@blueprintjs/core/lib/css/blueprint.css";
import "normalize.css/normalize.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import './index.css';

import App from './App';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
