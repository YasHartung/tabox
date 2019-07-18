import React from 'react'
import { connect } from 'react-redux'

import { ListGroup } from 'react-bootstrap';


class ClientList extends React.Component { 

    render(){
        console.log("client list props", this.props)
        return <div>
            <h4>ClientList</h4>
            <ListGroup>
                {this.props.clients.map(client => {
                 return   <ListGroup.Item key={client.id}>{client.name}</ListGroup.Item>
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