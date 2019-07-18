import React from 'react'
import ClientList from './ClientList'
import ClientDashboard from './ClientDashboard'
import { Container, Row, Col, ListGroup } from 'react-bootstrap';




class Dashboard extends React.Component {

    

    render(){
        return  (
          <Container>
            
            <Row>
              <Col xs={3}>
                <ClientList/>
              </Col>
              <Col xs={9}>
                <ClientDashboard />
              </Col>
             
            </Row>
            
          </Container>
        )
    }
}

export default Dashboard