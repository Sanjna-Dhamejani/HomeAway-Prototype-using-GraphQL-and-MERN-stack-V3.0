import _ from "lodash";
import { BOOKING_DATA } from '../actions';
import { BOOKING_SUCCESSFUL } from '../actions';
import { BOOKING_FAILURE } from '../actions';

const initialState = {
    bookingFlag: "",
    bookingdata: {},
}

export default function (state = initialState, action) {
    console.log("In Booking Reducer")
    switch (action.type) {
        
            case BOOKING_FAILURE:
            return {
                ...state,
                bookingFlag: action.payload
                
            };
            case BOOKING_SUCCESSFUL:
            return {
                ...state,
                bookingFlag: action.payload
            };
            case BOOKING_DATA:
            return {
                ...state,
                bookingdata: action.payload
            };
        default:
            return state;
    }
}

