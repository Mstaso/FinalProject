import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './containers/Home'
import Navbar from './components/Navbar'

class App extends React.Component {

  state = {
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

  render() {
    console.log(this.state.businesses)
    return (
      <div className="App">
        <Navbar />
        <Home courses={this.state.courses}/>
      </div>
    );
  }
  
}

export default App;
