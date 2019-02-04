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
var type;

class TInbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "",
            username :"",
            oemail:"",
            temail:"",
            token : false,
            msgid :"",
            msg2 :[]
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
            type = tokenvalue.user.usertype
            console.log("decoded  " + tokenvalue)
            this.setState({
                token: true,
                temail: tokenvalue.user.email,
                username: tokenvalue.user.firstname
            })
        }
    }

componentDidMount(){
    var mesgid = this.props.history.location.pathname.substring(8)
    console.log("MessageID",mesgid)
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
        console.log("Data sent from traveler inside inbox", data)

        this.props.pushMsg(data)
    }

    componentWillReceiveProps(nextProps) {
        console.log("Nextprops", nextProps)
        this.setState({
            msg2: this.state.msg2.concat(nextProps.msghistory[0].message)
        })
        console.log("this.state.msg2" + this.state.msg2)
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

        let redirectVar = null;
        if(localStorage.getItem("myjwttoken") && type=="traveler")
            console.log("Able to read token");
            else{
            redirectVar = <Redirect to= "/tlogin"/>
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
    <li><Link to="/mytrips">My Trips</Link></li>
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
    <div class = "navbarborder">
    <div class="collapse navbar-collapse">
    <ul class="nav navbar-nav pull-left">
        <li><Link to="/mytrips">My Trips</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/home">Home</Link></li>
    </ul>
</div>
</div>
<div className="container">
            <h3>Your Messages</h3>
            <div className="jumbotron">
                
                    {details}
                    <div className="row">
                    <form onSubmit={this.sendmsg}>
                        <textarea onChange={this.onChange} placeholder='Send a Message to Owner by typing here!' />

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

export default connect(mapStateToProps, { pushMsg, getmsgs })(TInbox);