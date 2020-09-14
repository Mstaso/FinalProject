import React from 'react';
import {Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import Login from './components/Login'
import UserTemplateContainer from './containers/UserTemplateContainer'
import CourseContainer from './containers/CourseContainer';
import BusinessContainer from './containers/BusinessContainer';
import UserContainer from './containers/UserContainer';
import { connect } from 'react-redux'
import { getCourses } from './redux/actions'

class App extends React.Component {


// componentDidMount(){
//   this.props.fetchCourses()
// }

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
        {/* <Route path="/template" render={() => <UserTemplateContainer courses={this.props.courses} />} /> */}
        <Route path="/users" render={() => <UserContainer />} />
        </Switch>
      </div>
    );
  }
  
}
// const mapStateToProps = (state) => {
//   return {courses: state.courses}
//   }
// const mapDispatchToProps = (dispatch) => {
//   return { fetchCourses: ()=> dispatch(getCourses())}
// } 

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;

