import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import propTypes from 'prop-types';
import { pushMsg } from '../../actions';
import { getmsgs } from '../../actions';
import {Redirect} from 'react-router';
import ha from './ha.svg';
import cookie from 'react-cookies';
import birdhouse from './birdhouse.svg';
import jwtdecode from 'jwt-decode';
import lp from './lp.svg';
import './property.css';
var swal = require('sweetalert')
var tname;
var redirectVar;
class OInbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg:"",
            username :"",
            oemail:"",
            temail:"",
            token : false,
            msgid :"",
            msg2 :[],
            type :""
        }
        this.onChange = this.onChange.bind(this);
        this.sendmsg = this.sendmsg.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    
    }

    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
        localStorage.removeItem("myjwttoken")
    }

    onChange(e) {
        this.setState({
            msg: this.state.username + ' : ' + e.target.value
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
    var mesgid = this.props.history.location.pathname.substring(8)
    this.setState({
        msgid:mesgid
    })
    this.props.getmsgs(mesgid)
}

    sendmsg = (e) => {
        console.log("In send msg")
        //console.log("this.state.oemail in displayprop", this.state.oemail)
        //console.log("this.props.location.oemail" + this.props.location.state.oemail);
        console.log("this.state.msg" + this.state.msg)
        // preventDefault()
        var data = {
            msgid:this.state.msgid,
            msg: this.state.msg,
            isfirst:false
        }
        console.log("Data sent from owner inside inbox", data)

        this.props.pushMsg(data)
        swal("Message sent to traveler!","success")
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            msg2: this.state.msg2.concat(nextProps.msghistory[0].message)
        })
        console.log("nextProps.msghistory[0].message",nextProps.msghistory[0].message[0])
        console.log("this.state.msg2" + this.state.msg2)
        tname=nextProps.msghistory[0].message[0].substring(0,4);
        console.log("tname",tname)
    }

    render() {
        let details = this.state.msg2.map((message, i) => {
            return (
                <div>
                    <span> {message}</span>
                    <hr></hr>
                </div>

            )
        })

        if(localStorage.getItem("myjwttoken") && this.state.type=="owner"){
            console.log("Able to read token:");
            //redirectVar = <Redirect to= "/pdetails"/>
        }    
        //redirect based on successful login
        else{ 
            redirectVar = <Redirect to= "/ologin"/>
        }

        let navLogin = null;
    navLogin = (
        <div class="navbarborder">
        <nav class="navbar navbar-white">
        <div class="container-fluid">
        <div class="navbar-header">
        <img src = {lp} height="50" width="200"></img>
        </div>
        <ul class="nav navbar-nav navbar-right">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.username}</a>
        <li><Link to="/omaininbox">Inbox</Link></li>
            <li><Link to="/home" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>

        </ul>
        </div>
        </nav>
        </div>
    );
        return (
            <div>
            {navLogin}
            {redirectVar}
            <div className="row">
            <div className="side">
               <ul className="propertylist">
               <li>Welcome</li>
               <li><Link to= "/plocation">Location</Link></li> 
               <li><Link to= "/pdetails">Details</Link></li>
               <li><Link to= "/pphotos">Photos</Link></li>
               <li><Link to= "/ppricing">Pricing</Link></li>
               <li><Link to= "/odashboard">Owner Dashboard</Link></li>
               </ul>
            </div>
            <div className="main">
                <h2>Your Message Chat with Traveler: {tname}</h2>
                <br></br>
                    {details}
        <div class="oinbox">
                    <form onSubmit={this.sendmsg}>
                        <textarea onChange={this.onChange} className="textinbox" placeholder='Send a Reply by typing here!' />
                        
                        <button className="btn btn-warning" >Send Message </button>
                        </form>
                        </div>
                        </div>
                </div>
            </div>
       
        );
    }
}


const mapStateToProps = state => ({
    msghistory: state.msgred.allmessages,
    useremail : state.login.email,
});

export default connect(mapStateToProps, { pushMsg, getmsgs })(OInbox);