import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import {userInfo} from '../store/actions/userActions'

const Campaigns = ({userInfo}) => {

    const token = window.localStorage.getItem('token')
    const history = useHistory()
    const user = useSelector(state => state)
    console.log(user)
    
    useEffect(()=>{
        // axiosWithAuth()
        //     .get('/users/myinfo')
        //     .then(res => {
        //         console.log(res)

        //     })
        //     .catch(err => {
        //         if (err.message == "Request failed with status code 401"){
        //             window.localStorage.removeItem('token')
        //             history.push('/login')
        //         }
        //         debugger
        //     })
        userInfo()
    },[])
    if (user.errorMessage == "Request failed with status code 401"){
        window.localStorage.removeItem('token')
        history.push('/login')
    }
    return (
        <>
        
        </>
    )
}

// const mapsToStateProps = (state) => {
//     console.log(state)
//     // return state
//     // return {
//     //     userInfo: state.userInfo,
//     //     loading: state.loading,
//     //     errorMessage: state.errorMessage
//     // }
//   }

export default connect(null, {userInfo})(Campaigns)