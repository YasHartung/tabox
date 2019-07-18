import React from 'react'
import ClientList from './ClientList'
import ClientDashboard from './ClientDashboard'
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import UserDashboard from './UserDashboard'


class Dashboard extends React.Component {

    

    render(){
        return  (
          <Container>
            
            <Row>
              <Col xs={3}>
                <ClientList/>
              </Col>
              <Col xs={9}>
                <UserDashboard />
              </Col>
             
            </Row>
            
          </Container>
        )
    }
}

export default Dashboard