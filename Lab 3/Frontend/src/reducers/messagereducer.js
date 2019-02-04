import _ from "lodash";
import { GET_TMSGS } from '../actions';
import { GET_ALLMSGS } from '../actions';

const initialState = {
    tmsgs:"",
    allmessages: ""
}

export default function (state = initialState, action) {
    console.log("In Message Reducer")
    switch (action.type) {
            case GET_TMSGS:
            return {
                ...state,
                tmsgs: action.payload
            };
            case GET_ALLMSGS:
            return {
                ...state,
                allmessages: action.payload
            };
        default:
            return state;
    }
}

