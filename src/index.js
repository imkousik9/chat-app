import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ApolloProvider from './lib/ApolloProvider';
import { StateProvider } from './store/StateProvider';
import reducer, { initialState } from './store/reducer';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider>
      <StateProvider reducer={reducer} initialState={initialState}>
        <App />
      </StateProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
