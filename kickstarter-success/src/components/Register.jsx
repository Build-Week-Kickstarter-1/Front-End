import React, { useState } from 'react'
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from "react-redux";
import { ERROR } from '../store/actions/userActions';

const Register = () => {
    const initialForm = {
        username: '',
        password: '',
    }
    const [register, setRegister] = useState(initialForm)
    const [isLoading, setIsLoading] = useState(false)
    let history = useHistory()
    let dispatch = useDispatch()
    const inputHandler = (e) => {
        const {name, value} = e.target
        setRegister({...register, [name]: value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        dispatch({type: ERROR, payload: ''})
        const submittedData = {
            username: register.username,
            password: register.password
        }
        axios
            .post('https://kickstarter-success-app.herokuapp.com/createnewuser', submittedData)
            .then(response => {
                history.push('/login')
                dispatch({type: ERROR, payload: "You're account was successfully created"})
                setIsLoading(false)
            })
            .catch(error => {
                dispatch({type: ERROR, payload: "That wasn't suppose to happen, try again"})
                setIsLoading(false)
            })
            setRegister(initialForm)
    }
    return (
        <>
            <h1>Register</h1>
            {isLoading ? <CircularProgress /> : ''}
            <form onSubmit={submitHandler}>
                <TextField
                    label='Username'
                    variant="outlined"
                    name='username'
                    value={register.username}
                    onChange={inputHandler}
                    type='text'
                />
                <TextField
                    label='Password'
                    variant="outlined"
                    name='password'
                    value={register.password}
                    onChange={inputHandler}
                    type='password'
                />
                {/* Privacy and Terms of Service */}
                {/* something to check for agreement to TOS */}
                <Button type='submit' variant="contained" color="primary">
                    Create Account
                </Button>
            </form>
        </>
    )
}

export default Register