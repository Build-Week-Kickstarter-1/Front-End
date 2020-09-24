import React, {useEffect, useState} from 'react';
import { TextField, Button, CircularProgress } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { deleteCampaign, editCampaign } from '../store/actions/userActions'

const initialCampaign = {
    campaignid: '',
    category: '',
    currency: '',
    goal: '',
    launchdate: '',
    name: '',
    successprediction: false,
}

const EditCampaign = ({deleteCampaign, editCampaign}) => {
    const { id } = useParams()
    const [campaign, setCampaign] = useState(initialCampaign)
    let history = useHistory()
    const inputHandler = (e) => {
        setCampaign({...campaign, [e.target.name]: e.target.value})
    }
    const loading = useSelector(state => state.loading)
    const data = useSelector(state => state.userInfo)
    const submitHandler = (e) => {
        e.preventDefault()
        if (!campaign.name || !campaign.currency || !campaign.goal || !campaign.category) return 
        const campaignData = {
            campaignid: campaign.campaignid,
            category: campaign.category,
            currency: campaign.currency,
            goal: campaign.goal,
            launchdate: campaign.launchdate,
            name: campaign.name,
            successprediction: campaign.successprediction,
        }
        editCampaign(id, campaignData)
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
                {loading ? <CircularProgress /> : ''}
                <Button type='submit' variant="contained" color="primary">
                    Save
                </Button>
                <Button variant="contained" color="primary" onClick={deleteHandler}>
                    Delete
                </Button>
                <Button variant="contained" color="primary" onClick={cancelHandler}>
                    Cancel
                </Button>
            </form>
        </>
    )
}

export default connect(null, {deleteCampaign, editCampaign})(EditCampaign)