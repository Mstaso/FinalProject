import React from 'react'
import { connect } from 'react-redux'
import { userSignUp } from '../redux/actions'
import { getUsers } from '../redux/actions'
import { withRouter } from 'react-router-dom'

class SignUp extends React.Component{
    state = {
        username: "",
        password: ""
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
        // let request = {"auth": {"username": userObj.username, "password_digest": userObj.password_digest}}

        const url = "http://localhost:3000/api/v1/users"
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 'accepts': 'application/json',
              },
            body: JSON.stringify({user: {
                username: this.state.username,
                password: this.state.password,
                cover_photo: "https://template.canva.com/EAD7TazGins/1/0/800w-gB1EEHnz0j8.jpg",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                profile_image: "https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
            }})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.props.postUser(data.user)
            localStorage.setItem("token", data.jwt)
            this.props.fetchUsers()
            this.props.history.push("/home")
        }
            
            // {this.props.postUser(data)}, 
            //     this.props.history.push("/home")
        )
    }

    // fetchRequest = (userObj) => {
    //     console.log(userObj)
    //     const url = "http://localhost:3000/api/v1/users"
    //     fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //              'accepts': 'application/json',
    //           },
    //         body: JSON.stringify({ user: userObj})
    //     })
    //     .then(response => response.json())
    //     .then(data => {this.props.postUser(data)}, 
    //             this.props.history.push("/home")
    //     )
    // }
   clickHandler = () => {
    this.props.history.push("/login")
   }

    render(){
        return(
<body className="background-login">
<div onClick={this.clickHandler}class="switch">
                    <p>Already have an account?</p>
                </div>
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
            <input type="text" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler} />
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
    return { postUser: (userObj) => dispatch(userSignUp(userObj)),
             fetchUsers: ()=> dispatch(getUsers)}
  } 
  
  export default withRouter(connect(null, mapDispatchToProps)(SignUp));
