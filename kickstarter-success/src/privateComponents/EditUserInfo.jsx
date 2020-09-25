import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { TextField, Button, CircularProgress, FormControl, InputLabel, Select ,MenuItem, makeStyles} from '@material-ui/core';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { ERROR, LOADING } from '../store/actions/userActions';

const initialUserInto = {
    campaigns: [],
    roles: [],
    userid: '',
    username: '',
    password: '',
}

const EditUserInfo = () => {
    const [userInfo, setUserInfo] = useState(initialUserInto)
    let history = useHistory()
    const loading = useSelector(state => state.loading)
    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch({type: LOADING, payload: true})
        if (!userInfo.password) return
        axiosWithAuth()
            .patch(`/users/user/${userInfo.userid}`, {password: userInfo.password})
            .then(res => {
                dispatch({type: ERROR, payload: "Password saved successfuly"})
                dispatch({type: LOADING, payload: false})
            })
            .catch(err => {
                dispatch({type: ERROR, payload: "That wasn't suppose to happen, try again"})
                dispatch({type: LOADING, payload: false})
            })
        history.push('/dashboard')
    }
    useEffect(()=>{
        axiosWithAuth()
            .get('/users/myinfo')
            .then(res => {
                setUserInfo({...res.data, password: ''})
            })
            .catch(err => {
                dispatch({type: ERROR, payload: "That wasn't suppose to happen, try again"})
            })
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
                    // onChange={(e)=> setUserInfo({...userInfo, [e.target.name] : e.target.value})}
                    type='text'
                />                
                <TextField
                    label='Campaigns'
                    variant="outlined"
                    value={userInfo.campaigns.length}
                />
                <TextField
                    label='New Password'
                    variant="outlined"
                    name='password'
                    value={userInfo.password}
                    onChange={(e)=> setUserInfo({...userInfo, [e.target.name] : e.target.value})}
                    type='password'
                />
                <Button type='submit' variant="contained" color="primary">
                    Save
                </Button>
            </form>
        </>
    )
}

export default EditUserInfo