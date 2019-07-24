import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'


const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


const extensionID = "glebelfldkadpefllobfgcojjchbgjnk"

chrome.runtime.sendMessage(extensionID, {openUrlInEditor: "www.facebook.com"}, function(response){
    console.log(response)
    

})