import React from 'react'
import { connect } from 'react-redux'

import { ListGroup, Card } from 'react-bootstrap';


function Taskboard (props){


    return(
        <Card style={{ width: '15rem' }}>
            <Card.Title xs={10}>Taskboard Name</Card.Title>
            <ListGroup variant="flush">
                <ListGroup.Item xs={10} >Cras justo odio</ListGroup.Item>
                <ListGroup.Item xs={10} >Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item xs={10} >Vestibulum at eros</ListGroup.Item>
            </ListGroup>
        </Card>
    )
}

function msp(state){
    return state
}

 export default connect(msp)(Taskboard)