import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import lp from './lp.svg'
import {Link} from 'react-router-dom';
import './property.css';
import jwtdecode from 'jwt-decode'

var oemail = document.cookie.substring(7)
console.log("Oemail property outside where initialized", oemail)

if(localStorage.getItem("myjwttoken")){
    var tokenvalue = jwtdecode(localStorage.getItem("myjwttoken"));
    console.log("decoded  " + tokenvalue)
       var email = tokenvalue.user.email;
      var  username = tokenvalue.user.firstname + " " + tokenvalue.user.lastname
      var type = tokenvalue.user.usertype
}

class Property extends Component{
    //call the constructor method
    constructor(props){
        //Call the constructor of Super class i.e The Component
        super(props);

        this.state = {
            propertydisplay:[]
        }
        //maintain the state required for this component
        this.handleLogout = this.handleLogout.bind(this);
        }

        //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
        localStorage.removeItem("myjwttoken")
    }


    render(){

        //if Cookie is set render Logout Button
        let redirectVar = null;
        let navLogin = null;
        if(localStorage.getItem("myjwttoken")){
            console.log("Able to read token");
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
        }
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
                <h2><strong>Welcome! Verify the location of your rental. </strong></h2><br></br><br></br>
                <h4>Here you can enter your property details! <br></br> Click on continue!<br></br>4 more steps to go!</h4><br></br><br></br>
                
                <Link to="/plocation" class="btn btn-primary btn-lg btn-block ">Continue</Link><br></br><br></br><br></br><br></br><br></br>
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
export default Property;