import _ from "lodash";
import { HOME_SEARCH_SUCCESSFUL } from '../actions';
import { HOME_SEARCH_DATA } from '../actions';
import { HOME_SEARCH_FAILURE } from '../actions';
import { USER_INPUT } from '../actions';
import { FILTER_RESULTS } from '../actions';

const initialState = {
    homeFlag: "",
    homesearchdata: {},
    userinput : {}
}

export default function (state = initialState, action) {
    console.log("In Home Reducer")
    switch (action.type) {
            case USER_INPUT:
            return {
                ...state,
                userinput: action.payload
                
            };
            case FILTER_RESULTS:{
                return{
                    ...state,
                    homesearchdata: action.payload
                }
            }
            case HOME_SEARCH_SUCCESSFUL:
            return {
                ...state,
                homeFlag: action.payload
                
            };
            case HOME_SEARCH_FAILURE:
            return {
                ...state,
                homeFlag: action.payload
            };
            case HOME_SEARCH_DATA:
            return {
                ...state,
                homesearchdata: action.payload
            };
           console.log("Homeflag",this.state.homeFlag)
        default:
            return state;
    }
}