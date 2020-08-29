import React from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../redux/actions'
import User from '../components/User'
import {Route, Switch} from 'react-router-dom'


class UserContainer extends React.Component {

    componentDidMount(){
        this.props.fetchUsers()
    }

    render(){
        console.log(this.props)
        let users = this.props.users.map(user => <User key={user.id} user={user}/>)
        
        return (
            <>
            {this.props.users.length === 0 ? <h1>Loading</h1>: 
            
            <>
            <Switch>
                <Route path='/users/:id' render={({ match }) => {
                    let id = parseInt(match.params.id)
                    let foundUser = this.props.users.find((user)=> user.id === id)
                    return <User foundUser={foundUser} />
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