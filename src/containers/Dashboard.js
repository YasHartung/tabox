import React from 'react'
import { connect } from 'react-redux'

import ClientList from './ClientList'
import ClientDashboard from './ClientDashboard'
import { Container, Row, Col } from 'react-bootstrap';
import UserDashboard from './UserDashboard'


function Dashboard (props){
        return  (
          <Container>
            <Row>
              <Col>
              <h4>Welcome, {props.currentUser.username}. Here's {props.currentClient.id ? props.currentClient.name : "your"} Dashboard</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={3}>
                <ClientList/>
              </Col>
              <Col xs={9}>
                {
                  props.currentClient.id
                  ?
                  <ClientDashboard/>
                  :
                  <UserDashboard />
                }
                
              </Col>
             
            </Row>
            
          </Container>
        )
    
}

function msp(state){
    return state
  }
  

export default connect(msp)(Dashboard);