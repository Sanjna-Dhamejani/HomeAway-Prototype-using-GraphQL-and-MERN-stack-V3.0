var chai = require('chai'), chaiHttp = require('chai-http');
var should = require('chai').should()



chai.use(chaiHttp);

var expect = chai.expect;



// it("Should check for search results and return status code", function(done){
//     chai.request('http://127.0.0.1:3001')
//     .post('/listings')
//     .send({ "destination": "san jose", "arrive" : "16-10-2018", "depart" : "18-10-2018", "guests" : "2"})
//     .end(function (err, res) {
//         expect(res).to.have.status(200);
//         done();
//     });
// })


it("Should check if profile is being returned", function(done){
    chai.request('http://127.0.0.1:3001')
    .get('/profile/steve@gmail.com')
    .end(function(err, res) {
        should.not.exist(err)
        should.exist(res.body);
        done();
    });
})

// it("Should check if properties are being returned", function(done){
//     chai.request('http://127.0.0.1:3001')
//     .get('/displayprop/milony@gmail.com')
//     .end(function(err, res) {
//         should.not.exist(err)
//         should.exist(res.body);
//         done();
//     });
// })