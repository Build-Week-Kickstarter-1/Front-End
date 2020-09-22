import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

export const FETCH_USERINFO = 'FETCH_USERINFO';
export const FETCH_USERINFO_SUCCESS = 'FETCH_USERINFO_SUCCESS';
export const FETCH_USERINFO_ERROR = 'FETCH_USERINFO_ERROR';

// const history = useHistory()
export const userInfo = () => {
    return (dispatch) => {
        dispatch({type: FETCH_USERINFO})
            axiosWithAuth()
            .get('/users/myinfo')
            .then(res => {
                dispatch({type: FETCH_USERINFO_SUCCESS, payload: res.data.campaigns})
            })
            .catch(err => {
                if (err.message == "Request failed with status code 401"){
                    window.localStorage.removeItem('token')
                }
                dispatch({type: FETCH_USERINFO_ERROR, payload: err.message})
            })
    }
}