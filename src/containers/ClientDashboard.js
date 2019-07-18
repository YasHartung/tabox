import React from 'react'
import LogContainer from './LogContainer'
import TaskboardContainer from './TaskboardContainer';
import SessionContainer from './SessionContainer'

class ClientDashboard extends React.Component{


    render(){
        return(
            <>
             <p>Client Dashboard</p>
             <LogContainer />
             <TaskboardContainer/>
             <SessionContainer />
             
            </>
        )
    }
}

export default ClientDashboard