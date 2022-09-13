import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter
} from "react-router-dom";

import App from './App';
import {store} from './redux/store';
import { Provider } from 'react-redux'



const rootElem = ReactDOM.createRoot(document.getElementById('root'));


if(rootElem){
  rootElem.render(
  
    <Provider store = {store} >
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  
  );
}

