export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export const USER_LOGOUT = "USER_LOGOUT";

export const SET_INTERVAL_ID = "SET_INTERVAL_ID";

export const GET_DATA_REQUEST = "GET_DATA_REQUEST";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_FAILURE = "GET_DATA_FAILURE";

export const GET_STATUS_REQUEST = "GET_STATUS_REQUEST";
export const GET_STATUS_SUCCESS = "GET_STATUS_SUCCESS";
export const GET_STATUS_FAILURE = "GET_STATUS_FAILURE";

export interface DataResponseModel{
    id: number,
    dev_id: number,
    datetime: string,
    NO_m: string,
    NO_sd: string,
    NO2_m: string,
    NO2_sd: string,
    NOx_m: string,
    NOx_sd: string,
    SO2_m: string,
    SO2_sd: string,
    O3_m: string,
    O3_sd: string,
    CO_m: string,
    CO_sd: string,
    PM10: string
}

export interface StatusResponseModel{
    NO: string,
    NO2: string,
    NOx: string,
    SO2: string,
    O3: string,
    CO: string,
    PM10: string,
    is_broken: boolean,
    datetime: string
}

export interface UserDataModel{
    login: string,
    password: string,
    token: string
}

export interface StateModel{
    isAuth: boolean,
    userData: UserDataModel | null,
    dataArray: DataResponseModel[],
    statusArray: StatusResponseModel | null,
    error: string | null,
    timerId: number
}

interface UserLoginSuccess {
    type: typeof USER_LOGIN_SUCCESS;
    payload: {
        user: UserDataModel
    }
}

interface UserLoginFailure {
    type: typeof USER_LOGIN_FAILURE;
    payload: {
        message: string
    }
}

interface UserLogout {
    type: typeof USER_LOGOUT;
    payload: null;
}

interface SetIntervalId {
    type: typeof SET_INTERVAL_ID;
    payload: {
        intervalId: number;
    };
}

interface GetDataSuccess {
    type: typeof GET_DATA_SUCCESS;
    payload: {
        data: DataResponseModel[]
    }
}

interface GetDataFailure {
    type: typeof GET_DATA_FAILURE;
    payload: {
        message: string
    }
}

interface GetStatusSuccess {
    type: typeof GET_STATUS_SUCCESS;
    payload: {
        data: StatusResponseModel
    }
}

interface GetStatusFailure {
    type: typeof GET_STATUS_FAILURE;
    payload: {
        message: string
    }
}

export type actionTypes = UserLoginSuccess | UserLoginFailure | UserLogout | SetIntervalId | GetDataSuccess | GetDataFailure| GetStatusSuccess | GetStatusFailure;
export type AuthActionTypes = UserLoginSuccess | UserLoginFailure | UserLogout;
export type DataActionTypes = GetDataSuccess | GetDataFailure;
export type StatusActionTypes = GetStatusSuccess | GetStatusFailure;
