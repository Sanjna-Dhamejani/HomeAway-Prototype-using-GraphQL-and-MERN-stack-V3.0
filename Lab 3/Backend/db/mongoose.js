var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://Sanjna:sanjna7@ds243963.mlab.com:43963/homeaway',{poolSize: 10});
// Or using promises


module.exports = {mongoose};