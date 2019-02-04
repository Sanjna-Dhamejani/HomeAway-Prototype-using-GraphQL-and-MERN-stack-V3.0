import _ from "lodash";
import { FETCH_PDETAILS } from '../actions';

import { PROFILE_INSERTED_SUCCESS } from '../actions';
import { PROFILE_INSERTED_FAILURE } from '../actions';

import { reducer as formReducer } from "redux-form";



const initialState = {
    profileupdated : "",
    profiledetails : {},
    profilepic : ""
}

export default function (state = initialState, action) {
    console.log("In Profile Reducer")
    switch (action.type) {
        case PROFILE_INSERTED_SUCCESS:
            return {
                ...state,
                profileupdated: action.payload
            };
            case PROFILE_INSERTED_FAILURE:
            return {
                ...state,
                profileupdated: action.payload
            };
            case FETCH_PDETAILS:
            return {
                ...state,
                profiledetails: action.payload
            };
           default:
            return state;
    }
}