import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import ha from './ha.svg'
import birdhouse from './birdhouse.svg'
import { connect } from "react-redux";
import { submitLogin } from "../../actions";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import jwtdecode from 'jwt-decode';
import {withApollo} from 'react-apollo'
import {LoginQuery} from '../../queries/queries'
var loginsuccess = ""

if(localStorage.getItem("myjwttoken")){
    var tokenvalue = jwtdecode(localStorage.getItem("myjwttoken"));
    console.log("decoded  " + JSON.stringify(tokenvalue))
       var email = tokenvalue.user.email;
      var  username = tokenvalue.user.firstname + " " + tokenvalue.user.lastname
      var type = tokenvalue.user.usertype
      console.log("Run always type",type)
}

//Define a Login Component
class TravelerLogin extends Component{
    //call the constructor method
    constructor(props){
        //Call the constructor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email : "",
            password : "",
            authFlag : false,

        }
        //Bind the handlers to this class
        this.onChange = this.onChange.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email : this.state.email,
            password : this.state.password
        }
        this.props.client.query({
            query: LoginQuery,
            variables:{
                email : this.state.email,
            password : this.state.password
            }
        }).then(res=>{
            if (res.data.user.error){
                alert("Invalid Credentials")
            }
            else{
                localStorage.setItem('myjwttoken','JWT' + res.data.user.jwttoken)
                this.setState({
                    authFlag : true
                })
            }


        })
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log("JSON.stringify(nextProps)", JSON.stringify(nextProps))
    //     if (nextProps.ld.logindetails === true) {
    //       loginsuccess = "true"
    //       console.log("loginsuccess", loginsuccess)
    //       console.log("nextProps.logindetails", nextProps.ld.logindetails)
    //       //this.props.posts.unshift(nextProps.newPost);
    //     }
    //     else
    //       loginsuccess = "false"
    //   }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(this.state.authFlag){
            redirectVar = <Redirect to= "/home"/>
        }
        return(
            <div>
                {redirectVar}

                <div>
                <nav class="navbar navbar-white">
        <div class="container-fluid">
        <div class="navbar-header">
        <img src = {ha} height="50" width="200"></img>
        </div>
        <ul class="nav navbar-nav navbar-right">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<li><img src = {birdhouse} height="50" width="50"></img></li>
        </ul>
    
        </div>
        </nav>
        </div>
        <div class="background">
            <div class="container">
                <div class="login-form">
                    <h1>Log in to HomeAway</h1>
                    Need an account?<Link to="/tsignup"> Sign up</Link>
                    <div class="main-div">
                        <div class="panel">
                            <h2>Account login</h2>
                        </div>
                        <form onSubmit={this.submitLogin}>
                            <div class="form-group">
                                <input onChange = {this.onChange} type="email" value={this.state.email} class="form-control" name="email" placeholder="Email address" required/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.onChange} type="password" value={this.state.password} class="form-control" name="password" placeholder="Password" required/>
                            </div>
                            <div>
                                <a href="#">Forgot password?</a>
                            </div>
                            <br></br>
                            <div>
                            <button /*onClick = {this.submitLogin}*/ class="btn btn-warning btn-lg btn-block">Log In</button>  
                            </div>
                            
                            <br></br>
                            <div>
                            <input type="checkbox" name="signedin" value="signedin" checked/> Keep me signed in<br/>
                  </div> 
                  </form>                        
            </div>
            </div>
        </div>
        </div>
        </div>
        )
    }
}

// TravelerLogin.propTypes = {
//     submitLogin : PropTypes.func.isRequired,
//     ld : PropTypes.string
//   }

// const mapStateToProps = state => ({
//   ld : state.login
// })

// //export Login Component
// export default connect(mapStateToProps, { submitLogin })(TravelerLogin);  
export default withApollo(TravelerLogin)