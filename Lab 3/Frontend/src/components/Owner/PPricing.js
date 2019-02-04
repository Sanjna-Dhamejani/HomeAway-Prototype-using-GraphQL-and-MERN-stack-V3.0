import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import lp from './lp.svg'
import { connect } from "react-redux";
import { pricing } from "../../actions";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './property.css';
import jwtdecode from 'jwt-decode';
var swal = require('sweetalert')
var combinedprop ={}

if(localStorage.getItem("myjwttoken")){
    var tokenvalue = jwtdecode(localStorage.getItem("myjwttoken"));
    console.log("decoded  " + tokenvalue)
       var email = tokenvalue.user.email;
      var  username = tokenvalue.user.firstname + " " + tokenvalue.user.lastname
      var type = tokenvalue.user.usertype
}

class PPricing extends Component{
    //call the constructor method
    constructor(props){
        //Call the constructor of Super class i.e The Component
        super(props);
        //maintain the state required for this component

        this.state = {
           
            pstartdate : "",
            penddate : "",
            currency : "", 
            pricingfields : [],
           
        }

        this.handleLogout = this.handleLogout.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handlePricingCreate = this.handlePricingCreate.bind(this);
        }

        //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
        localStorage.removeItem("myjwttoken")
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    } 
   
    handlePricingCreate = (e) => {
        e.preventDefault();
        var data = {
            oemail : tokenvalue.user.email,
            pstartdate : this.state.pstartdate,
            penddate : this.state.penddate,
            currency : this.state.currency,
        }

        console.log("this.props.location",this.props.location)
        console.log("this.props.details",this.props.details)
        console.log("this.props.photos",this.props.propphotos)
        console.log("this.props.email",this.props.owneremail)

        combinedprop = Object.assign(this.props.location,this.props.details,this.props.propphotos,data)
        console.log("Combinedprop", combinedprop)
        console.log("this.props.location after object assign",this.props.location)
        this.props.pricing(combinedprop)

        swal("Property Added!", "Good Job!", "success");
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
        
        if(localStorage.getItem("myjwttoken")  && type=="owner"){
            console.log("Able to read token");
            //redirectVar = <Redirect to= "/ppricing"/> 
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
               <li><Link to = "/pdetails">Details</Link></li>
               <li><Link to= "/pphotos">Photos</Link></li>
               <li><Link to= "/ppricing">Pricing</Link>
               <li><Link to= "/odashboard">Owner Dashboard</Link></li>
               </li>
               </ul>
            </div>
            <div class="main">
                <h1><strong>Availability</strong></h1>
                <hr></hr>
                <p>Already know when you would like your property to be available? </p>
                <p>You can also make changes after publishing you listing.</p>
                <br></br><br></br>
                <div>
        <h5><strong>Start Date:</strong></h5>
        <div class="ppricingform">
            <input onChange = {this.onChange} type="date" value ={this.state.pstartdate} class="pdinput" name="pstartdate"/>
        </div>
        <h5><strong>End Date:</strong></h5>
        <div class="ppricingform">
            <input onChange = {this.onChange} type="date" value ={this.state.penddate} class="pdinput" name="penddate"/>
        </div>
        <div>
        <h1><strong>How much do you want to charge?</strong></h1>
        <hr></hr>
        <p>We recommend starting with a low price to get a few bookings and earn some initial guest reviews. You can update your rates at any time.</p>
        <hr></hr>
        </div>
        <div class="ppricingform">
        <h5><strong>Currency:</strong></h5>
            <input type="text" class="prenttype" name="currencytype" placeholder=" $" disabled/> &nbsp;
            <input onChange = {this.onChange} type="text" value={this.state.currency} class="prent" name="currency" placeholder="0.00"/>
        </div></div>
                <hr></hr>
                <div>
                <button onClick = {this.handlePricingCreate} class="btn btn-warning">Submit</button></div><br></br><br></br>
                </div>
                
        </div>
        <div class="footer">
            <p>You will pay-per-booking. Consider a subscription if you plan to book frequently.</p>
        </div>
        
        </div>
        )
    }
}

PPricing.propTypes = {
    pricing : PropTypes.func.isRequired,
    location : PropTypes.object,
    details : PropTypes.object,
    propphotos : PropTypes.object,
    owneremail : PropTypes.string,
  }

const mapStateToProps = state => ({
  location : state.propred.location,
  details : state.propred.details,
  propphotos : state.propred.propphotos,
  owneremail : state.login.email
})

export default connect(mapStateToProps, { pricing })(PPricing);