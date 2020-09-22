import React, {useState} from "react";
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom'

import {axiosWithAuth} from '../utils/axiosWithAuth.jsx'

const Logout = () => {

//   setIsLoading(true)
//     axiosWithAuth()
//       .post('/login', `grant_type=password&username=${login.username}&password=${login.password}`)
//       .then(response => {
//           window.localStorage.setItem('token', response.data.access_token)
//           history.push('./dashboard')
//           setLogin(initialLogin)
//           setIsLoading(false)
//       })
//       .catch(error => {
//           debugger
//           console.log(error)
//           setIsLoading(false)
//       })
  return (
    <>
      <h1>Login</h1>
    </>
  );
};

export default Login;
