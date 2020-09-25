import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { TextField, Button, CircularProgress, FormControl, InputLabel, Select ,MenuItem, makeStyles} from '@material-ui/core';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialUserInto = {
    campaigns: [],
    roles: [],
    userid: '',
    username: '',
}

const EditUserInfo = () => {
    const [userInfo, setUserInfo] = useState(initialUserInto)
    let history = useHistory()
    const loading = useSelector(state => state.loading)
    const dispatch = useDispatch()
    const inputHandler = (e) => {
        
    }
    const submitHandler = (e) => {
        e.preventDefault()
        history.push('/dashboard')
    }
    useEffect(()=>{
        axiosWithAuth()
            .get('/users/myinfo')
            .then(res => {
                setUserInfo(res.data)
            })
            .catch(err => console.log(err))
    },[])
    return (
        <>
            <h1>Profile</h1>
            <form onSubmit={submitHandler}>
                <TextField
                    label='Username'
                    variant="outlined"
                    name='name'
                    value={userInfo.username}
                    onChange={inputHandler}
                    type='text'
                />
                <TextField
                    label='Campaigns'
                    variant="outlined"
                    value={userInfo.campaigns.length}
                />
                <Button type='submit' variant="contained" color="primary">
                    Save
                </Button>
            </form>
        </>
    )
}

export default EditUserInfo