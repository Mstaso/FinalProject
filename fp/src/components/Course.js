import React from 'react'
import {NavLink} from 'react-router-dom'

class Course extends React.Component {

    clickHandler = () => {
        this.props.appClickHandler(this.props.course)
    }
    render(){
        return (
            this.props.course ? 
            <NavLink to={`/courses/${this.props.course.id}`}>
                <div onClick={this.clickHandler}>
                <br></br>
                <h3>{this.props.course.name}</h3>
                <img src={this.props.course.image} width="150" height="150"></img>
                 </div>
            </NavLink> 
            :
            <div>
            <h1>{this.props.foundCourse.name}</h1>
            <img src={this.props.foundCourse.image} width="300" height="300"></img>
            <h3>Category: {this.props.foundCourse.category}</h3>
            </div>
        )
    }
}

export default Course;