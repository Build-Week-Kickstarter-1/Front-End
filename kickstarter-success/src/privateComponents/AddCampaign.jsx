import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'
import { TextField, Button, CircularProgress, FormControl, InputLabel, Select ,MenuItem, makeStyles} from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { categories } from '../assets/categories'
import { addCampaign } from '../store/actions/userActions';
import {country_code} from '../assets/countryCode'
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

const AddCampaign = ({addCampaign}) => {
    const [campaign, setCampaign] = useState(initialCampaign)
    let history = useHistory()
    const classes = useStyles();
    const inputHandler = (e) => {
        setCampaign({...campaign, [e.target.name]: e.target.value, successprediction: ''})
    }
    const submitHandler = (e) => {
        e.preventDefault()
        if (!campaign.name || !campaign.blurb || !campaign.category || !campaign.country || !campaign.goal) return 
        let today = new Date();
        let startDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() ;
        let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        let endDate = today.getFullYear() + '-' + (today.getMonth() + 3) + '-' + 1;
        const campaignData = {
            name: campaign.name,
            blurb: campaign.blurb,
            category: campaign.category,
            country: campaign.country,
            goal: campaign.goal,
            launchdate: startDate + ' ' + time,
            deadline: endDate + ' ' + time,
            successprediction: campaign.successprediction,
        }
        addCampaign(campaignData)
        history.push('/dashboard')
    }
    const predictHandler = () => {
        if (!campaign.name || !campaign.blurb || !campaign.category || !campaign.country || !campaign.goal) return 
        let today = new Date();
        let startDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        let endDate = today.getFullYear() + '-' + (today.getMonth() + 3) + '-' + 1;
        const campaignData = {
            name: campaign.name,
            blurb: campaign.blurb,
            category: campaign.category,
            country: campaign.country,
            goal: campaign.goal,
            launched: startDate + ' ' + time,
            deadline: endDate + ' ' + time,
        }
        axios.post('https://ds-ks-api-september-2020.herokuapp.com/predict', campaignData)
            .then(res => {
                setCampaign({...campaign, successprediction: res.data.prediction})
            })
            .catch(err => {
                debugger
            })
    }
    const cancelHandler = (e) => {
        e.preventDefault()
        setCampaign(initialCampaign)
        history.push('/dashboard')
    }
    return (

        <>
            <h1>New Campaign</h1>
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
                {/* {isLoading ? <CircularProgress /> : ''} */}
                <Button type='submit' variant="contained" color="primary">
                    Add
                </Button>
                <Button variant="contained" color="primary" onClick={predictHandler}>
                    Predict Success
                </Button>
                <Button variant="contained" color="primary" onClick={cancelHandler}>
                    Cancel
                </Button>
            </form>
        </>
    )
}

export default connect(null, {addCampaign})(AddCampaign)