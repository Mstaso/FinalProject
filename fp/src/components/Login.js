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
        fetch("http://localhost:3000/api/v1/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                 'accepts': 'application/json',
              },
            body: JSON.stringify({user: this.state})
        })
            .then(resp => resp.json())
            .then(data => {
                localStorage.setItem("token", data.jwt)
                this.props.postUser(data.user)
                this.props.history.push("/home")
            })
        

    }

    clickHandler = () => {
        this.props.history.push("/signup")
    }

    render () {
        return(      
            <div className="background-login">
                <div class="form-container">
                            <form onSubmit={this.loginHandler}>
                                <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.changeHandler} />
                                <input type="text" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler} />
                                <a class="login-btn" type="submit" value="Login">Login</a>
                            </form>
                       
                            <div onClick={this.clickHandler}class="switch">
                            <p>Don't have an account?</p>
                            </div>
                            </div>  
                </div>
         
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

