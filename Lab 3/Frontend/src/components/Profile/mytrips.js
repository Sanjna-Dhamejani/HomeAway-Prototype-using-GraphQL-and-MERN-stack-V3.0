import React, {Component} from 'react';
import _ from "lodash";
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import ha from './ha.svg'
import birdhouse from './birdhouse.svg'
import { connect } from "react-redux";
import { mytrips } from "../../actions";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import {withApollo} from 'react-apollo'
import {MyTripsQuery} from '../../queries/queries'
import './listings.css';
import jwtdecode from 'jwt-decode';

var uemail;
var details;

if(localStorage.getItem("myjwttoken")){
    var tokenvalue = jwtdecode(localStorage.getItem("myjwttoken"));
    var type = tokenvalue.user.usertype
    var useremail = tokenvalue.user.email
    console.log("decoded  " + tokenvalue)
}

class MyTrips extends Component {
    constructor(props){
        super(props);
        this.state = {  
            activePage: 1,
            current : 1,
            itemsPerPage :5,
            bookingdata :[],
            searchmytrips : [],
            searchFlag : false,
            temp : [],
            arrive : "",
            depart : "",
            email : useremail
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.onInputChange =this.onInputChange.bind(this);
        this.arrivaldatehandler = this.arrivaldatehandler.bind(this);
        this.departdatehandler = this.departdatehandler.bind(this);
        this.searchdate =this.searchdate.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        //this.submitBooking = this.submitBooking.bind(this);
    }  

    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
        localStorage.removeItem("myjwttoken")
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

    clickHandler(e) {
        this.setState({
            current: Number(e.target.id)
        });
      }

    componentDidMount(){
        // uemail = this.props.useremail
        // this.props.mytrips(tokenvalue.user.email)
        this.props.client.query({
            query: MyTripsQuery,
            variables:{
                email : this.state.email,
            }
        }).then(res=>{
            if (res.data.usertrips.error){
                alert("Error")
            }
            else{
               this.setState({
                   temp: res.data.usertrips
               })
            }


        })
    }

    // componentWillReceiveProps(nextProps){
    //            this.setState({
    //                temp : nextProps.tdashdetails
    //            })
    //            console.log('this.props.tdashdetails receive props',nextProps.tdashdetails)
    //            console.log("temp when no search receive props", this.state.temp)
   
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
        temp : this.state.temp.concat(response.data)
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


        // console.log("this.props.tdashdetails in render",this.props.tdashdetails)
        console.log("temp when in render", this.state.temp)
        details = currentTodos.map((bookingdata,j) => {
            return(
                <div class ="flex-container7">
                <div><tr key={j}>
                <tr><td><h4>{bookingdata.headline}</h4></td></tr>
   
                    <tr><td>Booked for {bookingdata.accommodates} Guests.</td></tr>&nbsp; &nbsp; &nbsp;
                    <tr><td>Booked from {bookingdata.arrival} to {bookingdata.depart}</td></tr>
                    <tr><td>Owner email: {bookingdata.oemail}. Please contact for further queries. </td></tr>
                    </tr>
                    </div>
                </div>
            )
            })
                     
        //if not logged in go to login page
        let redirectVar = null;
        if(localStorage.getItem("myjwttoken") && type=="traveler")
            console.log("Able to read token")
            else{
            redirectVar = <Redirect to= "/tlogin"/>
        }
        return(
                <div>
                {redirectVar}
                <div class="navbarborder">
                <nav class="navbar navbar">
        <div class="container-fluid">
        <div class="navbar-header">
        <img src = {ha} height="50" width="200"></img>
        </div>
        <ul class="nav navbar-nav navbar-right">
        <li><a href="#">Tripboards</a></li>
                <li><Link to="/home" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                <li><a href="/help">Help</a></li>
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
		</ul>
    </div>
    </div>
                <div class="container">
                <div class = "searchmytrips">
                <br></br>
                <input onChange = {this.onInputChange} className="destination"type="search" name="searchmytrips"  placeholder="Enter the property to be searched!"/>&nbsp;&nbsp;
                <input onChange = {this.arrivaldatehandler} className="belowwhere" type="date" value={this.state.arrive} name="arrive" placeholder="Arrive"/>&nbsp;&nbsp;
                <input onChange = {this.departdatehandler} className="belowwhere" type="date" value={this.state.depart} name="depart" placeholder="Depart"/>&nbsp;&nbsp;
                <button onClick = {this.searchdate} className="btn btn-primary" type="submit">Search</button>
                
                </div>

                <hr></hr>    
                <h2>Your Bookings:</h2>
                        <table class="table">
                        <br></br><br></br>
                            <thead>
                                <tr>
                                </tr>
                            </thead>
                            <tbody>
                                {details}
                                <br></br><br></br>
                                <Link to="/home" class="btn btn-success">Home</Link>
                            </tbody>
                        </table>
                </div> 
                <div class="page">
                {showPageNumbers1}
                </div>
            </div> 
        )
        
    }
}

const mapStateToProps = state => ({
    tdashdetails : state.tdash.travelerdash,
    useremail : state.login.email,
  })
  
  export default withApollo(MyTrips);