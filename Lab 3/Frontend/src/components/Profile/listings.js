import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import ha from './ha.svg'
import birdhouse from './birdhouse.svg'
import { connect } from "react-redux";
import { homesearch } from "../../actions";
import { filterresults } from "../../actions";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './listings.css';
import jwtdecode from 'jwt-decode';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
//var redirectVar = null;
var tempparse;

if(localStorage.getItem("myjwttoken")){
    var tokenvalue = jwtdecode(localStorage.getItem("myjwttoken"));
    console.log("decoded  " + JSON.stringify(tokenvalue))
       var email = tokenvalue.user.email;
      var  username = tokenvalue.user.firstname + " " + tokenvalue.user.lastname
      var type = tokenvalue.user.usertype
      console.log("type",type)
}

class Listings extends Component {
    constructor(props){
        super(props);
        this.state = {  
            activePage: 1,
            current : 1,
            itemsPerPage :10,
            searchresults : [],
            pics:[],   
            bedroomfilter:[],
            pricefilter:[],
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.pricehandler =this.pricehandler.bind(this);
        this.bedroomhandler = this.bedroomhandler.bind(this);
        this.filter = this.filter.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }  

    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
        localStorage.removeItem("myjwttoken")
    }

    bedroomhandler = (e) => {
        this.setState({
            bedroomfilter : e.target.value,
        })
    }

    pricehandler = (e) => {
        this.setState({
            pricefilter : e.target.value,
        })
    }

    clickHandler(e) {
        this.setState({
            current: Number(e.target.id)
        });
      }

    filter=(e) =>{
        const data={
            uemail : tokenvalue.user.email,
            arrive : this.props.userip.arrive,
            depart : this.props.userip.depart,
            destination : this.props.userip.destination,
            guests : this.props.userip.guests,
            bedrooms : this.state.bedroomfilter,
            price : this.state.pricefilter
    
        }
    
        console.log("Data listing filter",data)
        this.props.filterresults(data)
    }
 
 


componentWillReceiveProps(nextProps){

    for (let i = 0; i < nextProps.homesearchdata.length; i++) {
        axios.post('http://localhost:3001/download/' + nextProps.homesearchdata[i].propertypics.split(',')[0])
            .then(response => {
                //console.log("Imgae Res : ", response);
                let imagePreview = 'data:image/jpg;base64, ' + response.data;
              //  imageArr.push(imagePreview);
                var propertyArr = nextProps.homesearchdata.slice();
                propertyArr[i].propertypics = imagePreview;
                this.setState({
                    homesearchdata : propertyArr
                });
            });
    }
}
   componentWillMount(){
    for (let i = 0; i < this.props.homesearchdata.length; i++) {
        axios.post('http://localhost:3001/download/' + this.props.homesearchdata[i].propertypics.split(',')[0])
            .then(response => {
                //console.log("Imgae Res : ", response);
                let imagePreview = 'data:image/jpg;base64, ' + response.data;
              //  imageArr.push(imagePreview);
                var propertyArr = this.props.homesearchdata.slice();
                propertyArr[i].propertypics = imagePreview;
                this.setState({
                    homesearchdata : propertyArr
                });
            });
    }
    

   }

   componentDidMount(){

   }

    render(){

        const { current, itemsPerPage } = this.state;
        const indexOfLastPage = current * itemsPerPage;
        const indexOfFirstPage = indexOfLastPage - itemsPerPage;
        const currentTodos = this.props.homesearchdata.slice(indexOfFirstPage, indexOfLastPage);
        console.log("Number of properties : " + this.props.homesearchdata.length);
        
        const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.homesearchdata.length / itemsPerPage); i++) {
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

            let details = currentTodos.map((searchresult,j) => {
            return(

                <div class ="flex-container7" key={j}  >
                <div class = "row">
                <div class = "column left">
                <img class = "listingimage1" src={searchresult.propertypics}/></div>
                <br></br>
                <div class = "column right"><h4><Link to={`/displayprop/${searchresult._id}`}>{searchresult.headline}</Link></h4><hr></hr><br></br>
                    {searchresult.bedrooms}BR &nbsp; &nbsp; &nbsp;
                    {searchresult.bathrooms}BA&nbsp; &nbsp; &nbsp;
                    Sleeps {searchresult.accommodates}&nbsp; &nbsp; &nbsp;
                    <br></br>
                    $ {searchresult.price} per night
                    <hr></hr>
                    </div>
                    </div>
                </div>

            )
            })
        //if not logged in go to login page
        let redirectVar = null;
        if(localStorage.getItem("myjwttoken") && type=="traveler"){
            console.log("Able to read token:");
            //redirectVar = <Redirect to= "/pdetails"/>
        }    
        //redirect based on successful login
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
        <li><Link to="/mytrips">Tripboards</Link></li>
                <li><Link to="/home" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                <li><a href="/help">Help</a></li>
                <li >
                <button class="btn btn-default" href="/osignup">List your property</button>
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
            <li><Link to="/tmaininbox">Inbox</Link></li>
		</ul>

    </div>
    </div>
    <div class = "navbarborder">
    <div class="collapse navbar-collapse">
    <li class="dropdown  fontprop menu-items">
    <Link to="#" class="dropdown-toggle" data-toggle="dropdown"><font color="black">Price<span></span></font></Link> 
        
    <ul class="dropdown-menu nav navbar-nav pull-left">  
               <div className="slider width">
                <span className="slidetxt">$0 to {this.state.pricefilter}</span>
                <input class="slider" type="range" min="0" max="1000" step="1" value={this.state.pricefilter} onChange={this.pricehandler}/>
               </div>
               </ul>
               </li>
               <li class="dropdown  fontprop menu-items1">
               <Link to="#" class="dropdown-toggle" data-toggle="dropdown"><font color="black">Bedrooms</font></Link> 
               <ul class="dropdown-menu"> 
               <div className="slider1 widthh">
               <span className="slidetxt">{this.state.bedroomfilter}</span>
                <input class="slider" type="range" min="0" max="10" step="1" value={this.state.bedroomfilter} onChange={this.bedroomhandler}/> 
                </div>
                </ul>
                </li>
                <button onClick = {this.filter} className="btn btn-primary a" type="submit">Filter</button>
                
                </div>
    </div>
                <div class="container">
                    <h2>List of All Available Properties</h2>
                    <h3>{this.props.homesearchdata.length} Results found!</h3>
                        
                                {details}
                           
                </div> 
            <div className="page">
            {showPageNumbers1}
            </div>
            </div> 
            
        )
    }
}
const mapStateToProps = state => ({
    homesearchdata : state.homered.homesearchdata,
    useremail : state.login.email,
    userip :state.homered.userinput,
  })
  
  export default connect(mapStateToProps,{homesearch, filterresults})(Listings);