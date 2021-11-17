import './index.css';

import { initializeApp } from 'firebase/app';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { firebaseConfig } from './Utils/firebaseConfig';

initializeApp(firebaseConfig);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
