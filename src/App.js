import React from 'react';
import './App.css';
import Dashboard from './containers/Dashboard'
import { connect } from 'react-redux'


function App (props) {

 


  
  return (
    <div className="App">
      <Dashboard />
    </div>
  );

}

function msp(state){
  return state
}

function mdp(dispatch){
  return{ 
    like: () => {
      dispatch({type: "INCREMENT_LIKES"})
    }
  }
}

export default connect(msp, mdp)(App);
