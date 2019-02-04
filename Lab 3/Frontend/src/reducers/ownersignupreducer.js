import _ from "lodash";
import { FETCH_SIGNUP } from '../actions';
import { SIGNUP_ERROR } from '../actions';
import { SIGNUP_SUCCESS } from '../actions';
import { SIGNUP_EMAIL } from '../actions';
import { reducer as formReducer } from "redux-form";

const initialState = {
    signupstatus: '',
}

export default function (state = initialState, action) {
    console.log("In SIGNUP Reducer")
    switch (action.type) {
            case SIGNUP_SUCCESS:
            return {
                ...state,
                signupstatus: action.payload
            };
            case SIGNUP_ERROR:
            return {
                ...state,
                signupstatus: action.payload
            };
            case SIGNUP_EMAIL:
            return {
                ...state,
                signupstatus: action.payload
            };
             console.log("action.payload" + action.payload)
            console.log("req.cookies.name" + document.cookie)
        default:
            return state;
    }
}