import React, {useEffect, useState} from 'react';
import { TextField, Button, CircularProgress, FormControl, InputLabel, Select ,MenuItem, makeStyles } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom';
import { connect, useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { deleteCampaign, editCampaign } from '../store/actions/userActions'
import {country_code} from '../assets/countryCode'
import { categories } from '../assets/categories'
import { ERROR, LOADING } from '../store/actions/userActions';

const initialCampaign = {
    name: '',
    blurb: '',
    category: '',
    country: '',
    goal: '',
    launchdate: '',
    deadline: '',
    successprediction: '',
}

const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 160,
    },
  }));

const EditCampaign = ({deleteCampaign, editCampaign}) => {
    const { id } = useParams()
    const [campaign, setCampaign] = useState(initialCampaign)
    let history = useHistory()
    let dispatch = useDispatch()
    const classes = useStyles();
    const inputHandler = (e) => {
        setCampaign({...campaign, [e.target.name]: e.target.value, successprediction: ''})
    }
    const loading = useSelector(state => state.loading)
    const data = useSelector(state => state.userInfo)
    const submitHandler = (e) => {
        e.preventDefault()
        if (!campaign.name || !campaign.blurb || !campaign.category || !campaign.country || !campaign.goal) return 
        editCampaign(id, campaign)      
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
    const predictHandler = (e) => {
        e.preventDefault()
        dispatch({type: LOADING, payload: true})
        if (!campaign.name || !campaign.blurb || !campaign.category || !campaign.country || !campaign.goal) return 
        let today = new Date();
        const campaignData = {
            name: campaign.name,
            blurb: campaign.blurb,
            category: campaign.category,
            country: campaign.country,
            goal: campaign.goal,
            launched: campaign.launchdate,
            deadline: campaign.deadline,
        }
        axios.post('https://ds-ks-api-september-2020.herokuapp.com/predict', campaignData)
            .then(res => {
                setCampaign({...campaign, successprediction: res.data.prediction})
                dispatch({type: LOADING, payload: false})
            })
            .catch(err => {
                dispatch({type: ERROR, payload: "That wasn't suppose to happen, try again"})
                dispatch({type: LOADING, payload: false})
            })
    }

    useEffect(()=> {
        axiosWithAuth()
            .get(`/campaigns/campaign/${id}`)
            .then(res => {
                setCampaign(res.data)
                dispatch({type: ERROR, payload: ''})
            })
            .catch(err => {
                dispatch({type: ERROR, payload: "That wasn't suppose to happen, try again"})
            })
    },[])

    return (
        <>
            <h1>Edit Campaign</h1>
            {loading ? <CircularProgress /> : 
            <>
                <TextField
                        label='Success Prediction'
                        variant="outlined"
                        name='successprediction'
                        value={campaign.successprediction}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                <form onSubmit={submitHandler}>
                    <TextField
                        label='Name'
                        variant="outlined"
                        name='name'
                        value={campaign.name}
                        onChange={inputHandler}
                        type='text'
                    />
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel >Category</InputLabel>
                        <Select
                        value={campaign.category}
                        name='category'
                        onChange={inputHandler}
                        label="Category"
                        >
                        <MenuItem value="">
                            <em>--Select--</em>
                        </MenuItem>
                        {categories.map(category => {
                            return <MenuItem value={category}>{category}</MenuItem>
                        })}
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel >Country</InputLabel>
                        <Select
                        value={campaign.country}
                        name='country'
                        onChange={inputHandler}
                        label="Country"
                        >
                        <MenuItem value="">
                            <em>--Select--</em>
                        </MenuItem>
                        {country_code.map(code => {
                            return <MenuItem value={Object.values(code)[0]}>{Object.keys(code)}</MenuItem>
                        })}
                        </Select>
                    </FormControl>
                    <TextField
                        label='Goal'
                        variant="outlined"
                        name='goal'
                        value={campaign.goal}
                        onChange={inputHandler}
                        type='number'
                    />
                    <TextField
                        multiline
                        rows={4}
                        label='Blurb'
                        variant="outlined"
                        name='blurb'
                        value={campaign.blurb}
                        onChange={inputHandler}
                        type='text'
                    />
                    <Button type='submit' variant="contained" color="primary">
                        Save
                    </Button>
                    <Button variant="contained" color="primary" onClick={predictHandler}>
                        Predict Success
                    </Button>
                    <Button variant="contained" color="primary" onClick={deleteHandler}>
                        Delete
                    </Button>
                    <Button variant="contained" color="primary" onClick={cancelHandler}>
                        Cancel
                    </Button>
                </form>
            </>}
        </>
    )
}

export default connect(null, {deleteCampaign, editCampaign})(EditCampaign)