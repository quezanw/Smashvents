/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { PersistGate } from 'redux-persist/lib/integration/react';
import App from './components/App/App.js';
import reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['modal'],
  stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
 };


 const pReducer = persistReducer(persistConfig, reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));
const store = createStore(pReducer, composeEnhancers(applyMiddleware(reduxThunk)));
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App/>
    </PersistGate>
  </Provider>,
  document.querySelector('#root')
)