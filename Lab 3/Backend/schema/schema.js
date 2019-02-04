const graphql = require('graphql');
const _ = require('lodash');
var {Users} = require('../models/user');
var {Properties} = require('../models/property');
var {Booking} = require('../models/booking');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtkey = require('../config/keys');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ( ) => ({
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        usertype: { type: GraphQLString },
        aboutme: { type: GraphQLString },
        citycountry: { type: GraphQLString },
        company: { type: GraphQLString },
        school: { type: GraphQLString },
        hometown: { type: GraphQLString },
        languages: { type: GraphQLString },
        phone: { type: GraphQLInt },
        gender: { type: GraphQLString },
        profilepic : { type: GraphQLString },
        error : { type: GraphQLString },
        jwttoken : {type: GraphQLString}
    })
});

const PropertyType = new GraphQLObjectType({
    name: 'Property',
    fields: ( ) => ({
        oemail: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        headline: { type: GraphQLString },
        description : { type: GraphQLString },
        accommodates : { type: GraphQLInt },
        bathrooms : {type: GraphQLInt},
        bedrooms : {type: GraphQLInt},
        pstartdate : {type: GraphQLString},
        penddate : {type: GraphQLString},
        price : {type: GraphQLInt},
        propertytype: {type: GraphQLString},
        error: {type:GraphQLString}
    })
});

const BookingType = new GraphQLObjectType({
    name: 'Booking',
    fields: ( ) => ({
        oemail: { type: GraphQLString },
        uemail: { type: GraphQLString },
        arrival: { type: GraphQLString },
        depart: { type: GraphQLString },
        headline: { type: GraphQLString },
        propertyid : { type: GraphQLString },
        error : { type: GraphQLString },
        accommodates : {type: GraphQLInt}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { 
                email: { type: GraphQLString },
                password: { type: GraphQLString }, 
            },
            async resolve(parent, args){
               const user = await Users.findOne({
                    email : args.email
                    })
                        if (user) {
                            var encrypted = await bcrypt.compare(args.password, user.password)
                            if (encrypted){
                                var token = await jwt.sign({ user: user }, jwtkey.secret, { expiresIn: '10080s' })
                            }
                            return {jwttoken :token}
                        }
                        else{
                            return {error :"User does not exists"}
                        }
            }
        },

        property: {
            type: new GraphQLList(PropertyType),
            args: {
                destination: { type: GraphQLString },
                arrive: { type: GraphQLString },
                depart: { type: GraphQLString },
                guests: { type: GraphQLInt },
            },
            async resolve(parent, args) {
                var properties = await Properties.find({
                    $and: [
                        { city: { '$regex': new RegExp('^' + args.destination + '$', "i"), '$options': 'i' } },
                        { pstartdate: { $lte: args.arrive } },
                        { penddate: { $gte: args.depart } },
                        { accommodates: { $gte: args.guests } },
                        // { _id: { $nin: bookingArray } }
                    ]

                })
                console.log("prop " + properties)
                return properties
            }
        }, 
        usertrips: {
            type: new GraphQLList(BookingType),
            args: {
                email: { type: GraphQLString },
            },
            async resolve(parent, args) {
                var mytrips = await Booking.find({
                    uemail : args.email
                 })
                 if(mytrips)
                    return mytrips;
                 else
                    return {error:"Booking error"}
            }
        },
        ownerdashboard: {
            type: new GraphQLList(BookingType),
            args: {
                email: { type: GraphQLString },
            },
            async resolve(parent, args) {
                var odashboard = await Booking.find({
                    oemail : args.email
                 })
                 if(odashboard)
                    return odashboard;
                 else
                    return {error:"Booking error"}
            }
        },
    }
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                firstname: { type: GraphQLString },
                lastname: { type: GraphQLString },
                usertype: { type: GraphQLString },
                profilepic : { type: GraphQLString },
                error : { type: GraphQLString }
            }, 
            async resolve(parent, args){
                var salt = bcrypt.genSaltSync(10);
                var encryptedpassword = bcrypt.hashSync(args.password, salt);
                const signupquery = await Users.findOne({
                    email : args.email
                })
                console.log("signupquery", signupquery)
                if (signupquery) {
                    return { error: "User already exists" };
                }
                else if(signupquery == null){
                        var user = new Users({
                            email : args.email,
                            password : encryptedpassword,
                            firstname : args.firstname,
                            lastname : args.lastname,
                            usertype : args.usertype,
                            profilepic : "default.png"
                        })
                        console.log("Signup user successful",user)
                        user.save()
                        return user;
                    }

                }
                    },
                    addBooking: {
                        type: BookingType,
                        args: {
                            oemail: { type: GraphQLString },
                            uemail: { type: GraphQLString },
                            arrival: { type: GraphQLString },
                            depart: { type: GraphQLString },
                            headline: { type: GraphQLString },
                            propertyid : { type: GraphQLString },
                            error : { type: GraphQLString },
                            accommodates : { type: GraphQLInt }
                        }, 
                        async resolve(parent, args){
                            var booking = new Booking({
                                oemail : args.oemail,
                                headline : args.headline,
                                uemail : args.uemail,
                                arrival : args.arrival,
                                depart : args.depart,
                                headline : args.headline,
                                propertyid : args.propertyid,
                                accommodates: args.accommodates
                            })                           
                                    
                                  var bookingresult = await booking.save()
                                  console.log("Bookingsuccessful",booking)
                                  console.log("bookingresult",bookingresult)
                                  if(bookingresult)
                                    return bookingresult;
                                else
                                    return {error:"Booking error"}
                                }

                            },
                            updateUser: {
                                type: UserType,
                                args: {
                                    uemail:{ type: GraphQLString },
                                    ufirstname: { type: GraphQLString },
                                    ulastname:{ type: GraphQLString },
                                    aboutme: { type: GraphQLString },
                                    citycountry: { type: GraphQLString },
                                    company: { type: GraphQLString },
                                    school: { type: GraphQLString },
                                    hometown: { type: GraphQLString },
                                    languages: { type: GraphQLString },
                                    phone: { type: GraphQLInt },
                                    gender: { type: GraphQLString },
                                    error : { type: GraphQLString },
                                }, 
                                async resolve(parent, args){
                                    const updateUserResult = await Users.update(
                                        {email : args.uemail},
                                        {
                                            $set : 
                                            {
                                                aboutme : args.aboutme,  
                                                citycountry : args.citycountry,
                                                company : args.company,
                                                school : args.school,
                                                hometown : args.hometown,
                                                phone : args.phone,
                                                languages : args.languages,
                                                gender : args.gender,
                                            }
                                        })
                                          //console.log("Bookingsuccessful",booking)
                                          console.log("updateUserResult",updateUserResult)
                                          if(updateUserResult)
                                            return updateUserResult;
                                        else
                                            return {error:"Booking error"}
                                        }
        
                                    }
                                }
            
                

        
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});