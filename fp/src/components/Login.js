import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { userSignUp } from '../redux/actions'
import { getUsers } from '../redux/actions'

class Login extends React.Component {
    state = {
        username: "",
        password: ""
    }

    componentDidMount(){
        this.props.fetchUsers()
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    loginHandler = (e) => {
        e.preventDefault()
        let userToLogin = this.props.users.find(user => user.username === this.state.username)
        if (userToLogin) { 
            this.props.postUser(userToLogin)
            this.props.history.push("/home");
        } else {
            alert('There are no users with that password or username')
        }
        

    }

    render () {
        return(
            <>
            <div class="container-logo">
              <div>
                <div class="loader">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  </div>
                  </div>
                  </div>
                  <div class="form-container">
                  <h1 class="title">Login</h1>
                  <form onSubmit={this.loginHandler}>
                      <div class="information-container">
                      <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.changeHandler} />
                      </div>
                      <div class="information-container"> 
                      <input type="text" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler} />
                      </div>
                      <input class="loginButton" type="submit" value="Login"/>
                  </form>
              </div>
            </>
          )
    }
        
    
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        loggedInUser: state.loggedInUser
    }
    }
  const mapDispatchToProps = (dispatch) => {
    return { fetchUsers: ()=> dispatch(getUsers()),
        postUser: (userObj) => dispatch(userSignUp(userObj))
    }
  } 
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));