import React, {Component} from 'react';
import axios from 'axios';
import _ from "lodash";
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import lp from './lp.svg'
import { connect } from "react-redux";
import { odashboard } from "../../actions";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './property.css';
import jwtdecode from 'jwt-decode';
import {withApollo} from 'react-apollo'
import {OdashboardQuery} from '../../queries/queries'
var oemail;
var details;

if(localStorage.getItem("myjwttoken")){
    var tokenvalue = jwtdecode(localStorage.getItem("myjwttoken"));
    console.log("decoded  " + tokenvalue)
       var email = tokenvalue.user.email;
      var  username = tokenvalue.user.firstname + " " + tokenvalue.user.lastname
      var type = tokenvalue.user.usertype
}

class OwnerDashboard extends Component{
    //call the constructor method
    constructor(props){
        //Call the constructor of Super class i.e The Component
        super(props);

        this.state = {
            activePage: 1,
            current : 1,
            itemsPerPage :5,
            propertydisplay:[],
            searchowner:[],
            searchFlag : false,
            temp: [],
            arrive : "",
            depart : ""
        }
        //maintain the state required for this component
        this.handleLogout = this.handleLogout.bind(this);
        this.onInputChange =this.onInputChange.bind(this);

        this.arrivaldatehandler = this.arrivaldatehandler.bind(this);
        this.departdatehandler = this.departdatehandler.bind(this);
 
        this.searchdate =this.searchdate.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        }

        //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
        localStorage.removeItem("myjwttoken")
    }

    // ownersearchhandler = (e) =>{
    //     this.setState({
    //         searchowner :  e.target.value,
    //         searchFlag : true
    //     })
    // }     

    clickHandler(e) {
        this.setState({
            current: Number(e.target.id)
        });
      }

    arrivaldatehandler = (e) =>{
        this.setState({
            arrive :  e.target.value,
            searchFlag : true
        })
    } 

    departdatehandler = (e) =>{
        this.setState({
            depart :  e.target.value,
            searchFlag : true
        })
    } 

    componentDidMount(){
        oemail = tokenvalue.user.email
        this.props.client.query({
            query: OdashboardQuery,
            variables:{
                email : oemail,
            }
        }).then(res=>{
            if (res.data.ownerdashboard.error){
                alert("Error")
            }
            else{
               this.setState({
                   temp: res.data.ownerdashboard
               })
            }


        })
    }

    // componentWillReceiveProps(nextProps){
    //            this.setState({
    //                temp : nextProps.odashdetails
    //            })
    //            console.log('this.props.odashdetails',this.props.odashdetails)
    //            console.log("temp when no search", this.state.temp)
   
    //     }

        onInputChange = (event) => {
    
            if(event.target.value){
            
                    let newSearch = _.filter(this.state.temp, i => i.headline.toLowerCase().includes((event.target.value).toLowerCase()))
    
                    this.setState({
                                temp : newSearch
                            })
                        }
                    }
    
searchdate = (e) => {
    var data = {
        email:tokenvalue.user.email,
        arrive:this.state.arrive,
        depart:this.state.depart
    }
    console.log("dataaaaaa", data)
    axios.post("http://localhost:3001/mytripsdatesearch",data)
    .then((response) => {
        console.log("Search date results my trip",response.data)
    this.setState({
        temp : response.data
    });
        console.log("Checking whether search date results are there or not",this.state.temp)
    });

}

    render(){

        const { current, itemsPerPage } = this.state;
        const indexOfLastPage = current * itemsPerPage;
        const indexOfFirstPage = indexOfLastPage - itemsPerPage;
        const currentTodos = this.state.temp.slice(indexOfFirstPage, indexOfLastPage);
        console.log("Number of properties : " + this.state.temp.length);
        
        const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.temp.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    const showPageNumbers1 = pageNumbers.map(number => {
        return (
          <li class="page-item active"
            key={number}
            id={number}
            onClick={this.clickHandler}
            className="nums"
          >
      {number} 
          </li>
        );
      });

         details = currentTodos.map((bookingdata,j) => {
            return(
                <div class ="flex-container34">
                <div className="odashdiv"><tr key={j}>
                <tr><td><h4>{bookingdata.headline}</h4></td></tr>
   
                    <tr><td>Booked for {bookingdata.accommodates} Guests.</td></tr>&nbsp; &nbsp; &nbsp;
                    <tr><td>Booked from {bookingdata.arrival} to {bookingdata.depart}</td></tr>
                    <tr><td>User email: {bookingdata.uemail}. Please contact for further queries. </td></tr>
                    
                    </tr>
                    </div>
                </div>
            )
            })
        

        //if Cookie is set render Logout Button
        let redirectVar = null;
        let navLogin = null;
        if(localStorage.getItem("myjwttoken")){
            console.log("Able to read token");
            navLogin = (
                <div className="navbarborder">
                <nav className="navbar navbar-white">
        <div className="container-fluid">
        <div className="navbar-header">
        <img src = {lp} height="50" width="200"></img>
        </div>
                <ul className="nav navbar-nav navbar-right">
                <li><Link to="/omaininbox">Inbox</Link></li>       
                <li><Link to="/home" onClick = {this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
                </div>
                </nav>
                </div>
            );
        }
        else{ 
            redirectVar = <Redirect to= "/ologin"/>
        }
        return(
            <div>
                {redirectVar}
                
                {navLogin}
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
            <div class="form-group">
                <div class = "searchmytrips">
                <input onChange = {this.onInputChange} className="destination"type="search" name="searchmytrips"  placeholder="Enter the property to be searched!"/>&nbsp;&nbsp;
                &nbsp; &nbsp; <input onChange = {this.arrivaldatehandler} className="belowwhere" type="date" value={this.state.arrive} name="arrive" placeholder="Arrive"/>&nbsp;&nbsp;
                <input onChange = {this.departdatehandler} className="belowwhere" type="date" value={this.state.depart} name="depart" placeholder="Depart"/>&nbsp;&nbsp;
                <button onClick = {this.searchdate} className="btn btn-primary a" type="submit">Search</button>
                
                </div>
                <h2>Your Property Bookings:</h2>
                <hr></hr>
                {details}
                <br></br><br></br>
                <tr><Link to="/home" class="btn btn-success">Home</Link></tr>
                <p align="center">Use of this Web site constitutes acceptance of the HomeAway.com Terms and conditions and Privacy policy.<br></br>
                ©2018 HomeAway. All rights reserved.<br></br>
                Start Co-browse</p>
            </div>
        </div>
        <div className="footer">
            <p>You will pay-per-booking. Consider a subscription if you plan to book frequently.</p>
        </div>
        
        </div>
        <div class="page">
                {showPageNumbers1}
                </div>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    odashdetails : state.odash.ownerdash,
    owneremail : state.login.email,
  })
  
  export default withApollo(OwnerDashboard);