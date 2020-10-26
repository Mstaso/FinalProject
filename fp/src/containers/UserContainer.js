import React from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../redux/actions'
import User from '../components/User'
import {Route, Switch} from 'react-router-dom'



class UserContainer extends React.Component {

    
    componentDidMount(){
        this.props.fetchUsers()
    }

    userCourseCompleter = () => {
        console.log("in userCourseCompleter")
        this.props.fetchUsers()
    }

    otherUsers = (foundUser) => {
       let otherUsers = this.props.users.filter(user => user.id !== foundUser.id)
       let mappedOtherUsers = otherUsers.splice(0,5).map(user => <User user={user} key={user.id}/>)
       return mappedOtherUsers
    }
    render(){
        let users = this.props.users.map(user => <User key={user.id} user={user}/>)
    
        return (
            <>
            {this.props.users.length === 0 ? <h1>Loading</h1>: 
            
            <>
            <Switch>
                <Route path='/users/:id' render={({ match }) => {
                    let id = parseInt(match.params.id)
                    console.log(id)
                    let foundUser = this.props.users.find((user)=> user.id === id)
                    console.log(foundUser)
                    return (
                        <div>
                        <div class="other-users">
                        <h3>Other Users</h3>
                        {this.otherUsers(foundUser)}
                        </div>
                        <div class="main-user">
                        <User userCourseCompleter={this.userCourseCompleter} foundUser={foundUser} />
                        </div>
                        </div>

                    )
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
    return {users: state.users}
    }
  const mapDispatchToProps = (dispatch) => {
    return { fetchUsers: ()=> dispatch(getUsers())}
  } 
  
  export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);