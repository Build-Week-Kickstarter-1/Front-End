import React, {useEffect, useState} from 'react';
import { TextField, Button } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { deleteCampaign } from '../store/actions/userActions'

const initialCampaign = {
    category: '',
    currency: '',
    goal: '',
    launchdate: '',
    name: '',
    successprediction: false,
}

const EditCampaign = ({deleteCampaign}) => {
    const { id } = useParams()
    const [campaign, setCampaign] = useState(initialCampaign)
    let history = useHistory()
    const inputHandler = (e) => {
        setCampaign({...campaign, [e.target.name]: e.target.value})
    }
    const submitHandler = (e) => {
        e.preventDefault()
        if (!campaign.name || !campaign.currency || !campaign.goal || !campaign.category) return 
        const campaignData = {
            category: campaign.category,
            currency: campaign.currency,
            goal: campaign.goal,
            launchdate: campaign.initialCampaign,
            name: campaign.name,
            successprediction: campaign.successprediction,
        }
        // addCampaign(campaignData)
        history.push('/dashboard')
    }
    const cancelHandler = (e) => {
        e.preventDefault()
        setCampaign(initialCampaign)
        history.push('/dashboard')
    }

    const deleteHandler = (e) => {
        e.preventDefault()
        deleteCampaign(id)
        history.push('/dashboard')
    }

    useEffect(()=> {
        axiosWithAuth()
            .get(`/campaigns/campaign/${id}`)
            .then(res => {
                setCampaign(res.data)
            })
            .catch(err => {
                debugger
            })
    },[])

    return (
        <>
            <h1>Edit Campaign</h1>
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
                    Save
                </Button>
                <Button variant="contained" color="primary" onClick={cancelHandler}>
                    Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={deleteHandler}>
                    Delete
                </Button>
            </form>
        </>
    )
}

export default connect(null, {deleteCampaign})(EditCampaign)