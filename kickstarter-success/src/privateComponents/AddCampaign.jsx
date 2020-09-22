import React, {useState} from "react";
import {connect} from 'react-redux'
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom'

import { addCampaign } from '../store/actions/userActions';

const initialCampaign = {
    category: '',
    currency: '',
    goal: '',
    launchdate: '',
    name: '',
    successprediction: false,
}

const AddCampaign = ({addCampaign}) => {
    const [campaign, setCampaign] = useState(initialCampaign)
    let history = useHistory()
    const inputHandler = (e) => {
        setCampaign({...campaign, [e.target.name]: e.target.value})
    }
    const submitHandler = (e) => {
        e.preventDefault()
        if (!campaign.name || !campaign.currency || !campaign.goal || !campaign.category) return 
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        let dateTime = date + ' ' + time;
        const campaignData = {
            category: campaign.category,
            currency: campaign.currency,
            goal: campaign.goal,
            launchdate: dateTime,
            name: campaign.name,
            successprediction: campaign.successprediction,
        }
        addCampaign(campaignData)
        history.push('/dashboard')
    }
    const cancelHandler = (e) => {
        e.preventDefault()
        setCampaign(initialCampaign)
        history.push('/dashboard')
    }
    return (

        <>
            <h1>New Campaign</h1>
            <form onSubmit={submitHandler}>
                <TextField
                    label='Name'
                    variant="outlined"
                    name='name'
                    value={campaign.name}
                    onChange={inputHandler}
                    type='text'
                />
                <TextField
                    label='Category'
                    variant="outlined"
                    name='category'
                    value={campaign.category}
                    onChange={inputHandler}
                    type='text'
                />
                <TextField
                    label='Currency'
                    variant="outlined"
                    name='currency'
                    value={campaign.currency}
                    onChange={inputHandler}
                    type='text'
                />
                <TextField
                    label='Goal'
                    variant="outlined"
                    name='goal'
                    value={campaign.goal}
                    onChange={inputHandler}
                    type='number'
                />
                {/* {isLoading ? <CircularProgress /> : ''} */}
                <Button type='submit' variant="contained" color="primary">
                    Add
                </Button>
                <Button variant="contained" color="primary" onClick={cancelHandler}>
                    Cancel
                </Button>
            </form>
        </>
    )
}

export default connect(null, {addCampaign})(AddCampaign)