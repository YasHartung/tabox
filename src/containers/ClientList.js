import React from 'react'
import { connect } from 'react-redux'

import {updateCurrentClient, resetCurrentClient} from '../actions'

import { ListGroup, Button } from 'react-bootstrap';


class ClientList extends React.Component { 

    render(){
   
        return <div>
            
            <br></br>
            <br></br>
            {this.props.currentClient.id
            ?
            <Button onClick={this.props.resetCurrentClient} variant="outline-info"> My Dashboard</Button>
            :
            null
            }
            <br></br>
            <p>Client List</p>
            <ListGroup>
        
                {this.props.currentUser.clients.map(client => {
                 return   <ListGroup.Item onClick={()=> this.props.updateCurrentClient(client)} variant="info" key={client.id}>{client.name}</ListGroup.Item>
                })
            }
            </ListGroup>
        </div>
    }
}
function msp(state){
    return state
}

export default connect(msp, { updateCurrentClient, resetCurrentClient })(ClientList)