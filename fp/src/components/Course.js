import React from 'react'
import {NavLink} from 'react-router-dom'
import Business from './Business'

class Course extends React.Component {

    render(){
        console.log(this.props)
        return (
            this.props.course ? 
            <NavLink to={`/courses/${this.props.course.id}`}>
                <div>
                <br></br>
                <h3>{this.props.course.name}</h3>
                <img src={this.props.course.image} alt={this.props.course.name}width="150" height="150"></img>
                 </div>
            </NavLink> 
            
            :

            <div>
            <h1>{this.props.foundCourse.name}</h1>
            <img src={this.props.foundCourse.image} alt={this.props.foundCourse.name} width="300" height="300"></img>
            <h3>Category: {this.props.foundCourse.category}</h3>
            </div>
        )
    }
}

export default Course;