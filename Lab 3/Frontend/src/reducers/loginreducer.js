import _ from "lodash";
import { EMAIL } from '../actions';
import { LOGIN_ERROR } from '../actions';
import { LOGIN_SUCCESS } from '../actions';
import { reducer as formReducer } from "redux-form";

const initialState = {
    logindetails: "",
    email: ""
}

export default function (state = initialState, action) {
    console.log("In Login Reducer")
    switch (action.type) {
        case EMAIL:
            return {
                ...state,
                email: action.payload
            };
            case LOGIN_SUCCESS:
            return {
                ...state,
                logindetails: action.payload
            };
            case LOGIN_ERROR:
            return {
                ...state,
                logindetails: action.payload  
            };
            default:
            return state;
    }
}