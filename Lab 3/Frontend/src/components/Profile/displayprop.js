import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import ha from './ha.svg'
import birdhouse from './birdhouse.svg'
import { connect } from "react-redux";
import { homesearch } from "../../actions";
import { booking } from "../../actions";
import { pushMsg } from '../../actions';
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './displaprop.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import jwtdecode from 'jwt-decode';
import { addBookingMutation } from '../../mutation/mutation';
import { graphql, compose } from 'react-apollo';
var swal = require('sweetalert')
var tempparse;
var redirectVar = null;
var propertyID;
var tempprop;
var userInput;

if(localStorage.getItem("myjwttoken")){
    var tokenvalue = jwtdecode(localStorage.getItem("myjwttoken"));
    var type = tokenvalue.user.usertype
    console.log("decoded  " + tokenvalue)
}

class DisplayProp extends Component {
    constructor(props){
        super(props);
        this.state = {
            oemail : "",  
            property : [],
            bookedFlag : false,
            pics:[],
            photos: [],
            msg:"",
            token:false,
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.submitBooking = this.submitBooking.bind(this);
        this.sendmsg = this.sendmsg.bind(this);
       this.onChange = this.onChange.bind(this)
    } 
    

    onChange(event){
        this.setState({
            msg : tokenvalue.user.firstname + " : " + event.target.value
        })
    }

    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
        localStorage.removeItem("myjwttoken")
    }
    
    componentWillReceiveProps(nextProps) {
       // console.log("JSON.stringify(nextProps)", JSON.stringify(nextProps))
        if (nextProps.bflag === "true") {
            swal("Booking Successful!", "Have a nice stay!", "success");
          console.log("nextProps.Bflag", nextProps.bflag)
          redirectVar = <Redirect to= "/mytrips"/>
          //this.props.posts.unshift(nextProps.newPost);
        }
       
      }

    //   componentWillMount(){
    //     console.log("Token in did mount" + localStorage.getItem("myjwttoken"))
        
    //   }

    componentDidMount(){
        

        var temppics = []
        console.log("Userinput",this.props.userip)
        propertyID = (this.props.history.location.pathname).substring(13)
    axios.post('http://localhost:3001/displaypropphotos/'+ propertyID)
                .then((response) => {
                    console.log("Printing photos response",response.data)
                     temppics = response.data;
                     console.log("temppics", temppics)
                     console.log("temppics after split", temppics[0].propertypics.split(','))

                this.setState({
                    pics : this.state.pics.concat(temppics[0].propertypics.split(','))
                });
                console.log("this.state.pics checkkk",this.state.pics)
                console.log("this.state.pics.length",this.state.pics.length)
                for (let i = 0; i < this.state.pics.length; i++) {
                    console.log("Inside for loop")
                    console.log("-----------")
                    console.log("checking state pics iteration   ", this.state.pics[i])
                    axios.post('http://localhost:3001/download/' + this.state.pics[i])
                        .then(response => {
                            console.log("Inside for post")
                            let imagePreview = 'data:image/jpg;base64, ' + response.data;
                            console.log(imagePreview)
                            //iarr.push(imagePreview);
                            const picsArray = this.state.pics.slice();
                            picsArray[i] = imagePreview;
                            this.setState({
                                pics: picsArray
                            });
                           // console.log('PhotoArr: ', picsArray);
                            console.log('Photo State: ', this.state.pics);
                       });
                }
            
            })

        console.log("PropertyID", propertyID)
        console.log("this.props.homesearchdata",this.props.homesearchdata)
        for(let i=0;i<this.props.homesearchdata.length;i++)
        { 
            console.log("this.props.homesearchdata[i]",this.props.homesearchdata[i])
            if(this.props.homesearchdata[i]._id==propertyID){
            tempprop = this.props.homesearchdata[i];
            console.log("tempprop now", tempprop)
            this.setState({
                property : this.state.property.concat(this.props.homesearchdata[i]), 
        });
    }
}
this.setState({
    oemail : tempprop.oemail
})

    console.log("Store item: in did mount before tempprop", tempprop)

        }

