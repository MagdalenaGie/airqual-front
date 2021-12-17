import {actionTypes, GET_DATA_FAILURE, GET_DATA_REQUEST_START, GET_DATA_SUCCESS, GET_STATUS_FAILURE, GET_STATUS_REQUEST_START, GET_STATUS_SUCCESS, SET_INTERVAL_ID, StateModel, USER_LOGIN_FAILURE, USER_LOGIN_SUCCESS, USER_LOGOUT} from './types';

const initialState: StateModel = {
    isAuth: false,
    userData: null,
    dataArray: [],
    isLoadingDataArray: true,
    statusArray: null,
    isLoadingStatusArray: false,
    error: null,
    timerId: 0
}

function reducer(state = initialState, action: actionTypes): StateModel {
    switch(action.type){
        case USER_LOGIN_SUCCESS:{
            // something goes on...
            return {
                ...state,
                userData: action.payload.user,
                isAuth: true
            }
        }
        case USER_LOGIN_FAILURE:{
            // something goes on...
            return {
                ...state,
                isAuth: false,
                error: action.payload.message
            }
        }
        case SET_INTERVAL_ID:{
            return{
                ...state,
                timerId: action.payload.intervalId
            }
        }
        case USER_LOGOUT:{
            // something goes on...
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
                isLoadingDataArray: true
            }
        }
        case GET_DATA_SUCCESS:{
            // something goes on...
            return {
                ...state,
                isLoadingDataArray: false,
                dataArray: action.payload.data
            }
        }
        case GET_DATA_FAILURE:{
            // something goes on...
            return {
                ...state,
                isLoadingDataArray: false,
                error: action.payload.message
            }

        }
        case GET_STATUS_REQUEST_START:{
            return{
                ...state,
                isLoadingStatusArray: true
            }
        }
        case GET_STATUS_SUCCESS:{
            // something goes on...
            return {
                ...state,
                isLoadingStatusArray: false,
                statusArray: action.payload.data
            }
        }
        case GET_STATUS_FAILURE:{
            // something goes on...
            return {
                ...state,
                isLoadingStatusArray: false,
                error: action.payload.message
            }
        }
        default:
            return state;
    }
}

export default reducer;
