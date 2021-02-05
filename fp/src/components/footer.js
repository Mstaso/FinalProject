import React from 'react'
import { NavLink } from 'react-router-dom';

class Footer extends React.Component {

    render() {
      return (
          <footer>
            <div class="row">
          <ul class="footer-nav" >
          <li> <a href="#"><NavLink to="/home" exact>Home</NavLink></a></li>
          <li> <a href="#"><NavLink to="/courses" exact>Courses</NavLink></a></li>
          <li><a href="#"><NavLink to="/businesses" exact>Businesses</NavLink></a></li>
          </ul>
          </div>
          </footer>
      )
    }
}

export default Footer;