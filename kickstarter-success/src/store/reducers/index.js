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
    userInfo,
    addCampaign,
} from '../actions/userActions'

export const initialState = {
    userInfo: [],
    currentCampaign: {},
    loading: true,
    errorMessage: '',
}

export default (state = initialState, action) => {
    switch(action.type){
        case FETCH_USERINFO:
            return {...state, userInfo: [], loading: true, errorMessage: ''}
        case FETCH_USERINFO_SUCCESS:
            return {...state, userInfo: action.payload, loading: false, errorMessage: ''}
        case FETCH_USERINFO_ERROR:
            return {...state, userInfo: [], loading: false, errorMessage: action.payload}
        case POST_NEW_CAMPAIGN:
            return {...state, loading: true, errorMessage: ''}
        case POST_NEW_CAMPAIGN_SUCCESS:
            return {...state, userInfo: [...state.userInfo, action.payload], loading: false, errorMessage: ''}
        case POST_NEW_CAMPAIGN_ERROR:
            return {...state, userInfo: [], loading: false, errorMessage: action.payload}
        case DELETE_CAMPAIGN:
            return {...state, loading: true, errorMessage: ''}
        case DELETE_CAMPAIGN_SUCCESS:
            return {...state, currentCampaign: state.userInfo.map(info => {
                    return info.id != action.payload
                }), loading: false, errorMessage: ''}
        case DELETE_CAMPAIGN_ERROR:
            return {...state, loading: false, errorMessage: action.payload}
        default:
            return state
    }
}