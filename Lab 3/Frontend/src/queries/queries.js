//import { gql } from 'apollo-boost';

import gql from 'graphql-tag';

const LoginQuery = gql`
query user($email: String, $password:String){
    user(email: $email, password: $password){
        error
        jwttoken
    }
}`

const MyTripsQuery = gql`
query usertrips($email: String){
    usertrips(email: $email){
        headline
    }
}`

const OdashboardQuery = gql`
query ownerdashboard($email: String){
    ownerdashboard(email: $email){
        headline
    }
}`

    // const PropertySearch = gql`
    // {
    //    query property($destination: String, $arrive: String, $depart: String, $guests:String) {
    //         property(destination: $destination, arrive: $arrive, depart: $depart, guests: $guests){  
    //             headline
    //             description
    //             city
    //             accommodates
    //             bathrooms
    //             bedrooms
    //             price
    //             propertytype
    //             error
    //             pstartdate
    //             penddate
    //     }
    // }`

export {LoginQuery,MyTripsQuery,OdashboardQuery}