import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import jwt_decode from "jwt-decode";

import { Provider } from 'react-redux';
//import { store } from './redux/store';
import { persistStore } from 'redux-persist';

import configureStore from "./store/configureStore";
import { setUserId } from "./store/users";
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/es/integration/react';

const store = configureStore();
//import store from '../src/store/store'
const persistor = persistStore(store)
store.subscribe(()=>console.log(store.getState()))
const root = ReactDOM.createRoot(document.getElementById('root'));

const isAuthenticated = localStorage.getItem("TOKEN_KEY");
try {
  const decoded = jwt_decode(isAuthenticated);
  const userId = decoded._id; 
// Dispatch the setUserId action with the user ID
store.dispatch(setUserId(userId));
  // valid token format
} catch(error) {
  // invalid token format
  console.log(error);
}


root.render(
  <React.StrictMode>
   <Provider store={store} >
    
   <App />
   </Provider>
  </React.StrictMode>
);

reportWebVitals();
