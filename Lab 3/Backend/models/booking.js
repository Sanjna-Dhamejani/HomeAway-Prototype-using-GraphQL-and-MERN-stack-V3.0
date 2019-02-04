var mongoose = require('mongoose');

var Booking = mongoose.model('Booking',{
    oemail :{
        type : String
    },
    uemail : {
        type : String
    },
    arrival : {
		type : String
	},
	depart : {
        type : String
    },
    headline : {
        type : String
    },
    propertyid : {
        type : String
    },
	accommodates : {
		type : Number
	},
});

module.exports = {Booking};