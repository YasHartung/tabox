import React from 'react';
import './App.css';
import Dashboard from './containers/Dashboard'
import { connect } from 'react-redux'
import SignIn from './components/SignIn';


function App (props) {


  
  return (
    <div className="App">
      {
        props.currentUser 
        ?
        <Dashboard />
        :
        <SignIn />
      }
      
    </div>
  )

    }

function msp(state){
  return state
}



export default connect(msp)(App);
