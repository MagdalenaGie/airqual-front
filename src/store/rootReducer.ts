import { combineReducers } from "redux";
import reducer from "./reducer";
import { StateModel } from "./types";

export interface StoreState {
    state: StateModel
}
  
export const rootReducer = combineReducers<StoreState>({
    state: reducer
});