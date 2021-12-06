import {actionTypes, GET_DATA_FAILURE, GET_DATA_SUCCESS, GET_STATUS_FAILURE, GET_STATUS_SUCCESS, StateModel, USER_LOGIN_FAILURE, USER_LOGIN_SUCCESS} from './types';

const initialState: StateModel = {
    isAuth: false,
    userData: null,
    dataArray: [],
    statusArray: [],
    error: null
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
        case GET_DATA_SUCCESS:{
            // something goes on...
            return {
                ...state,
                dataArray: [...action.payload.data]
            }
        }
        case GET_DATA_FAILURE:{
            // something goes on...
            return {
                ...state,
                error: action.payload.message
            }

        }
        case GET_STATUS_SUCCESS:{
            // something goes on...
            return {
                ...state,
                statusArray: [...action.payload.data]
            }
        }
        case GET_STATUS_FAILURE:{
            // something goes on...
            return {
                ...state,
                error: action.payload.message
            }
        }
        default:
            return state;
    }
}

export default reducer;
