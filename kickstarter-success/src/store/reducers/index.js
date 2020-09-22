import { 
    FETCH_USERINFO,
    FETCH_USERINFO_SUCCESS,
    FETCH_USERINFO_ERROR,
} from '../actions/userActions'

export const initialState = {
    userInfo: [],
    loading: true,
    errorMessage: ''
}

export default (state = initialState, action) => {
    switch(action.type){
        case FETCH_USERINFO:
            return {...state, userInfo: [], loading: true, errorMessage: ''}
        case FETCH_USERINFO_SUCCESS:
            return {...state, userInfo: action.payload, loading: false, errorMessage: ''}
        case FETCH_USERINFO_ERROR:
            return {...state, userInfo: [], loading: false, errorMessage: action.payload}
        default:
            return state
    }
}