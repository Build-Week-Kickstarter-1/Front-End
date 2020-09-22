import React, { useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Campaigns = () => {

    const token = window.localStorage.getItem('token')
    useEffect(()=>{
        axiosWithAuth()
            .get('/users/myinfo')
            .then(res => {
                console.log(res)

            })
            .catch(err => {
                debugger
            })
    },[])
    return (
        <>
        </>
    )
}
export default Campaigns