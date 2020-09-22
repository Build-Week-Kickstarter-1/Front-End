import React from 'react';
import Campaigns from './Campaigns';
import {Button} from '@material-ui/core'
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
    const history = useHistory()
    const CampaignsCreator = (e) => {
        e.preventDefualt()
        history.push('/add')
    }
    return (
        <>
        <h1>DashBoard</h1>
        <Campaigns/>
        <br/>
        <Button variant="contained" color="primary" onClick={CampaignsCreator} >
            Add Campaign
        </Button>
        </>
    )
}
export default Dashboard