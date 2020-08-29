import React from 'react'
import { connect } from 'react-redux'
import { userSignUp } from '../redux/actions'

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
    }

    render(){
        return(
            <form onSubmit={this.submitHandler}>
                <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.changeHandler} />
                <input type="text" name="password_digest" placeholder="Password" value={this.state.password_digest} onChange={this.changeHandler} />
                <input type="submit" value="Sign Up" />
            </form>
        )
    }
}

//   const mapDispatchToProps = (dispatch) => {
//     return { postUser: (userObj) => dispatch(userSignUp(userObj)) }
//   } 
  
  export default connect(null, null)(SignUp);