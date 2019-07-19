import React from 'react'
import { connect } from 'react-redux'

import { ListGroup } from 'react-bootstrap';


class ClientList extends React.Component { 

    render(){
        console.log("client list props", this.props)
        return <div>
            
            <br></br>
            <br></br>
          
            <p>Client List</p>
            <ListGroup>
                {this.props.clients.map(client => {
                 return   <ListGroup.Item variant="info" key={client.id}>{client.name}</ListGroup.Item>
                })
            }
            </ListGroup>
        </div>
    }
}
function msp(state){
    return {...state.currentUser}
}

export default connect(msp)(ClientList)