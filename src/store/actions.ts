import axios from './../axios';
import { Dispatch } from "redux";
import { AuthActionTypes, DataActionTypes, GET_DATA_FAILURE, GET_DATA_SUCCESS, GET_STATUS_FAILURE, GET_STATUS_SUCCESS, StatusActionTypes, USER_LOGIN_FAILURE, USER_LOGIN_SUCCESS } from './types';

export const login = (username: string, password: string) => async (
	dispatch: Dispatch<AuthActionTypes>
) => {
	try {
		const res = await axios.post("/login", { username, password });
        //NOT SURE WHAT IS RETURNED     
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: {
				user: res.data.account,
				authToken: res.data.token,
			},
		});
	} catch (err) {
		dispatch({
			type: USER_LOGIN_FAILURE,
			payload: {
				message: err.message,
			},
		});
	}
};

export const getData = (start: string, stop: string) => async (
	dispatch: Dispatch<DataActionTypes>
) => {
	try {
		const res = await axios.post("/history", { start, stop });

		dispatch({
			type: GET_DATA_SUCCESS,
			payload: {
				data: res.data
			},
		});
	} catch (err) {
		dispatch({
			type: GET_DATA_FAILURE,
			payload: {
				message: err.message,
			},
		});
	}
};

export const getStatus = () => async (
	dispatch: Dispatch<StatusActionTypes>
) => {
	try {
		const res = await axios.post("/notSureWhatRoute", {});

		dispatch({
			type: GET_STATUS_SUCCESS,
			payload: {
				data: res.data
			},
		});
	} catch (err) {
		dispatch({
			type: GET_STATUS_FAILURE,
			payload: {
				message: err.message,
			},
		});
	}
};

