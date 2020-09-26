import React from 'react'
import { connect } from 'react-redux'
import { userSignUp } from '../redux/actions'
import { withRouter } from 'react-router-dom'

class SignUp extends React.Component{
    state = {
        username: "",
        password_digest: ""
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()
        //double check 
        // this.props.postUser(this.state)
        this.fetchRequest(this.state)
    }

    fetchRequest = (userObj) => {
        console.log(userObj)
        const url = "http://localhost:3000/api/v1/users"
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 'accepts': 'application/json',
              },
            body: JSON.stringify({ user: userObj})
        })
        .then(response => response.json())
        .then(data => {this.props.postUser(data)}, 
                this.props.history.push("/home")
        )
    }
   

    render(){
        return(
<body className="background-login">
                
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
        <br></br>
        <br></br>
        <h1 style={{ color: 'white' }}class="title">Course Matcher</h1>
        <br></br>
        <br></br>
        <form onSubmit={this.submitHandler}>
            <div class="information-container">
            <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.changeHandler} />
            </div>
            <br></br>
            <br></br>
            <div class="information-container"> 
            <input type="text" name="password_digest" placeholder="Password" value={this.state.password_digest} onChange={this.changeHandler} />
            </div>
            <br></br>
            <br></br>
            <input class="loginButton" type="submit" value="Sign Up"/>
        </form>
    </div>
</body>
        )
    }
}

  const mapDispatchToProps = (dispatch) => {
    return { postUser: (userObj) => dispatch(userSignUp(userObj)) }
  } 
  
  export default withRouter(connect(null, mapDispatchToProps)(SignUp));
