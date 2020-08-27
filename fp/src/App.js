import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home'
import Navbar from './components/Navbar'
import CourseContainer from './containers/CourseContainer';
import BusinessContainer from './containers/BusinessContainer';

class App extends React.Component {

  state = {
    course: {},
    courses: [],
    businesses: [],
    users: [],
  }
  
  componentDidMount(){
    this.fetchCourses()
    this.fetchBusinesses()
  }

  fetchCourses = () => {
    const url = "http://localhost:3000/api/v1/courses"
    fetch(url)
    .then(resp => resp.json())
    .then(data => this.setState({courses: data}))
  }
  fetchBusinesses = () => {
    const url = "http://localhost:3000/api/v1/businesses"
    fetch(url)
    .then(resp => resp.json())
    .then(data => this.setState({businesses: data}))
  }

  appClickHandler = (courseObj) => {
    this.setState({ course: courseObj})
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
        <Route path="/home" render={() => <Home courses={this.state.courses} appClickHandler={this.appClickHandler} businesses={this.state.businesses}/>} />
        <Route path="/courses" render={() => <CourseContainer courses={this.state.courses} appClickHandler={this.appClickHandler}/>} />
        <Route path="/businesses" render={() => <BusinessContainer businesses={this.state.businesses}/>} />
        </Switch>
      </div>
    );
  }
  
}

export default App;
