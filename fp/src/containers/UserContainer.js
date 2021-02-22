import React from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../redux/actions'
import User from '../components/User'
import {Route, Switch} from 'react-router-dom'



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
                    let otherUsers = this.props.users.filter(user => user.id !== foundUser.id)
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
                    } else {
                        fetch(`http://localhost:3000/api/v1/users${id}`)
                        .then(resp => resp.json())
                        .then(data => { 
                            return (
                                <div>
                                    <div class="other-elements">
                                        <h4>Other Users</h4>
                                {mappedOtherUsers}   
                                    </div>     
                                <User userCourseCompleter={this.userCourseCompleter} foundUser={data} />
                                </div>
        
                            )
                         })
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
    return {users: state.users}
    }
  const mapDispatchToProps = (dispatch) => {
    return { fetchUsers: ()=> dispatch(getUsers())}
  } 
  
  export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);