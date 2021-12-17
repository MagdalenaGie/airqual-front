import axios from './../axios';
import { Dispatch } from "redux";
import plotMockData from "./../components/plotting/mockResponse3.json";
import statusMockData from './../components/controllers/mockResponse.json';
import { AuthActionTypes, DataActionTypes, GET_DATA_FAILURE, GET_DATA_REQUEST_START, GET_DATA_SUCCESS, GET_STATUS_FAILURE, GET_STATUS_REQUEST_START, GET_STATUS_SUCCESS, SET_INTERVAL_ID, StatusActionTypes, USER_LOGIN_FAILURE, USER_LOGIN_SUCCESS, USER_LOGOUT } from './types';

export const login = (username: string, password: string) => async (
	dispatch: Dispatch<AuthActionTypes>
) => {
	try {
		const res = await axios.post("/login", { username, password }); 
		
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: {
				user: {
                    login: username,
                    password: password,
                    token: res.data.token
					//token: "dzien buraka"
                }
			},
		});
	} catch (err: unknown) {
		console.log(err);
		dispatch({
			type: USER_LOGIN_FAILURE,
			payload: {
				message: "",
			},
		});
	}
};

export const setIntervalId = (intervalId: number) => {
	return {
		type: SET_INTERVAL_ID,
		payload:{
			intervalId: intervalId
		}
	}
}

export const logout = () => {
    return{
        type: USER_LOGOUT,
        payload: null
    };
}

export const getData = (start: string, stop: string, token: string) => async (
	dispatch: Dispatch<DataActionTypes>
) => {
	try {
		dispatch({
			type: GET_DATA_REQUEST_START,
			payload: null
		});

		const body = {
			start: start,
			stop: stop,
		  };
		const res = await axios.post("/history", body, {headers: { Authorization: `Bearer ${token}` }});

		// console.log("in getData -> before");
		// await sleep(4000);
		// console.log("in getData -> after");

		// var res = {
		// 	data: plotMockData
		// }

		// if(token==="haslomaslo"){
		// 	res = {
		// 		data: plotMockData3
		// 	}
		// 	console.log("change")
		// }

		dispatch({
			type: GET_DATA_SUCCESS,
			payload: {
				data: res.data
			},
		});
	} catch (err: unknown) {
		console.log(err);
		dispatch({
			type: GET_DATA_FAILURE,
			payload: {
				message: "err.message",
			},
		});
	}
};

export const getStatus = (token: string) => async (
	dispatch: Dispatch<StatusActionTypes>
) => {
	try {
		dispatch({
			type: GET_STATUS_REQUEST_START,
			payload: null
		});

		const res = await axios.get("/health_check", {headers: { Authorization: `Bearer ${token}` }});
		// console.log("in getStatus")
		// const res = {
		// 	data: statusMockData
		// }

		// await sleep(4000);

		dispatch({
			type: GET_STATUS_SUCCESS,
			payload: {
				data: res.data
			},
		});
	} catch (err: unknown) {
		console.log(err);
		dispatch({
			type: GET_STATUS_FAILURE,
			payload: {
				message: "err.message",
			},
		});
	}
};


// //DELETE LATER 
// function sleep(ms: number) {
// 	return new Promise(resolve => setTimeout(resolve, ms));
//   }