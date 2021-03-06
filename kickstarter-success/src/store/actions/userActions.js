import { axiosWithAuth } from "../../utils/axiosWithAuth";

export const FETCH_USERINFO = 'FETCH_USERINFO';
export const FETCH_USERINFO_SUCCESS = 'FETCH_USERINFO_SUCCESS';
export const FETCH_USERINFO_ERROR = 'FETCH_USERINFO_ERROR';

export const POST_NEW_CAMPAIGN = 'POST_NEW_CAMPAIGN';
export const POST_NEW_CAMPAIGN_SUCCESS = 'POST_NEW_CAMPAIGN_SUCCESS';
export const POST_NEW_CAMPAIGN_ERROR = 'POST_NEW_CAMPAIGN_ERROR';

export const DELETE_CAMPAIGN = 'DELETE_CAMPAIGN';
export const DELETE_CAMPAIGN_SUCCESS = 'DELETE_CAMPAIGN_SUCCESS';
export const DELETE_CAMPAIGN_ERROR = 'DELETE_CAMPAIGN_ERROR';

export const EDIT_CAMPAIGN = 'EDIT_CAMPAIGN';
export const EDIT_CAMPAIGN_SUCCESS = 'EDIT_CAMPAIGN_SUCCESS';
export const EDIT_CAMPAIGN_ERROR = 'EDIT_CAMPAIGN_ERROR';

export const LOGOUT = 'LOGOUT';
export const ERROR = 'ERROR';
export const LOADING = 'LOADING';
export const DARK_MODE = 'DARK_MODE';

export const userInfo = () => {
    return (dispatch) => {
        dispatch({type: FETCH_USERINFO})
            axiosWithAuth()
            .get('/users/myinfo')
            .then(res => {
                dispatch({type: FETCH_USERINFO_SUCCESS, payload: res.data})
            })
            .catch(err => {
                dispatch({type: FETCH_USERINFO_ERROR, payload: err.message})
            })
    }
}

export const addCampaign = (data) => {
    return (dispatch) => {
        dispatch({type: POST_NEW_CAMPAIGN})
            axiosWithAuth()
            .post('/campaigns/campaign', data)
            .then(res => {
                dispatch({type: POST_NEW_CAMPAIGN_SUCCESS, payload: res.data})
            })
            .catch(err => {
                dispatch({type: POST_NEW_CAMPAIGN_ERROR, payload: err.message})
            })
    }
}

export const deleteCampaign = (id) => {
    return (dispatch) => {
        dispatch({type: DELETE_CAMPAIGN})
            axiosWithAuth()
            .delete(`/campaigns/campaign/${id}`)
            .then(res => {
                dispatch({type: DELETE_CAMPAIGN_SUCCESS, payload: id})
            })
            .catch(err => {
                dispatch({type: DELETE_CAMPAIGN_ERROR, payload: err.message})
            })
    }
}

export const editCampaign = (id,data) => {
    return (dispatch) => {
        dispatch({type: EDIT_CAMPAIGN})
            axiosWithAuth()
            .put(`/campaigns/campaign/${id}`, data)
            .then(res => {
                dispatch({type: EDIT_CAMPAIGN_SUCCESS, payload: res.data})
            })
            .catch(err => {
                dispatch({type: EDIT_CAMPAIGN_ERROR, payload: err.message})
            })
    }
}