import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import './styles/index.css';
import TokenLayer from './TokenLayer';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <TokenLayer />
        </Provider>
    </React.StrictMode>
);
