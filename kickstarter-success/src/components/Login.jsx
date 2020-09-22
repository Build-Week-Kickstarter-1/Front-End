import React, {useState} from "react";
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const initialLogin = {
  username: '',
  password: '',
}

const Login = () => {

  const [login, setLogin] = useState(initialLogin)
  const [isLoading, setIsLoading] = useState(false)
  let history = useHistory()
  const inputHandler = (e) => {
  setLogin({...login, [e.target.name]: e.target.value})
  }
  const submitHandler = (e) => {
  e.preventDefault()
  setIsLoading(true)
    axios
      .post('https://kickstarter-success-app.herokuapp.com/login', `grant_type=password&username=${login.username}&password=${login.password}`, {
        headers: {
          Authorization: `Basic ${btoa('lambda-client:lambda-secret')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(response => {
          window.localStorage.setItem('token', response.data.access_token)
          history.push('./dashboard')
          setLogin(initialLogin)
          setIsLoading(false)
      })
      .catch(error => {
          debugger
          setIsLoading(false)
      })
  }
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <TextField
            label='Username'
            variant="outlined"
            name='username'
            value={login.username}
            onChange={inputHandler}
            type='text'
        />
        <TextField
            label='Password'
            variant="outlined"
            name='password'
            value={login.password}
            onChange={inputHandler}
            type='password'
        />
        {isLoading ? <CircularProgress /> : ''}
        <Button type='submit' variant="contained" color="primary">
            Login
        </Button>
      </form>
    </>
  );
};

export default Login;
