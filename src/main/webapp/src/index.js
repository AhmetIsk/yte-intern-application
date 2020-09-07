// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
//
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

import history from './history';
import { Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import React from 'react';

const rootElement = document.getElementById('root');


ReactDOM.render(
    <Router history={history} >
        <App />
    </Router>,
    rootElement
);

registerServiceWorker();
