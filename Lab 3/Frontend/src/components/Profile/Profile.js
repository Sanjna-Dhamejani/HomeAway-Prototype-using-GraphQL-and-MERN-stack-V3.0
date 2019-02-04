import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import ha from './ha.svg'
import birdhouse from './birdhouse.svg'
import { connect } from "react-redux";
import { profilepost } from "../../actions";
import { profileget } from "../../actions";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import jwtdecode from 'jwt-decode';
import './Profile.css';
import { updateUserMutation } from '../../mutation/mutation';
import { graphql, compose } from 'react-apollo';
var swal = require('sweetalert')
//var redirectVar = null;
var formData = "";
var tempprofile ="";
var tempprofile2 = []
var tokenvalue;
var type;
//Define a Login Component

class Profile extends Component{
    //call the constructor method
    constructor(props){
        //Call the constructor of Super class i.e The Component
        super(props);
        
        //maintain the state required for this component
        this.state = {
            uemail : "",
            ufirstname : "",
            ulastname : "",
            aboutme: "",
            citycountry: "",
            company: "",
            school: "",
            hometown: "",
            languages: "",
            phone: "",
            gender: "",
            profileCreated : false,
            ufirstnameFlag : false,
            ulastnameFlag : false,
            aboutmeFlag: false,
            citycountryFlag: false,
            companyFlag: false,
            schoolFlag: false,
            hometownFlag: false,
            languagesFlag: false,
            phoneFlag: false,
            genderFlag: false,
            profilefields: [],
            profileUpdated : false,
            description: '',
            selectedFile: '',
        }
        //Bind the handlers to this class
        this.ufirstnameChangeHandler = this.ufirstnameChangeHandler.bind(this);
        this.ulastnameChangeHandler = this.ulastnameChangeHandler.bind(this);
        this.aboutmeChangeHandler = this.aboutmeChangeHandler.bind(this);
        this.ccChangeHandler = this.ccChangeHandler.bind(this);
        this.companyChangeHandler = this.companyChangeHandler.bind(this);
        this.schoolChangeHandler = this.schoolChangeHandler.bind(this);
        this.hometownChangeHandler = this.hometownChangeHandler.bind(this);
        this.languagesChangeHandler = this.languagesChangeHandler.bind(this);
        this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
        this.genderChangeHandler = this.genderChangeHandler.bind(this);
        this.createProfile = this.createProfile.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
        localStorage.removeItem("myjwttoken")
    }
    //username change handler to update state variable with the text entered by the user
    
    onChange = (e) =>
    {
       for(let size=0; size < e.target.files.length; size++){
           console.log('Selected file:', e.target.files[size]);
           let file = e.target.files[size];

           console.log("uploading screenshot file for:", this.props.useremail)
           formData = new FormData();
           formData.append('selectedFile', file);
          
           axios.post(`http://localhost:3001/profilepic/${this.props.useremail}`, formData)
           .then((result) => {
             // access results...
           });
       }
   }

    ufirstnameChangeHandler = (e) => {
        this.setState({
            ufirstname : e.target.value,
            ufirstnameFlag : true
        })
    }
    
    ulastnameChangeHandler = (e) => {
        this.setState({
            ulastname : e.target.value,
            ulastnameFlag :true
        })
    }

    aboutmeChangeHandler = (e) => {
        this.setState({
            aboutme : e.target.value,
            aboutmeFlag : true
        })
    }

    ccChangeHandler = (e) => {
        this.setState({
            citycountry : e.target.value,
            citycountryFlag : true
        })
    }

    companyChangeHandler = (e) => {
        this.setState({
            company : e.target.value,
            companyFlag : true
        })
    }

    schoolChangeHandler = (e) => {
        this.setState({
            school : e.target.value,
            schoolFlag : true
        })
    }

    hometownChangeHandler = (e) => {
        this.setState({
            hometown : e.target.value,
            hometownFlag : true
        })
    }

    languagesChangeHandler = (e) => {
        this.setState({
            languages : e.target.value,
            languagesFlag : true
        })
    }

    phoneChangeHandler = (e) => {
        this.setState({
            phone : e.target.value,
            phoneFlag : true
        })
    }
    
    
    genderChangeHandler = (e) => {
        this.setState({
            gender : e.target.value,
            genderFlag : true
        })
    }

    //saveChanges handler to send a request to the node backend
    createProfile = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
         //   this.props.profilepost(data);
         this.props.updateUserMutation({
             variables:{
                uemail : tokenvalue.user.email,
                ufirstname : this.state.ufirstname,
                ulastname : this.state.ulastname,
                aboutme : this.state.aboutme,
                citycountry : this.state.citycountry,
                company : this.state.company,
                school : this.state.school,
                hometown : this.state.hometown,
                phone : parseInt(this.state.phone),
                languages : this.state.languages,
                gender : this.state.gender,
             }
         }).then(response => {
            console.log("Response after graphql", JSON.stringify(response.data.updateUser.aboutme))

            if(response.data.updateUser===null)
            {
                this.setState({
                    profileCreated:false
                })
                console.log("Profile Flag", this.state.profileCreated)
            }
            else{
                this.setState({
                    profileCreated:true
                })
                console.log("Profile Flag", this.state.profileCreated)
            }
         })
         if(this.state.profileCreated)
            swal("Profile Updated!", "Have a nice stay!", "success");
        }
    


        componentWillMount(){
            console.log("Token in will mount" + localStorage.getItem("myjwttoken"))
            if(localStorage.getItem("myjwttoken")){
                tokenvalue = jwtdecode(localStorage.getItem("myjwttoken"));
                console.log("decoded  " + tokenvalue)
                type = tokenvalue.user.usertype
            }

            console.log("Profile get component will mount")
            var lemail = document.cookie.substring(7)
            console.log("Profile email" , lemail)
            axios.get("http://localhost:3001/profile/"+tokenvalue.user.email)
                        .then((response) => {
                            console.log("CWM response.data ",response.data)
                        this.setState({
                            profilefields : this.state.profilefields.concat(response.data)
                        });
                        console.log("Checking whether profile array is there or not in component will mount ",this.state.profilefields[0])
                        
                        if(this.state.ufirstnameFlag==false){
                            console.log("Previous value for firstname", this.state.profilefields[0].firstname)
                            this.setState({
                                ufirstname : this.state.profilefields[0].firstname
                            })
                        }
                
                        if(this.state.ulastnameFlag==false){
                            console.log("Previous value for lastname", this.state.profilefields[0].lastname)
                            this.setState({
                                ulastname : this.state.profilefields[0].lastname
                            })
                        }
                
                        if(this.state.aboutmeFlag==false){
                            console.log("Previous value for aboutme", this.state.profilefields[0].aboutme)
                            this.setState({
                                aboutme : this.state.profilefields[0].aboutme
                            })
                        }
    
                        if(this.state.citycountryFlag==false){
                            console.log("Previous value for citycountry", this.state.profilefields[0].citycountry)
                            this.setState({
                                citycountry : this.state.profilefields[0].citycountry
                            })
                        }
    
                        if(this.state.companyFlag==false){
                            console.log("Previous value for company", this.state.profilefields[0].company)
                            this.setState({
                                company : this.state.profilefields[0].company
                            })
                        }
    
                        if(this.state.schoolFlag==false){
                            console.log("Previous value for school", this.state.profilefields[0].school)
                            this.setState({
                                school : this.state.profilefields[0].school
                            })
                        }
    
                        if(this.state.hometownFlag==false){
                            console.log("Previous value for hometown", this.state.profilefields[0].hometown)
                            this.setState({
                                hometown : this.state.profilefields[0].hometown
                            })
                        }
    
                        if(this.state.languagesFlag==false){
                            console.log("Previous value for languages", this.state.profilefields[0].languages)
                            this.setState({
                                languages : this.state.profilefields[0].languages
                            })
                        }
    
                        if(this.state.phoneFlag==false){
                            console.log("Previous value for phone", this.state.profilefields[0].phone)
                            this.setState({
                                phone : this.state.profilefields[0].phone
                            })
                        }
    
                        if(this.state.genderFlag==false){
                            console.log("Previous value for gender", this.state.profilefields[0].gender)
                            this.setState({
                                gender : this.state.profilefields[0].gender
                            })
                        }

    
                    });

                    console.log("CWM typeof(this.state.profilefields)",typeof(this.state.profilefields[0]))
                    console.log("CWM typeof(tempprofile2)",typeof(tempprofile2))
        
            }
    
        componentDidMount(){
            console.log("Inside component did mount")
            var lemail = document.cookie.substring(7)
            axios.get("http://localhost:3001/profile/"+lemail)
                    .then((response) => {
                        console.log("Profile get response data",response.data)
                    this.setState({
                        profilefields : this.state.profilefields.concat(response.data)
                    });
                    console.log("Checking whether profile array is there or not in CDM",this.state.profilefields)
                    console.log("this.state.profilefields",this.state.profilefields[0])
                tempprofile = response.data;
                
                console.log("Temp profile", tempprofile)
                
                console.log("CDM typeof(this.state.profilefields)",typeof(this.state.profilefields[0]))

                var imageArr = [];
                    axios.post('http://localhost:3001/download/' + tempprofile.profilepic)
                        .then(response => {
                            //console.log("Imgae Res : ", response);
                            let imagePreview = 'data:image/jpg;base64, ' + response.data;
                            imageArr.push(imagePreview);
                            //const propertyArr = this.state.Properties.slice();
                            tempprofile.profilepic = imagePreview;
                            this.setState({
                                profilefields: tempprofile
                            });
                        });
                    });
                    tempprofile2 = tempprofile;
                    console.log("Temp profile2", tempprofile2)
                    console.log("CDM typeof(tempprofile2)",typeof(tempprofile2))
                    console.log("Final profilefields:", this.state.profilefields[0])
            }
            
    render(){

        //redirect based on successful login
        let redirectVar = null;
        if(localStorage.getItem("myjwttoken")){
            //redirectVar = <Redirect to= "/"/>
            console.log("Able to read cookie")
        }
        else{ 
            redirectVar = <Redirect to= "/tlogin"/>
        }
        return(
            <div>
                {redirectVar}
                <div className="navbarborder">
                <nav className="navbar navbar">
        <div className="container-fluid">
        <div className="navbar-header">
        <img src = {ha} height="50" width="200"></img>
        </div>
        <ul className="nav navbar-nav navbar-right">
        <li><a href="#">Tripboards</a></li>
                <li><Link to="/home" onClick = {this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                <li><a href="/#">Help</a></li>
                <li >
                <button className="btn btn-default" href="/property">List your property</button>
                </li>
                <li><img src = {birdhouse} height="50" width="50"></img></li>
                <hr color></hr>
        </ul>
        </div>
        </nav>
        </div>
        <div className = "navbarborder">
        <div className="collapse navbar-collapse">
		<ul className="nav navbar-nav pull-left">
			<li><Link to="/mytrips">My Trips</Link></li>
			<li><Link to="/profile">Profile</Link></li>
		</ul>
   
    </div>
    </div>
    
        <div className="background1">
            <div className="container1">
                <div className="login-form1">
                <div>
                <div className="imagediv">
                <img className = "profileimage" src={tempprofile.profilepic}/>
                </div>

                
                
                <div className="profilepicuploadbutton">
                <label for="uploadpic" name ="description" /*value={description}*/ onChange={this.onChange} multiple className = "btn btn-success">SELECT PHOTO TO UPLOAD</label>
                <input type = "file" id ="uploadpic"  className ="hidethis" multiple name="selectedFile" onChange={this.onChange}/>
                </div>
        

                <div className="main-div1">
                <div className="panel1">
                    <h2><strong>Profile Information</strong></h2>
                </div>
                <div className="form-group1">
                <h5><strong>First Name:</strong></h5>
                <input onChange = {this.ufirstnameChangeHandler} type="text" className="form-control1" name="fname" placeholder={this.state.ufirstname} disabled/>
            </div>
            <div className="form-group1">
            <h5><strong>Last Name:</strong></h5>
                <input onChange = {this.ulastnameChangeHandler} type="text" className="form-control1" name="lname" placeholder={this.state.ulastname} disabled/>
            </div>
            <div className="form-group1">
            <h5><strong>About Me:</strong></h5>
                <input onChange = {this.aboutmeChangeHandler} type="text" className="form-control2" name="aboutme" placeholder={this.state.aboutme}/>
            </div>
            <div className="form-group1">
            <h5><strong>City and Country:</strong></h5>
                <input onChange = {this.ccChangeHandler} type="text" className="form-control1" name="cc" placeholder={this.state.citycountry}/>
            </div>
            <div className="form-group1">
            <h5><strong>Company:</strong></h5>
                <input onChange = {this.companyChangeHandler} type="text" className="form-control1" name="company" placeholder={this.state.company}/>
            </div>
            <div className="form-group1">
            <h5><strong>School:</strong></h5>
                <input onChange = {this.schoolChangeHandler} type="text" className="form-control1" name="school" placeholder={this.state.school}/>
            </div>
            <div className="form-group1">
            <h5><strong>Hometown:</strong></h5>
                <input onChange = {this.hometownChangeHandler} type="text" className="form-control1" name="hometown" placeholder={this.state.hometown}/>
            </div>
            <div className="form-group1">
            <h5><strong>Phone No:</strong></h5>
                <input onChange = {this.phoneChangeHandler} type="number" className="form-control1" name="number" placeholder={this.state.phone}/>
            </div>
            <div className="form-group1">
            <h5><strong>Languages:</strong></h5>
                <input onChange = {this.languagesChangeHandler} type="text" className="form-control1" name="languages" placeholder={this.state.languages}/>
            </div>
            <div className="form-group1">
            <h5><strong>Gender:</strong></h5>
            <input onChange = {this.genderChangeHandler} type="text" className="form-control1" name="gender" placeholder={this.state.gender}/>
            </div>
            <button onClick = {this.createProfile} className="btn btn-primary btn-lg btn-block ">Save Changes</button>  
        </div>
        </div>     
                                           
            </div>
            </div>
        </div>
        </div>
        )
    }
}

Profile.propTypes = {
    profilepost : PropTypes.func.isRequired,
    profileinsertedFlag : PropTypes.string,
    useremail : PropTypes.string
  }

const mapStateToProps = state => ({
  useremail : state.login.email,
  profileinsertedFlag : state.profilered.profileupdated
})

export default compose(
    graphql(updateUserMutation, { name: "updateUserMutation" })
)(Profile);