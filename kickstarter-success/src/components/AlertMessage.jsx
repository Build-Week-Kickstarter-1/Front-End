import React from 'react'
import { useSelector } from 'react-redux';
import { Alert } from 'reactstrap';

const AlertMessage = () => {
    const error = useSelector(state => state.errorMessage)
    return (
        <>
        {error ?
            <Alert color="secondary">
                {error}
            </Alert> : <></>
        }
        </>
    )
}

export default AlertMessage