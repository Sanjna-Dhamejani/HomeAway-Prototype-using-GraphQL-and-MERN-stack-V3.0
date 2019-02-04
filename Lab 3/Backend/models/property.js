var mongoose = require('mongoose');

var Properties = mongoose.model('Properties',{

    oemail :{
        type : String
    },
    city : {
        type : String
    },
    state : {
		type : String
	},
	country : {
        type : String
    },
    headline : {
        type : String
    },
    description : {
        type : String
    },
	accommodates : {
		type : Number
	},
	bathrooms :{
        type : Number
    },
    bedrooms : {
        type : Number
    },
	pstartdate : {
		type : String
	},
	penddate :{
        type : String
    },
    price : {
        type : Number
    },
	propertypics : {
		type : String
    },
    propertytype :{
        type : String
    },
});

module.exports = {Properties};