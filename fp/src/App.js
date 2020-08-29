import React from 'react';
import {Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import CourseContainer from './containers/CourseContainer';
import BusinessContainer from './containers/BusinessContainer';
import UserContainer from './containers/UserContainer';

class App extends React.Component {

  fetchBusinesses = () => {
    const url = "http://localhost:3000/api/v1/businesses"
    fetch(url)
    .then(resp => resp.json())
    .then(data => this.setState({businesses: data}))
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
        <Route path="/signup" render={() => <SignUp />} />
        <Route path="/home" render={() => <Home />} />
        <Route path="/courses" render={() => <CourseContainer/>} />
        <Route path="/businesses" render={() => <BusinessContainer />} />
        <Route path="/users" render={() => <UserContainer />} />
        </Switch>
      </div>
    );
  }
  
}

export default App;
