import React from 'react';
import ReactDOM from 'react-dom/client';
import {configureStore} from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import authUser from './reducers/authReducer';



const store = configureStore({  //creating store for reduc and including reducers here
  reducer: {
    auth: authUser
  }
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
 
     <Provider store={store}>
    <App />
    </Provider>
 
  
);
console.log("STRIPE_KEY is", process.env.REACT_APP_STRIPE_KEY);
console.log("ENVIRONEMT is", process.env.NODE_ENV);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();