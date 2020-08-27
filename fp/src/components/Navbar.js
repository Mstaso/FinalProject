import React from 'react'
import { NavLink } from 'react-router-dom';


const link = {
    width: '100px',
    padding: '12px',
    margin: '0 6px 6px',
    background: 'black',
    textDecoration: 'none',
    color: 'white',
  }

class Navbar extends React.Component {
    render() {
      return (
        <div className="header">
          <h1> Nav </h1>
          {/* <Search searchValue={this.props.searchValue} changeHandler={this.props.changeHandler} /> */}
          <ul className="main-nav" >
          {/* <li><a href="#"><NavLink to="/welcome" exact>Welcome</NavLink></a></li> */}
          {/* <li><a href="#"><NavLink to="/posts" exact>Home</NavLink></a></li>
          <li><a href="#"><NavLink to="/newform" exact>New Post</NavLink></a></li>
          <li><a href="#"><NavLink to="/profile" exact><span style={{fontSize:"30px"}}>🖤</span></NavLink></a></li> */}
          </ul>
        </div>
      )
    }
}
export default Navbar;  