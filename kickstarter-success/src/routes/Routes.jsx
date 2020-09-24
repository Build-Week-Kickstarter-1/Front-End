import React from 'react';
import {Switch} from 'react-router-dom'
import Login from '../components/Login';
import Dashboard from '../privateComponents/Dashboard';
import AddCampaign from '../privateComponents/AddCampaign'
import LoginRoute from './LoginRoute'
import PrivateRoute from './PrivateRoute'
import EditCampaign from '../privateComponents/EditCampaign'

const Routes = () => {
    return (
        <Switch>
            <LoginRoute exact path="/login" component={Login}/>
            <PrivateRoute exact path='/dashboard' component={Dashboard}/>
            <PrivateRoute exact path='/new-campaign' component={AddCampaign}/>
            <PrivateRoute exact path='/campaign/:id' component={EditCampaign}/>
        </Switch>
    )
}

export default Routes;