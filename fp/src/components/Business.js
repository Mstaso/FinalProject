import React from 'react'
import {NavLink} from 'react-router-dom'
import Course from './Course'

class Business extends React.Component {

    render(){
        let courses = []
        this.props.foundBusiness ?  courses = this.props.foundBusiness.courses.map(course => <Course course={course} />) :  courses = []
        return (
            this.props.business ? 
            <NavLink to={`/businesses/${this.props.business.id}`} >
            <div>
                <h1>{this.props.business.name}</h1>
                <img src={this.props.business.logo} width="150" height="150"/>
            </div>
            </NavLink>
            :
            <div>
                <h1>{this.props.foundBusiness.name}</h1>
                <img src={this.props.foundBusiness.logo} width="200" height="200"/>
                <h2> Industry: {this.props.foundBusiness.industry}</h2>
                <p>{this.props.foundBusiness.description}</p>
                <h3>Current Courses</h3>
                {courses}
            </div>
        )
    }
}

export default Business;