import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import ha from './ha.svg'
import birdhouse from './birdhouse.svg'
import { Link } from "react-router-dom";
import { addUserMutation } from '../../mutation/mutation';
import { graphql, compose } from 'react-apollo';

//Define a Login Component
class TravelerSignUp extends Component{
    //call the constructor method
    constructor(props){
        //Call the constructor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            firstname : "",
            lastname : "",
            email : "",
            password : "",
            userCreated: false,
            error : ""
        }
        //Bind the handlers to this class
        this.onChange = this.onChange.bind(this);
        this.handleUserCreate = this.handleUserCreate.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            userCreated : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    //submit Login handler to send a request to the node backend
    handleUserCreate = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        this.props.addUserMutation({
            variables: {
                firstname : this.state.firstname,
                lastname : this.state.lastname,
                email : this.state.email,
                password : this.state.password,
                usertype : "traveler",
            },
        }).then(response => {
            console.log("Response after graphql", JSON.stringify(response.data.addUser.email))
            console.log("response.data.addUser.email",response.data.addUser.email)
            if(response.data.addUser.email===null)
            {
                this.setState({
                    userCreated:false
                })
            }
            else{
                this.setState({
                    userCreated:true
                })
            }
        })
        
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log("nextProps.ss.signupstatus", JSON.stringify(nextProps.ss.signupstatus))

    //     if (nextProps.ss.signupstatus) {
    //       console.log("nextProps.ss.signupstatus", nextProps.ss.signupstatus)
    //       //this.props.posts.unshift(nextProps.newPost);
    //     }
    //       if(nextProps.ss.signupstatus == "Email used")
    //       {
    //           this.setState({
    //               error : "Email ID already used"
    //           })
    //       }
    //       else if (nextProps.ss.signupstatus==true)
    //         {
    //             this.setState({
    //                 userCreated :true
    //             })
    //         }
    //         else if (nextProps.ss.signupstatus==false)
    //         {
    //             this.setState({
    //                 userCreated : false
    //             })
    //         }
    //   }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(this.state.userCreated){
            redirectVar = <Redirect to= "/tlogin"/>
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
                    <h1>Sign up for HomeAway</h1>
                    Already have an account?<Link to="/tlogin"> Log in</Link>
                    <div class="main-div">
                        <div class="panel">
                        <p><font color="red">{this.state.error}</font></p>
                        <form onSubmit={this.handleUserCreate}>
                            <div class="form-group">
                                <input onChange = {this.onChange} type="text" value={this.state.firstname} class="form-control" name="firstname" placeholder="First Name" required/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.onChange} type="text" value={this.state.lastname} class="form-control" name="lastname" placeholder="Last Name" required/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.onChange} type="email" value={this.state.email} class="form-control" name="email" placeholder="Email address" required/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.onChange} type="password" value={this.state.password} class="form-control" name="password" placeholder="Password" required/>
                            </div>
                            <div>
                            <button class="btn btn-warning btn-lg btn-block">Sign Me Up</button>  
                            </div>
                            </form>
                            </div>
                                                    
            </div>
            </div>
        </div>
        </div>
        </div>
        )
    }
}

// TravelerSignUp.propTypes = {
//     osignup : PropTypes.func.isRequired,
//     ss : PropTypes.string
//   }

// const mapStateToProps = state => ({
//   ss : state.ownersignup
// })

// export default connect(mapStateToProps, { osignup })(TravelerSignUp);

export default compose(
    graphql(addUserMutation, { name: "addUserMutation" })
)(TravelerSignUp);