import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Campaigns = () => {

    const token = window.localStorage.getItem('token')
    const history = useHistory()

    useEffect(()=>{
        axiosWithAuth()
            .get('/users/myinfo')
            .then(res => {
                console.log(res)

            })
            .catch(err => {
                if (err.message == "Request failed with status code 401"){
                    window.localStorage.removeItem('token')
                    history.push('/login')
                }
                debugger
            })
    },[])
    return (
        <>
        
        </>
    )
}
export default connect(null, {})(Campaigns)