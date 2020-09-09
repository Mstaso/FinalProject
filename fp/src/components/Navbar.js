import React from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import Search from './Search'

const link = {
    width: '100px',
    padding: '12px',
    margin: '0 6px 6px',
    background: 'black',
    textDecoration: 'none',
    color: 'white',
  }

  const logo = require('../logo.png')  

class Navbar extends React.Component {

    render() {
      return (
        <div className="header">
          <h1 class="logo"><a href="#"><NavLink to="/home"><img id="logo" src={logo}/></NavLink></a></h1>
          <Search/>
          <ul className="main-nav" >
          <li className="coursesnav"> <a href="#"><NavLink to="/courses" exact>Courses</NavLink></a></li>
          <li className="businessnav"><a href="#"><NavLink to="/businesses" exact>Businesses</NavLink></a></li>
          <li className="login"><a href="#"><NavLink to="/users" exact>Users</NavLink></a></li>
          </ul>
        </div>
      )
    }
}
export default withRouter(Navbar);  