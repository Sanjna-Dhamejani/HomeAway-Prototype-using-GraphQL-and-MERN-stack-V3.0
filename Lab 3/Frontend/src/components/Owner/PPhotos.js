import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import lp from './lp.svg'
import { connect } from "react-redux";
import { photos } from "../../actions";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './property.css';
import jwtdecode from 'jwt-decode';
var swal = require('sweetalert')
var formData = "";
var propphotos = ""

if(localStorage.getItem("myjwttoken")){
    var tokenvalue = jwtdecode(localStorage.getItem("myjwttoken"));
    console.log("decoded  " + tokenvalue)
       var email = tokenvalue.user.email;
      var  username = tokenvalue.user.firstname + " " + tokenvalue.user.lastname
      var type = tokenvalue.user.usertype
}

class PPhotos extends Component{
    //call the constructor method
    constructor(props){
        //Call the constructor of Super class i.e The Component
        super(props);
        this.state = {
            description: '',
            selectedFile: '',
          };
        //maintain the state required for this component
        this.onChange = this.onChange.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        }

        //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
        localStorage.removeItem("myjwttoken")
    }

    
    onChange = (e) =>
     {
        for(let size=0; size < e.target.files.length; size++){
            console.log('Selected file:', e.target.files[size]);
            let file = e.target.files[size];
            console.log("Uploading screenshot file...");
            formData = new FormData();
            formData.append('selectedFile', file);
            if(propphotos === "")
            {
            propphotos = e.target.files[size].name
            }
            else{
            propphotos = propphotos + "," + e.target.files[size].name;
            }
            console.log("Inside for propphotos", propphotos)
            
            
            axios.post('http://localhost:3001/pphotos', formData)
            .then((result) => {
              // access results...
            });
            console.log("Formdata", formData)
            var data={
                photosproperty : propphotos
            }
            this.props.photos(data);
        }
        swal("Photos Added!", "1 Steps More To Go! Click on Next.", "success");
        console.log("outside for propphotos", propphotos)
        
    }


    render(){
        //if Cookie is set render Logout Button
        const { description, selectedFile} = this.state;
        let redirectVar = null;
        let navLogin = null;
        if(localStorage.getItem("myjwttoken") && type=="owner"){
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
        //redirect based on successful login
        else{ 
            redirectVar = <Redirect to= "/home"/>
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
                <h1><strong>Add up to 5 photos of your property</strong></h1>
                <hr></hr>
                <p>Showcase your property’s best features (no pets or people, please). Requirements: JPEG, at least 1920 x 1080 pixels, less than 20MB file size, 6 photos minimum. Need photos? Hire a professional.</p>
                <hr></hr>
                
                <form onSubmit={this.onSubmit}>
                <div class="photobutton">
                <label for="uploadpic" name ="description" value={description} onChange={this.onChange} multiple class = "btn btn-primary">SELECT PHOTOS TO UPLOAD</label>
                <input type = "file" id ="uploadpic"  class ="hidethis" multiple name="selectedFile" onChange={this.onChange}/>
                </div>
                <div class="photob">
                <Link to="/pdetails" class="btn btn-default">Back</Link> &nbsp;
                <Link to="/ppricing" class="btn btn-warning">Next</Link></div><br></br><br></br>
                </form>
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
export default connect(null, { photos })(PPhotos);