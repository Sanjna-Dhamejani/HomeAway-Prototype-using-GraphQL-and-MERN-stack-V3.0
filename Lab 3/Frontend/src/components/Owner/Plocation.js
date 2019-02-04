import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import lp from './lp.svg'
import './property.css';
import { connect } from "react-redux";
import { locations } from "../../actions";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import jwtdecode from 'jwt-decode';
var swal = require('sweetalert')
var redirectVar = null;

if(localStorage.getItem("myjwttoken")){
    var tokenvalue = jwtdecode(localStorage.getItem("myjwttoken"));
    console.log("decoded  " + tokenvalue)
       var email = tokenvalue.user.email;
      var  username = tokenvalue.user.firstname + " " + tokenvalue.user.lastname
      var type = tokenvalue.user.usertype
}

class Plocation extends Component{
    
    //call the constructor method
    constructor(props){
        //Call the constructor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            city : "",
            ostate : "",
            country :"",
            }
        this.handleLogout = this.handleLogout.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleLocationCreate = this.handleLocationCreate.bind(this); 
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
        localStorage.removeItem("myjwttoken")
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }    

    handleLocationCreate = (e) => {
        e.preventDefault();

        var data = {
            ostate : this.state.ostate,
            city : this.state.city,
            country : this.state.country,
        }
        this.props.locations(data);
        swal("Location Added!", "3 Steps More To Go! Click on Next.", "success");
    }
  
render(){

    let navLogin = null;
    navLogin = (
        <div class="navbarborder">
        <nav class="navbar navbar-white">
        <div class="container-fluid">
        <div class="navbar-header">
        <img src = {lp} height="50" width="200"></img>
        </div>
        <ul class="nav navbar-nav navbar-right">
        <li><Link to="/omaininbox">Inbox</Link></li>
            <li><Link to="/home" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>

        </ul>
        </div>
        </nav>
        </div>
    );

    //if Cookie is set render Logout Button
    if(localStorage.getItem("myjwttoken") && type=="owner"){
        console.log("Able to read token:");
        //redirectVar = <Redirect to= "/pdetails"/>
    }    
    //redirect based on successful login
    else{ 
        redirectVar = <Redirect to= "/ologin"/>
    }
    return(
        <div>
            {redirectVar}
            {navLogin}
        <div class="row">
            <div class="side">
               <ul class="propertylist">
               <li>Welcome</li>
               <li><Link to= "/plocation">Location</Link></li> 
               <li><Link to= "/pdetails">Details</Link></li>
               <li><Link to= "/pphotos">Photos</Link></li>
               <li><Link to= "/ppricing">Pricing</Link></li>
               <li><Link to= "/odashboard">Owner Dashboard</Link></li>
               </ul>
            </div>
            <div class="main">
                <h4><strong>Verify the location of your rental </strong></h4>
                <hr></hr>
                <br></br>
                <div>
            <div class="form-group">
                    <h5><strong>City:</strong></h5>
                    <input onChange = {this.onChange} type="text" value={this.state.city} class="city" name="city"/>
                    </div>
                    <br></br>
                    <div class="form-group"> 
                    <h5><strong>State:</strong></h5> 
                    <input onChange = {this.onChange} type="text" value={this.state.ostate} class="state" name="ostate" />
                    </div>
                    <br></br>
                    <div class="form-group">
                    <h5><strong>Country:</strong></h5>
                    <input onChange = {this.onChange} type="text" value={this.state.country} class="country" name="country" />
            </div>
            <br></br>
            </div> 
                <div>
                 <button onClick = {this.handleLocationCreate} class="btn btn-warning">Submit</button>  
                </div>
                <br></br><br></br>
                <div class="locationbuttons">
                <Link to="/property" class="btn btn-default">Back</Link> &nbsp;
                <Link to="/pdetails" class="btn btn-primary">Next</Link></div><br></br><br></br>
                <p align="center">Use of this Web site constitutes acceptance of the HomeAway.com Terms and conditions and Privacy policy.<br></br>
                ©2018 HomeAway. All rights reserved.<br></br>
                Start Co-browse</p>
            </div>
        </div>
        
        <div class="footer">
            <p>You will pay-per-booking. Consider a subscription if you plan to book frequently.</p>
        </div>
        
        </div>
        )
    }
}

export default connect(null, { locations })(Plocation);