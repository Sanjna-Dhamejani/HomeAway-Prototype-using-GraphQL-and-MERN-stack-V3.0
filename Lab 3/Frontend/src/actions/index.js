import axios from "axios";

export const FETCH_LOGIN = "FETCH_LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_ERROR = "LOGIN_ERROR"
export const EMAIL = "EMAIL"

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS"
export const SIGNUP_ERROR = "SIGNUP_ERROR"
export const SIGNUP_EMAIL = "SIGNUP_EMAIL"

export const UPDATE_LOCATION = "UPDATE_LOCATION"
export const UPDATE_DETAILS = "UPDATE_DETAILS"
export const UPDATE_PHOTOS = "UPDATE_PHOTOS"
export const UPDATE_PRICING = "UPDATE_PRICING"
export const PROPERTY_SUCCESS = "PROPERTY_SUCCESS"
export const PROPERTY_FAILURE = "PROPERTY_FAILURE"

export const PROFILE_INSERTED_SUCCESS = "PROFILE_INSERTED_SUCCESS"
export const PROFILE_INSERTED_FAILURE = "PROFILE_INSERTED_FAILURE"
export const FETCH_PDETAILS = "FETCH_PDETAILS"

export const HOME_SEARCH_DATA = "HOME_SEARCH_DATA"
export const FILTER_RESULTS = "FILTER_RESULTS"
export const USER_INPUT = "USER_INPUT"
export const HOME_SEARCH_FAILURE = "HOME_SEARCH_FAILURE"
export const HOME_SEARCH_SUCCESSFUL = "HOME_SEARCH_SUCCESSFUL"

export const BOOKING_FAILURE = "HOME_SEARCH_DATA"
export const BOOKING_DATA = "HOME_SEARCH_FAILURE"
export const BOOKING_SUCCESSFUL = "HOME_SEARCH_SUCCESSFUL"

export const GET_UTRIPS = "GET_UTRIPS"
export const GET_OTRIPS = "GET_OTRIPS"

export const GET_TMSGS = "GET_TMSGS"
export const GET_ALLMSGS = "GET_ALLMSGS"



