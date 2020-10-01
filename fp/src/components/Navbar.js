import React from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import Search from './Search'
import { connect } from 'react-redux'
import { userSignUp } from '../redux/actions'

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

  logOutHandler = (e) => {
    // e.target.text = "Login / Signup"
    localStorage.removeItem("token")
    this.props.postUser("")
  }
    render() {
      console.log(this.props.loggedInUser)
      return (
        <div className="header">
          <h1 class="logo"><a href="#"><NavLink to="/home"><img id="logo" src={logo}/></NavLink></a></h1>
          <Search/>
          <ul className="main-nav" >
          <li className="coursesnav"> <a href="#"><NavLink to="/courses" exact>Courses</NavLink></a></li>
          <li className="businessnav"><a href="#"><NavLink to="/businesses" exact>Businesses</NavLink></a></li>

          {this.props.loggedInUser.id != undefined ? <li className="profilenav"><a href="#"><NavLink to={`/users/${this.props.loggedInUser.id}`} exact>Profile</NavLink></a></li> :
          <li className="profilenav"><a href="#"><NavLink to="/login" exact>Profile</NavLink></a></li>}

          {this.props.loggedInUser.id != undefined ? <li onClick={this.logOutHandler} className="login"><a href="#"><NavLink to="/login" exact>Logout</NavLink></a></li> :
          <li className="login"><a href="#"><NavLink to="/login" exact>Login / Signup</NavLink></a></li>
          }
         
          </ul>
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
      loggedInUser: state.loggedInUser,
  }
}

const mapDispatchToProps = (dispatch) => {
    return { 
      postUser: (userObj) => dispatch(userSignUp(userObj))
  }
}   

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));