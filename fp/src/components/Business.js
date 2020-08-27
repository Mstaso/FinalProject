import React from 'react'
import {NavLink} from 'react-router-dom'

class Business extends React.Component {

    render(){
        return (
            <NavLink to={`/businesses/${this.props.business.id}`} >
            <div>
                <h1>{this.props.business.name}</h1>
                <img src={this.props.business.logo} width="150" height="150"/>
            </div>
            </NavLink>
        )
    }
}

export default Business;