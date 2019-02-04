var express = require('express');
var router = express.Router();
var users = require('./users');
var property = require('./property');
var dashboards = require('./dashboards');
var messages = require('./messages');


router
    .route('/signup')
    .post(users.signup);

    router
    .route('/login')
    .post(users.login);

    router
    .route('/profile')
    .post(users.profile);

    router
    .route('/profile/:email')
    .get(users.profileget);

    router
    .route('/filter')
    .post(property.filter);

    router
    .route('/property')
    .post(property.property);

    router
    .route('/home')
    .post(property.home);

    router
    .route('/displayprop')
    .post(property.displayprop);

    router
    .route('/displaypropphotos/:propertyID')
    .post(property.displaypropget);

    router
    .route('/mytripsdatesearch')
    .post(dashboards.mytripsdatesearch);
    
    router
    .route('/mytrips/:email')
    .get(dashboards.mytripsget);

    router
    .route('/odashboard/:email')
    .get(dashboards.odashboard);

    router
    .route('/messagepost')
    .post(messages.messagepost);

    router
    .route('/gettmsgs')
    .post(messages.gettmsgs);

    router
    .route('/allmsgs/:id')
    .get(messages.allmsgs);
    
    

module.exports = router;