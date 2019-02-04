import _ from "lodash";
import { GET_OTRIPS } from '../actions';


const initialState = {
    ownerdash: [],
}

export default function (state = initialState, action) {
    console.log("In ODashboard Reducer")
    switch (action.type) {
        
            case GET_OTRIPS:
            return {
                ...state,
                ownerdash: action.payload
            };
           
        default:
            return state;
    }
}

