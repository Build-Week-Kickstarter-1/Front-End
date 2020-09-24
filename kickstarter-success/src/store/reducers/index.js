import { 
    FETCH_USERINFO,
    FETCH_USERINFO_SUCCESS,
    FETCH_USERINFO_ERROR,
    POST_NEW_CAMPAIGN,
    POST_NEW_CAMPAIGN_SUCCESS,
    POST_NEW_CAMPAIGN_ERROR,
    DELETE_CAMPAIGN,
    DELETE_CAMPAIGN_SUCCESS,
    DELETE_CAMPAIGN_ERROR,
    EDIT_CAMPAIGN,
    EDIT_CAMPAIGN_SUCCESS,
    EDIT_CAMPAIGN_ERROR,
    LOGOUT,
    ERROR,
} from '../actions/userActions'

export const initialState = {
    userInfo: [],
    username: '',
    loading: true,
    errorMessage: '',
}

export default (state = initialState, action) => {
    switch(action.type){
        case FETCH_USERINFO:
            return {...state, userInfo: [], loading: true}
        case FETCH_USERINFO_SUCCESS:
            return {...state, userInfo: action.payload.campaigns, username: action.payload.username ,loading: false}
        case FETCH_USERINFO_ERROR:
            return {...state, userInfo: [], loading: false, errorMessage: action.payload}
        case POST_NEW_CAMPAIGN:
            return {...state, loading: true, errorMessage: ''}
        case POST_NEW_CAMPAIGN_SUCCESS:
            return {...state, userInfo: [...state.userInfo, action.payload], loading: false, errorMessage: 'Campaign added successfully'}
        case POST_NEW_CAMPAIGN_ERROR:
            return {...state, userInfo: [], loading: false, errorMessage: action.payload}
        case DELETE_CAMPAIGN:
            return {...state, loading: true, errorMessage: ''}
        case DELETE_CAMPAIGN_SUCCESS:
            return {...state, userInfo: state.userInfo.filter(info => {
                    return info.id != action.payload
                }), loading: false, errorMessage: 'Campaign deleted successfully'}
        case DELETE_CAMPAIGN_ERROR:
            return {...state, loading: false, errorMessage: action.payload}
        case EDIT_CAMPAIGN:
            return {...state, loading: true, errorMessage: ''}
        case EDIT_CAMPAIGN_SUCCESS:
            console.log(state.errorMessage)
            return {...state, userInfo: state.userInfo.map(info => {
                    if (info.campaignid == action.payload.campaignid){
                        return action.payload
                    } else {
                        return info
                    }
                }), loading: false, errorMessage: 'Campaign updated successfully'}
        case EDIT_CAMPAIGN_ERROR:
            return {...state, loading: false, errorMessage: action.payload}
        case LOGOUT:
            return {...state,  userInfo: [], username: '', loading: false, errorMessage: action.payload}
        case ERROR:
            return {...state, errorMessage: action.payload}
        default:
            return state
    }
}