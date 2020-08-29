import React from 'react'
import {NavLink} from 'react-router-dom'
import Course from './Course'


class User extends React.Component {

    render(){
        let courses = []
        this.props.foundUser ?  courses = this.props.foundUser.courses.map(course => <Course key={course.id} course={course} />) :  courses = []
        return (
            this.props.user ? 
            <NavLink to={`/users/${this.props.user.id}`}>
                <div>
                <br></br>
                <h3>{this.props.user.username}</h3>
                 </div>
            </NavLink> 
            
            :

            <div>
            <h1>{this.props.foundUser.username}</h1>
            <h2>Courses in Progress</h2>
            {courses}
            </div>
        )
    }
}

export default User;