        sendmsg = (e) => {
            console.log("In send msg")
            console.log("this.state.oemail in displayprop", this.state.oemail)
            //console.log("this.props.location.oemail" + this.props.location.state.oemail);
            console.log("this.state.msg" + this.state.msg)
            // preventDefault()
            var data = {
                temail: tokenvalue.user.email,
                msg: this.state.msg,
                oemail: this.state.oemail,
                headline: tempprop.headline,
                state: tempprop.state,
                city: tempprop.city,
                isfirst : true

            }
            console.log("Data sent from traveler inbox", data)
    
            this.props.pushMsg(data)
        }
    
        submitBooking = (e) => {
            var headers = new Headers();
            //prevent page from refresh

            e.preventDefault();
            //set the with credentials to true
            //axios.defaults.withCredentials = true;

            this.props.addBookingMutation({
                variables:{
                    uemail : tokenvalue.user.email,
                    oemail : tempprop.oemail,
                    arrival : this.props.userip.arrive,
                    depart : this.props.userip.depart,
                    accommodates : parseInt(this.props.userip.guests),
                    propertyid : tempprop._id,
                    headline : tempprop.headline
                }
            }).then(response =>{
                if(response.data.addBooking.headline===null)
                {
                    this.setState({
                        bookedFlag:false
                    })
                    console.log("Bookedflag", this.state.bookedFlag)
                }
                else{
                    this.setState({
                        bookedFlag:true
                    })
                    console.log("Bookedflag", this.state.bookedFlag)
                }
            })
            console.log("this.props.bflag",this.props.bflag)
            if(this.state.bookedFlag)
            swal("Booking Successful!", "Have a nice stay!", "success");
         }

    render(){
        console.log("this.state.pics", this.state.pics)

        let pictures = this.state.pics.map(images => {
            return(
                <div>
                    <img class = "displaypropimage" src={images}/>
                </div>
            )
        })

        let details = this.state.property.map((pro,j) => {
            return(
                
                <div class ="flex-container8">
                
                <div class = "row">
                <div class = "column left">
                <Carousel class="carouselprop" showThumbs={false}>{pictures}</Carousel>
               </div>
               <div class = "column right">
               &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <h4>{pro.headline}</h4><br></br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  {pro.propertytype}&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    {pro.bedrooms}BR&nbsp; &nbsp; &nbsp;
                    {pro.bathrooms}BA&nbsp; &nbsp; &nbsp;
                    Sleeps {pro.accommodates}&nbsp; &nbsp; &nbsp;<br></br>
                    {pro.description}<hr></hr><br></br><br></br><br></br>
                    <hr></hr>${pro.price} per night<hr></hr>
                   <button onClick = {this.submitBooking} class="btn btn-success" type="submit">Book Now</button>
                   </div>
                   <div>
                   <input type = "textarea" onChange = {this.onChange} placeholder ="Enter your message here!" className="msgtext"/>
                   <button onClick ={this.sendmsg} class="btn btn-warning" type="submit">Send Message To Owner</button>
                   </div>
                    </div>
                </div>
            )
            })
            
        //if not logged in go to login page
        let redirectVar = null;
        if(localStorage.getItem("myjwttoken") && type=="traveler")
            console.log("Able to read token");
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
            <li><Link to="/tmaininbox">Inbox</Link></li>
		</ul>
    </div>
    </div>
                <div class="container">
                    <h2>Do you want to book this property?</h2>
                        <table class="table">
                        <br></br><br></br>
                            <thead>
                                <tr>
                                </tr>
                            </thead>
                            <tbody>
                                {details}
                            </tbody>
                        </table>
                </div> 
            </div> 
        )
    }
}
const mapStateToProps = state => ({
    homesearchdata : state.homered.homesearchdata,
    useremail : state.login.email,
    userip :state.homered.userinput,
    bflag: state.bookingred.bookingFlag
  })
  

  const displaypropexport =  compose(
    graphql(addBookingMutation, { name: "addBookingMutation" }),
    connect(mapStateToProps, { homesearch,pushMsg,booking })
)
  export default displaypropexport(DisplayProp);