const ROOT_URL = "http://localhost:3001";

    export const osignup = (values) => dispatch => {
    console.log("Actions SIGNUP :", values)
    axios.defaults.withCredentials = true;
    const request = axios
        .post(`${ROOT_URL}/signup`, values)
        .then((res) => {
            console.log("Response actions signup:",res)
            if (res.status === 200 ) {
                dispatch({
                    type: SIGNUP_SUCCESS,
                    payload: true
                })
            }
        else if(res.status === 202) {
            dispatch({
            type: SIGNUP_EMAIL,
            payload: "Email used"
            })
        }
            else {
                console.log("res " + res)
                dispatch({
                    type: SIGNUP_ERROR,
                    payload: false
                })
            }
        })
    }


    export function submitLogin(values){
        console.log("Actions LOGIN :", values)
        return async function(dispatch){
        axios.defaults.withCredentials = true;
        const request = axios
            .post(`${ROOT_URL}/login`, values)
            .then((res) => {
                console.log("Response actions login:",res)
                dispatch({
                type: EMAIL,
                payload: values.email
            })
                if (res.status === 200 ) {
                    localStorage.setItem('myjwttoken', res.data.token);
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: true
                    })
                }
                else {
                    console.log("res " + res)
                    dispatch({
                        type: LOGIN_ERROR,
                        payload: false
                    })
    
                }
            })
        }
    }

        export function locations(values){
            console.log("values inside location :" + values);
            return async function(dispatch){
            dispatch({
                type : UPDATE_LOCATION,
                payload : values
            })
        }
    }

        export function details(values){
            console.log("values inside details :" + values);
        return async function(dispatch){
        dispatch({
            type : UPDATE_DETAILS,
            payload : values
        })
    }
}

    export function photos(values){ 
        console.log("values inside action photos :" + values);
        return async function (dispatch){
        dispatch({
            type : UPDATE_PHOTOS,
            payload : values
        })
    }
}

    export function pricing(values){
        console.log("Actions Pricing :", values)
    return async function (dispatch){
    axios.defaults.withCredentials = true;
    const request = axios
        .post(`${ROOT_URL}/property`, values)
        .then((res) => {
            console.log("Response actions PRICING:",res)
            if (res.status === 200 ) {
                dispatch({
                    type: PROPERTY_SUCCESS,
                    payload: true
                })
            }
            else {
                console.log("res " + res)
                dispatch({
                    type: PROPERTY_FAILURE,
                    payload: false
                })

            }
        })
        }
    }


        export function profilepost(values){
            console.log("Actions Profile Post :", values)
            return async function (dispatch){
        axios.defaults.withCredentials = true;
        const request = axios
            .post(`${ROOT_URL}/profile`, values)
            .then((res) => {
                console.log("Response actions Profile Post:",res)
                if (res.status === 200 ) {
                    dispatch({
                        type: PROFILE_INSERTED_SUCCESS,
                        payload: true
                    })
                }
                else {
                    console.log("res " + res)
                    dispatch({
                        type: PROFILE_INSERTED_FAILURE,
                        payload: false
                    })
        
                }
            })
            }
        }


        export function filterresults(values){
            console.log("Actions filter Post :", values)
            return async function(dispatch){
        axios.defaults.withCredentials = true;
        const request = axios
            .post(`${ROOT_URL}/filter`, values)
            .then((res) => {
                console.log("Response actions Filter Post:",res.data)
                if (res.status === 200 ) {
                    dispatch({
                        type : FILTER_RESULTS,
                        payload : res.data
                    })

                }
            
            })
            }
        }


    export function homesearch (values){
        console.log("Actions Home Post :", values)
        return async function(dispatch){
    axios.defaults.withCredentials = true;
    const request = axios
        .post(`${ROOT_URL}/home`, values)
        .then((res) => {
            console.log("Response actions HOME Post:",res.data)
            if (res.status === 200 ) {
                dispatch({
                    type : USER_INPUT,
                    payload : values
                })
            
                dispatch({
                    type: HOME_SEARCH_SUCCESSFUL,
                    payload: "true"
                })
                dispatch({
                    type: HOME_SEARCH_DATA,
                    payload: res.data
                })
            }
            else{
                dispatch({
                    type: HOME_SEARCH_FAILURE,
                    payload: "false"
                })
            }
        })
        }
    }

    export function booking(values){
        console.log("Actions Booking Post :", values)
        return async function(dispatch){
    axios.defaults.withCredentials = true;
    const request = axios
    .post(`${ROOT_URL}/displayprop`, values)
    .then((res) => {
    console.log("Response actions Booking Post:",res.data)
    if (res.status === 200 ) {
    dispatch({
        type: BOOKING_SUCCESSFUL,
        payload: "true"
    })
    dispatch({
        type: BOOKING_DATA,
        payload: res.data
    })
    }
    else{
    dispatch({
        type: BOOKING_FAILURE,
        payload: "false"
    })
    }
    })
    }
    }

    export function mytrips(values){
        console.log("Actions mytrips get :", values)
    return async function (dispatch){
    axios.defaults.withCredentials = true;
    const request = axios
    .get("http://localhost:3001/mytrips/"+values)
    .then((res) => {
    console.log("Response actions mytrips get:",res.data)

        dispatch({
            type: GET_UTRIPS,
            payload: res.data
        })

    })
    }
}

    export function odashboard(values){
        console.log("Actions odashboard get :", values)
        return async function(dispatch){
    axios.defaults.withCredentials = true;
    const request = axios
    .get("http://localhost:3001/odashboard/"+values)
    .then((res) => {
        console.log("Response actions odashboard get:",res.data)
        
            dispatch({
                type: GET_OTRIPS,
                payload: res.data
            })
        
    })
    }
    }

    export function pushMsg(values){
        console.log("Actions Messages Post :", values)
        return async function(dispatch){
    axios.defaults.withCredentials = true;
    const request = axios
        .post(`${ROOT_URL}/messagepost`, values)
        .then((res) => {
            
            if (res.status === 200 ) {
                console.log("Response status Messages Post:",res.status)
            }
        
        })
        }
    }

        export function getmsgs(values){
            console.log("Getting Main inbox pages", values)
            return async function(dispatch){
            axios.defaults.withCredentials = true;
            const request = axios
            .get("http://localhost:3001/allmsgs/"+values)
            .then((res) => {
                console.log("Response actions all msgs get:",res.data)
                
                    dispatch({
                        type: GET_ALLMSGS,
                        payload: res.data
                    })
                
            })
            }
        }
        

        export function gettmsgs(values){
            console.log("Get for chat history for user in actions :", values)
            return async function(dispatch){
            axios.defaults.withCredentials = true;
            const request = axios
            .post(`${ROOT_URL}/gettmsgs`, values)
            .then((res) => {
                console.log("Response actions chat history get:",res.data)
                    dispatch({
                        type: GET_TMSGS,
                        payload: res.data
                    })
                
            })
            }
        }