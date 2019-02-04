import _ from "lodash";
import { UPDATE_LOCATION } from '../actions';
import { UPDATE_DETAILS } from '../actions';
import { UPDATE_PHOTOS } from '../actions';
import { UPDATE_PRICING } from '../actions';
import { reducer as formReducer } from "redux-form";
import { PROPERTY_FAILURE } from '../actions';
import { PROPERTY_SUCCESS } from '../actions';


const initialState = {
    location: {},
    details: {},
    pricing: {},
    propphotos: {},
    propertyinserted: ""

}

export default function (state = initialState, action) {
    console.log("In PROPERTY Reducer")
    switch (action.type) {
            case UPDATE_LOCATION:
            return {
                ...state,
                location: action.payload
            };
            case UPDATE_DETAILS:
            return {
                ...state,
                details: action.payload
            };
            case UPDATE_PHOTOS:
            return {
                ...state,
                propphotos: action.payload
            };
            case UPDATE_PRICING:
            return {
                ...state,
                pricing: action.payload
            };
            case PROPERTY_FAILURE:
            return {
                ...state,
                propertyinserted: action.payload
            }
            case PROPERTY_SUCCESS:
            return {
                ...state,
                propertyinserted: action.payload
            }


             console.log("action.payload" + action.payload)
            console.log("req.cookies.name" + document.cookie)
        default:
            return state;
    }
}