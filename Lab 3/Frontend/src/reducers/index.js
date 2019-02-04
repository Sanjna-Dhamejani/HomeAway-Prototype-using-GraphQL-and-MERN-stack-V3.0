import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import loginreducer from './loginreducer'
import ownersignupreducer from "./ownersignupreducer";
import propertyreducer from "./propertyreducer";
import profilereducer from "./profilereducer";
import homereducer from "./homereducer";
import bookingreducer from "./bookingreducer";
import travelerdashboard from "./travelerdashboard";
import ownerdashboard from "./ownerdashboard";
import messagereducer from "./messagereducer";

const rootReducer = combineReducers({
  form: formReducer,
  login : loginreducer,
  ownersignup : ownersignupreducer,
  propred : propertyreducer,
  profilered : profilereducer,
  homered : homereducer,
  bookingred : bookingreducer,
  tdash :travelerdashboard,
  odash :ownerdashboard,
  msgred : messagereducer
});

export default rootReducer;
