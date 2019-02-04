import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import {Redirect} from 'react-router';
import { gettmsgs } from '../../actions';
import ha from './ha.svg';
import cookie from 'react-cookies';
import birdhouse from './birdhouse.svg';
import jwtdecode from 'jwt-decode';

class TMainInbox extends Component {
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
        console.log("this.props.travelermsgs"+nextProps.travelermsgs)
        this.setState({
            msg:this.state.msg.concat(nextProps.travelermsgs)
        })
    }

    componentWillMount(){
        console.log("Token in did mount" + localStorage.getItem("myjwttoken"))
        if(localStorage.getItem("myjwttoken")){
            var tokenvalue = jwtdecode(localStorage.getItem("myjwttoken"));
            console.log("decoded  " + tokenvalue)
            this.setState({
                token: true,
                temail: tokenvalue.user.email,
                username: tokenvalue.user.firstname,
                type: tokenvalue.user.usertype
            })
        }
    }
    componentDidMount(){
        var data={
            type: this.state.type,
            email : this.state.temail
        }
        console.log("COMPONENT DID MOUNT this.state.temail ", this.state.temail);
        console.log("Data from Tmaininbox for get call",data)
        this.props.gettmsgs(data);
        
    }

    render() {
        let details = this.state.msg.map((message, i) => {
            return (
                <div  key={i}>
               
                <span> <Link to={`/tinbox/${message._id}`}>{message.headline}</Link></span><br></br>
                <hr></hr>  
                <h5>Message from Owner: {message.oemail}</h5>  
                <span> {message.city}</span><br></br>    
                <span> {message.state}</span>
                    
                </div>

            )
        })
        let redirectVar = null;
        if(localStorage.getItem("myjwttoken") && this.state.type=="traveler")
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
            <h3>Your Personal Inbox</h3>
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
    travelermsgs : state.msgred.tmsgs,
    useremail : state.login.email,
});

export default connect(mapStateToProps, { gettmsgs })(TMainInbox);