import React from 'react'
import { connect } from 'react-redux'

import {  Button } from 'react-bootstrap';

class SessionContainer extends React.Component{

    handleClick = () => {
      let urlStrings =  localStorage.getItem("chrome_session")
      console.log("FROM REACT!!!",urlStrings)
      console.log("lenght", urlStrings.length)


    }

    render(){
        return(
            <>
            {
                this.props.currentClient.id
                ?
                <Button variant='info' onClick={this.handleClick}>Pull Chrome Session from Container</Button>
                :
                null
            }
                
            </>
        )
    }
}

function msp(state){
    console.log("Session container state", state)
    return state
}
export default connect(msp)(SessionContainer)