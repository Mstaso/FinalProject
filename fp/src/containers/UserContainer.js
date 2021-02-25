import React from 'react'
import { connect } from 'react-redux'
import { getUsers, userSignUp } from '../redux/actions'
import User from '../components/User'
import {Route, Switch, withRouter} from 'react-router-dom'



class UserContainer extends React.Component {

    
    componentDidMount(){
        this.props.fetchUsers()
    }

    otherUsers = (foundUser) => {
       let otherUsers = this.props.users.filter(user => user.id !== foundUser.id)
       let mappedOtherUsers = otherUsers.splice(0,5).map(user => <User user={user} key={user.id}/>)
       return mappedOtherUsers
    }
    render(){
        let users = this.props.users.map(user => <User key={user.id} user={user}/>);
        return (
            <>
            {this.props.users.length === 0 ? <h1>Loading</h1>: 
            
            <>
            <Switch>
                
                <Route path='/users/:id' render={({ match }) => {
                    let id = parseInt(match.params.id)
                    let foundUser = this.props.users.find((user)=> user.id === id)
                    console.log(foundUser)
                    let otherUsers = []
                    // handles case if foundUser is not defined, typically occurs directly after a user signs up.
                    foundUser === undefined ? this.props.loggedInUser ? foundUser = this.props.loggedInUser :
                    this.props.history.push("/login") : otherUsers = this.props.users.filter(user => user.id !== foundUser.id)
                    let mappedOtherUsers = otherUsers.splice(0,5).map(user => <User user={user} key={user.id}/>)

                    if(foundUser !== undefined) {
                        return (
                        <div>
                            <div class="other-elements">
                                <h4>Other Users</h4>
                        {mappedOtherUsers}   
                            </div>     
                        <User userCourseCompleter={this.userCourseCompleter} foundUser={foundUser} />
                        </div>

                    )
                    } 
                }}/>
                <Route path="/users" render={() => {

                    return (
                        <>
                            {
                                this.props.users.length === 0 ? <h1>Loading</h1> :
                                <>
                                {users}
                                </>
                            }
                        
                        
                        </>
                    )
                }} />
                <Route path="/home" render={() => {

                    return (
                        <div class="user-float">
                            <h3>User Connections</h3>
                            {
                                this.props.users.length === 0 ? <h1>Loading</h1> :
                                <>
                                {users}
                                </>
                            }
                        
                        
                        </div>
                    )
                }} />
            </Switch>       
            </>
            
            
            }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {users: state.users,
            loggedInUser: state.loggedInUser        
    }
    }
  const mapDispatchToProps = (dispatch) => {
    return { 
        fetchUsers: ()=> dispatch(getUsers()),
        postUser: (userObj) => dispatch(userSignUp(userObj))
    }
  } 
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserContainer));