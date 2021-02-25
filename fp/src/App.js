import React from 'react';
import {Switch, Route } from 'react-router-dom';
import './App.css';
import './Grid.css';
import Home from './components/Home'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Footer from './components/footer'
import CourseContainer from './containers/CourseContainer';
import BusinessContainer from './containers/BusinessContainer';
import UserContainer from './containers/UserContainer';
import { connect } from 'react-redux'
import { getCourses } from './redux/actions'
import { userSignUp } from './redux/actions'
import { getUsers } from './redux/actions'

class App extends React.Component {


componentDidMount(){
  this.props.fetchUsers()
  if (this.props.courses.length === 0){
    this.props.fetchCourses()
  }
  const token = localStorage.getItem("token")
  if (token) {
    fetch("http://localhost:3000/api/v1/profile", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}`},
    })
    .then(resp => resp.json())
    .then(data => {
      this.props.postUser(data.user)})
  } 
}

  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
        <Route path="/signup" render={() => <SignUp />} />
        <Route path="/login" render={() => <Login />} />
        <Route path="/home" render={() => <Home />} />
        <Route path="/courses" render={() => <CourseContainer/>} />
        <Route path="/businesses" render={() => <BusinessContainer />} />
        <Route path="/users" render={() => <UserContainer />} />
        </Switch>
        <Footer />
      </div>
    );
  }
  
}
const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser,
    courses: state.courses
  }
  }
const mapDispatchToProps = (dispatch) => {
  return { 
    fetchCourses: ()=> dispatch(getCourses()),
    postUser: (userObj) => dispatch(userSignUp(userObj)),
    fetchUsers: ()=> dispatch(getUsers())
        }
  } 

export default connect(mapStateToProps, mapDispatchToProps)(App);


