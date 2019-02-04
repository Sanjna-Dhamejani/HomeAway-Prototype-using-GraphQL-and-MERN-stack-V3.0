import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import lp from './lp.svg'
import { connect } from "react-redux";
import { details } from "../../actions";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './property.css';
import jwtdecode from 'jwt-decode';
var swal = require('sweetalert')
var redirectVar = null;


if(localStorage.getItem("myjwttoken")){
    var tokenvalue = jwtdecode(localStorage.getItem("myjwttoken"));
    console.log("decoded  " + JSON.stringify(tokenvalue))
       var email = tokenvalue.user.email;
      var  username = tokenvalue.user.firstname + " " + tokenvalue.user.lastname
      var type = tokenvalue.user.usertype
      console.log("type",type)
}

class PDetails extends Component{
    //call the constructor method
    constructor(props){
        //Call the constructor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        
        this.state = {
            headline : "",
            descript : "",
            propertytype :"",
            bedrooms : "",
            accomodates : "",
            bathrooms : "",
        }

        this.handleLogout = this.handleLogout.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handlePropertyCreate = this.handlePropertyCreate.bind(this);
    }

        //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
        localStorage.removeItem("myjwttoken")
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    handlePropertyCreate = (e) => {
        e.preventDefault();
        var data = {
    
            headline : this.state.headline,
            descript : this.state.descript,
            propertytype : this.state.propertytype,
            bedrooms : this.state.bedrooms,
            accomodates : this.state.accomodates,
            bathrooms : this.state.bathrooms,

        }

        this.props.details(data);
        swal("Property Details Added!", "2 Steps More To Go! Click on Next.", "success");

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
        let redirectVar = null;
        
        if(localStorage.getItem("myjwttoken")&& type=="owner")
            console.log("Able to read token");
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
                <h4><strong>Describe your property</strong></h4>
                <hr></hr>
                <p>Start out a descriptive headline and a detailed summary of your property. </p><br></br>
                <div class="pdetailform">
                <h5><strong>Headline:</strong></h5>
                    <input onChange = {this.onChange} type="text" value={this.state.headline} class="pdinput" name="headline" />
                    <p>(minimum 20) 80 characters left</p>
                </div>
                <br></br>
                <div class="pdetailform">
                <h5><strong>Description:</strong></h5>
                    <input onChange = {this.onChange} type="text" class="pdescription" value={this.state.descript} name="descript" />
                    <p>(minimum 400) 10,000 characters left</p>
                </div>
                <br></br>
                <div class="pdetailform">
                <h5><strong>Property Type:</strong></h5>
                    <input onChange = {this.onChange} type="text" class="pdinput" value={this.state.propertytype} name="propertytype"/>
                </div>
                <br></br>
                <div class="pdetailform">
                <h5><strong>Bedrooms:</strong></h5>
                    <input onChange = {this.onChange} type="number" value={this.state.bedrooms} class="pdinput" name="bedrooms" />
                </div>
                <div class="pdetailform">
                <h5><strong>Accomodates:</strong></h5>
                    <input onChange = {this.onChange} type="number" value={this.state.accomodates}  class="pdinput" name="accomodates"/>
                </div>
                <br></br>
                <div class="pdetailform">
                <h5><strong>Bathrooms:</strong></h5>
                    <input onChange = {this.onChange} type="number" class="pdinput" value={this.state.bathrooms} name="bathrooms" />
                </div>
                
              
                
                <div className="pdetails">
                 <button onClick = {this.handlePropertyCreate} class="btn btn-warning">Submit</button>  
                </div>
                <br></br><br></br>
                <hr></hr>
                <div class="locationbuttons">
                <Link to="/plocation" class="btn btn-default">Back</Link> &nbsp;
                <Link to="/pphotos" class="btn btn-primary">Next</Link></div><br></br><br></br>
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
export default connect(null, { details })(PDetails);