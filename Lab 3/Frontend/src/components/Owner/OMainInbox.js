import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { gettmsgs } from '../../actions';
import ha from './ha.svg';
import cookie from 'react-cookies';
import birdhouse from './birdhouse.svg';
import {Redirect} from 'react-router';
import jwtdecode from 'jwt-decode';
var redirectVar;

class OMainInbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: [],
            oemail: "",
            token:false,
            name:"",
            type:"",
            temail:""

        }
        this.handleLogout = this.handleLogout.bind(this);
       // this.onChange = this.onChange.bind(this);
     //   this.sendmsg = this.sendmsg.bind(this);
    }

    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
        localStorage.removeItem("myjwttoken")
    }

    componentWillReceiveProps(nextProps){
        console.log("this.props.ownermsgs"+nextProps.ownermsgs)
        this.setState({
            msg:this.state.msg.concat(nextProps.ownermsgs)
        })
    }

    componentWillMount(){
        console.log("Token in did mount" + localStorage.getItem("myjwttoken"))
        if(localStorage.getItem("myjwttoken")){
            var tokenvalue = jwtdecode(localStorage.getItem("myjwttoken"));
            console.log("decoded  " + tokenvalue)
            this.setState({
                token: true,
                oemail: tokenvalue.user.email,
                username: tokenvalue.user.firstname,
                type: tokenvalue.user.usertype
            })
        }
    }
    componentDidMount(){
        var data={
            type: this.state.type,
            email : this.state.oemail
        }
        console.log("COMPONENT DID MOUNT this.state.oemail ", this.state.oemail);
        this.props.gettmsgs(data);
        
    }

    render() {
        let details = this.state.msg.map((message, i) => {
            return (
                <div key={i}>
                <span> <Link to={`/oinbox/${message._id}`}><h2>Message from Traveler: {message.temail}</h2></Link></span><br></br>
                <hr></hr>  
                <h4>For property: {message.headline}</h4>  
                <h5><span>City: {message.city}</span></h5>   
                <h5><span>State: {message.state}</span></h5>
                </div>

            )
        })

        if(localStorage.getItem("myjwttoken")  && this.state.type=="owner"){
            console.log("Able to read token:");
            //redirectVar = <Redirect to= "/pdetails"/>
        }    
        //redirect based on successful login
        else{ 
            redirectVar = <Redirect to= "/ologin"/>
        }
        return (
            <div>
            {redirectVar}
            <div class="navbarborder">
            <nav class="navbar navbar">
    <div class="container-fluid">
    <div class="navbar-header">
    <img src = {ha} height="50" width="200"></img>
    </div>
    <ul class="nav navbar-nav navbar-right">
    <li><Link to="/odashboard">Dashboard</Link></li>
            <li><Link to="/home" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
            <li><a href="/#">Help</a></li>
            <li >
            <button class="btn btn-default" href="/property">List your property</button>
            </li>
            <li><img src = {birdhouse} height="50" width="50"></img></li>
            <hr color></hr>
    </ul>
    </div>
    </nav>
    </div>

<div className="container">
            <h3>Your Messages</h3>
            <div className="jumbotron">
                    <div className="row1">
                    {details}
                    </div>
                </div>
            </div>
        </div>
        );
    }
}


const mapStateToProps = state => ({
    ownermsgs : state.msgred.tmsgs,
    useremail : state.login.email,
});

export default connect(mapStateToProps, { gettmsgs })(OMainInbox);