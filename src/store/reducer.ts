import {actionTypes, GET_DATA_FAILURE, GET_DATA_REQUEST_START, GET_DATA_SUCCESS, GET_STATUS_FAILURE, GET_STATUS_REQUEST_START, GET_STATUS_SUCCESS, SET_INTERVAL_ID, StateModel, USER_LOGIN_FAILURE, USER_LOGIN_SUCCESS, USER_LOGOUT} from './types';

const initialState: StateModel = {
    isAuth: false,
    userData: null,
    errorLogin: null,
    dataArray: [],
    isLoadingDataArray: true,
    errorData: null,
    statusArray: null,
    isLoadingStatusArray: false,
    errorStatus: null,
    timerId: 0
}

function reducer(state = initialState, action: actionTypes): StateModel {
    switch(action.type){
        case USER_LOGIN_SUCCESS:{
            localStorage.setItem("token", action.payload.user.token);
            return {
                ...state,
                userData: action.payload.user,
                isAuth: true,
                errorLogin: null
            }
        }
        case USER_LOGIN_FAILURE:{
            return {
                ...state,
                isAuth: false,
                errorLogin: action.payload.message
            }
        }
        case SET_INTERVAL_ID:{
            return{
                ...state,
                timerId: action.payload.intervalId
            }
        }
        case USER_LOGOUT:{
            localStorage.removeItem("token")
            clearInterval(state.timerId);
            return {
                ...state,
                userData: null,
                isAuth: false,
                timerId: 0
            }
        }
        case GET_DATA_REQUEST_START:{
            return{
                ...state,
                isLoadingDataArray: true,
                errorData: null
            }
        }
        case GET_DATA_SUCCESS:{
            return {
                ...state,
                isLoadingDataArray: false,
                dataArray: action.payload.data,
                errorData: null
            }
        }
        case GET_DATA_FAILURE:{
            return {
                ...state,
                isLoadingDataArray: false,
                errorData: action.payload.message
            }

        }
        case GET_STATUS_REQUEST_START:{
            return{
                ...state,
                isLoadingStatusArray: true,
                errorStatus: null
            }
        }
        case GET_STATUS_SUCCESS:{
            return {
                ...state,
                isLoadingStatusArray: false,
                statusArray: action.payload.data,
                errorStatus: null
            }
        }
        case GET_STATUS_FAILURE:{
            return {
                ...state,
                isLoadingStatusArray: false,
                errorStatus: action.payload.message
            }
        }
        default:
            return state;
    }
}

export default reducer;
