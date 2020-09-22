import React from 'react';
import {Switch} from 'react-router-dom'
import Login from '../components/Login';
import Dashboard from '../privateComponents/Dashboard';
import addCampaign from '../privateComponents/AddCampaign'
import LoginRoute from './LoginRoute'
import PrivateRoute from './PrivateRoute'

const Routes = () => {
    return (
        <Switch>
            {/* Route  */}
            <LoginRoute exact path="/login" component={Login}/>
            <PrivateRoute exact path='/dashboard' component={Dashboard}/>
            <PrivateRoute exact path='/new-campaign' component={addCampaign}/>
        </Switch>
    )
}

export default Routes;