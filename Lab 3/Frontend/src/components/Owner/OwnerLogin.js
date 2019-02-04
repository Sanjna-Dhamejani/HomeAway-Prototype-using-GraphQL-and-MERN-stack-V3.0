import React, {Component} from 'react';
import './Owner.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import ha from './ha.svg';
import birdhouse from './birdhouse.svg';
import ownerlogin from './ownerlogin.jpeg'
import {Provider} from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import { connect } from "react-redux";
import { submitLogin } from "../../actions";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
var swal = require('sweetalert')
var loginsuccess = ""

class OwnerLogin extends Component{
    //call the constructor method

    componentWillReceiveProps(nextProps) {
      console.log("JSON.stringify(nextProps)", JSON.stringify(nextProps))
      if (nextProps.ld.logindetails === true) {
        loginsuccess = "true"
        console.log("loginsuccess", loginsuccess)
        console.log("nextProps.logindetails", nextProps.ld.logindetails)
        //this.props.posts.unshift(nextProps.newPost);
      }
      else
        loginsuccess = "false"
    }

    renderEmailField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
              <label>{field.label}</label>
              <input className="form-control" {...field.input} type="email" />
              <div className="text-help">
                {touched ? error : ""}
              </div>
            </div>
          );
        }

        renderPasswordField(field) {
            const { meta: { touched, error } } = field;
            const className = `form-group ${touched && error ? "has-danger" : ""}`;
    
            return (
                <div className={className}>
                  <label>{field.label}</label>
                  <input className="form-control" {...field.input} type="password" />
                  <div className="text-help">
                    {touched ? error : ""}
                  </div>
                </div>
              );
            }
    

        onSubmit(values) {
            console.log("onSubmit(values)",values);
            this.props.submitLogin(values)
            //this.props.history.push("/property");
          }


    render(){

        const { handleSubmit } = this.props;
        let redirect = null;
        if(loginsuccess === "true"){
          swal("Login Successful!", "Welcome to Owner Dashboard", "success");
            redirect = <Redirect to= "/property"/>
        }
       
        return(
    
            <div>
            {redirect}
                <div>
        <nav className="navbar navbar-white">
        <div className="container-fluid">
        <div className="navbar-header">
        <img src = {ha} height="50" width="200"></img>
        </div>
        <ul className="nav navbar-nav navbar-right">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<li><img src = {birdhouse} height="50" width="50"></img></li>
        </ul>
    
        </div>
        </nav>
        </div>
        <div className="background">
        <br></br><br></br><br></br>
        <div>
        <div className="container3">
        <img src = {ownerlogin}></img></div>
            <div className="container4">
                <div className="login-form4">
                   <a href="/osignup"> Sign up</a>
                    <div className="main-div4">
                        <div className="panel4">
                            <h2>Owner login</h2>
                            <p>Need an account?</p>
                            
                            <hr></hr>
                            
                        </div>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        
        <Field
          label="Email"
          name="email"
          type="email"
          component={this.renderEmailField}
        />

        <Field
          label="Password"
          name="password"
          type="password"
          component={this.renderPasswordField}
        />

        <button type="submit" className="btn btn-warning">Submit</button>
        
      </form>
                           
                            <br></br>
                            <div>
                            <input type="checkbox" name="signedin" value="signedin" checked/> Keep me signed in<br/>
                  </div>                         
            </div>
            </div>
        </div>
        </div>
        </div>
        </div>
       
        )
    }
}

function validate(values) {

    const errors = {};
  
    // Validate the inputs from 'values'
    if (!values.email) {
      errors.email = "Enter Email";
    }
    if (!values.password) {
      errors.password = "Enter Password";
    }
  
    return errors;
  }
  
  OwnerLogin.propTypes = {
    submitLogin : PropTypes.func.isRequired,
    ld : PropTypes.string
  }

const mapStateToProps = state => ({
  ld : state.login
})

  export default reduxForm({
    validate,
    form: "LoginForm"
  })(connect(mapStateToProps, { submitLogin })(OwnerLogin));  

