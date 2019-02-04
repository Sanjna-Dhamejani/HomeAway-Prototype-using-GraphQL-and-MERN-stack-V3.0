import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from "react-redux";
import { homesearch } from "../../actions";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import {BrowserRouter} from 'react-router-dom';
import logoha from './logoha.png'
import { throws } from 'assert';
import jwtdecode from 'jwt-decode';
import {withApollo} from 'react-apollo'
import {PropertySearch} from '../../queries/queries'
let redirectVar = null;
var email;
var username;

if(localStorage.getItem("myjwttoken")){
    var tokenvalue = jwtdecode(localStorage.getItem("myjwttoken"));
    console.log("decoded  " + tokenvalue)
        email = tokenvalue.user.email;
        username = tokenvalue.user.firstname + " " + tokenvalue.user.lastname
}

class Home extends Component {

    //call the constructor method
    constructor(props){
      //Call the constructor of Super class i.e The Component
      super(props);
      //maintain the state required for this component

      this.state = {
          uemail: "",
          destination : "",
          arrive : "",
          depart : "",
          guests : "",
      }

      this.handleLogout = this.handleLogout.bind(this);
      this.onChange = this.onChange.bind(this);
      this.search = this.search.bind(this); 
  }
  //handle logout to destroy the cookie
  handleLogout = () => {
      cookie.remove('cookie', { path: '/' })
      localStorage.removeItem("myjwttoken")
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value})
} 

  search = (e) => {
      e.preventDefault();

      var data = {
          uemail : tokenvalue.user.email,
          arrive : this.state.arrive,
          depart : this.state.depart,
          destination : this.state.destination,
          guests : this.state.guests,
      }
      console.log("home data",data)
      console.log("this.props.useremail",this.props.useremail)
      //localStorage.setItem("UserInput",JSON.stringify(data))

        this.props.homesearch(data)
        
        console.log("homesearchdata", this.props.homesearchdata);
        console.log("homesearchdata length", this.props.homesearchdata.length);
              if(this.props.homesearchdata){
                  redirectVar = <Redirect to= "/listings"/>    
              }
      }
    


  render(){
    let navLogin = null;
    if(localStorage.getItem("myjwttoken")){
        navLogin = (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#"></a>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="nav navbar-nav navbar-right">
                <li className="nav-item active">
                  <Link to="/mytrips" className="nav-link">Tripboards <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item active">
                  <a className="nav-link" href="#">Help <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">My Account: {username}</a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><Link to="/profile" className="dropdown-item">My Profile</Link></li>
                <li><Link to="/tmaininbox" className="dropdown-item">Inbox</Link></li>
                <li><Link to="/home" onClick = {this.handleLogout}className="dropdown-item">Logout</Link></li>
                
                </div></li>
                <li className="nav-item">
                <Link to ="/osignup" className="btn btn-default" >List your property</Link>
                </li>
                <li className="nav-item">
                <a className="site-header-birdhouse" title="Learn more"><img alt="HomeAway birdhouse" className="site-header-birdhouse__image" role="presentation" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg"/></a>
                </li>
              </ul>
            </div>
          </nav>
        
        )
        }
        else{
            navLogin = (
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#"></a>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item active">
                      <a className="nav-link" href="#">Tripboards <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item active">
                      <a className="nav-link" href="#">Help <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Login
                    </a>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><Link to="/tlogin" className="dropdown-item" >Traveler Login</Link></li><br></br>
                    <li><Link to="/ologin" className="dropdown-item" >Owner Login</Link></li>
                    </div></li>
                    <li className="nav-item">
                    <Link to="/osignup" className="btn btn-default">List your property</Link>
                    </li>
                    <li className="nav-item">
                    <a className="site-header-birdhouse" title="Learn more"><img alt="HomeAway birdhouse" className="site-header-birdhouse__image" role="presentation" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg"/></a>
                    </li>
                  </ul>
                </div>
              </nav>
            
            )
        }
        return(
                <div>
                {redirectVar}
                    <div className = "backgroundimage">
                    <nav className="navbar">
                    <div className="container-fluid">
                        <div className="navbar-header">
                        <img src={logoha}></img>
                        </div>
                        {navLogin}
                    </div>
                </nav>
                        <div className="Jumbotron">
                            <div className="Jumbotron__wrapper">
                                <div className="Jumbotron__content">
                                <div className="home_search ">
                                    <h1 className="Intro">
                                        <span className="HeadLine__text">Book beach houses, cabins,</span>
                                        </h1>
                                    <h1 className="Intro">
                                        <span className="HeadLine__text">condos and more, worldwide.</span>
                                    </h1>
                                    <form className="form_inline " method="post">
                                    <div className="home_inputs">
                                    
                                    <input onChange = {this.onChange} className="destination"type="search" value={this.state.destination} name="destination"  placeholder="Where do you want to go?"/>
                                    &nbsp;&nbsp;
                                    <input onChange = {this.onChange} className="belowwhere" type="date" value={this.state.arrive} name="arrive" placeholder="Arrive"/>&nbsp;&nbsp;
                                    <input onChange = {this.onChange} className="belowwhere" type="date" value={this.state.depart} name="depart" placeholder="Depart"/>&nbsp;&nbsp;
                                    <input onChange = {this.onChange} className="belowwhere" type="number" value={this.state.guests} name="guests" placeholder="Guests"/>&nbsp;&nbsp;
                                    
                                    <button onClick = {this.search} className="btn btn-primary" type="submit">Search</button>
                                    </div>
                                    </form>
                                    <div className="flex-container">
                                        <div><p><strong>Your whole vacation starts here.</strong></p>
                                                <p>Choose a rental from the world's best selection.</p>
                                        </div>
                                        <div>
                                        <p><strong>Book and stay with confidence.</strong></p>
                                        <a href="https://www.homeaway.com/info/ha-guarantee/travel-with-confidence?icid=il_o_link_bwc_homepage">Secure payments, peace of mind</a>
                                        </div>
                                        <div>
                                        <p><strong>Your vacation your way.</strong></p>
                                        <p>More space, more privacy, no compromises.</p>
                                        </div>
                                        </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              
<footer className="page-footer font-small teal pt-4">
    <div className="container-fluid text-center">
      <div className="row">
        
          
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p>Use of this website constitutes acceptance of the HomeAway.com Terms and Conditions and Privacy Policy.</p>
            <br></br>
          <p>©2006-Present HomeAway.com, Inc. All rights reserved.</p>
        
        
        </div>
      </div>
    <div className="footer-copyright text-center py-3">© 2018 Copyright:
      <a href="https://homeaway.com"> HomeAway.com</a>
    </div>
  </footer>

            </div>
                 
        )

    }
}

const mapStateToProps = state => ({
    homesearchdata : state.homered.homesearchdata,
    useremail : state.login.email,

  })
  
  export default connect(mapStateToProps, { homesearch })(Home);