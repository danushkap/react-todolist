import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Route path='/' component={App} />
        </BrowserRouter>
    </React.StrictMode>
);
