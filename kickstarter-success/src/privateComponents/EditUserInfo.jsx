import React, {useEffect, useState} from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialUserInto = {
    campaigns: [],
    roles: [],
    userid: '',
    username: '',
}

const EditUserInfo = () => {
    const [userInfo, setUserInfo] = useState(initialUserInto)
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
            
        </>
    )
}

export default EditUserInfo