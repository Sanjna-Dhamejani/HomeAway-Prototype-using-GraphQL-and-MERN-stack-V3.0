import _ from "lodash";
import { GET_UTRIPS } from '../actions';


const initialState = {
    travelerdash: [],
}

export default function (state = initialState, action) {
    console.log("In Tdashboard Reducer")
    switch (action.type) {
        
            case GET_UTRIPS:
            return {
                ...state,
                travelerdash: action.payload
            };
           
        default:
            return state;
    }
}

