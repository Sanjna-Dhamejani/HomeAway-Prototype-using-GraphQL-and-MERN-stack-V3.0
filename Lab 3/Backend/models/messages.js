var mongoose = require('mongoose');

var Messages = mongoose.model('Messages',{
    oemail: {
        type: String
    },
    temail: {
        type: String
    },
    message: {
        type: Array
    },
    headline:{
        type: String
    },
    state:{
        type: String
    },
    city:{
        type: String
    }
});

module.exports = { Messages };