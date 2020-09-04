import React from 'react'
import {NavLink} from 'react-router-dom'
import Course from './Course'
import { connect } from 'react-redux'
import { getUsercourses } from '../redux/actions'
import { getUsers } from '../redux/actions'

class Business extends React.Component {

    matcher = () => {
        let LoggedinUserCompletedUCs = this.props.usercourses.filter(usercourse => usercourse.user_id == this.props.loggedInUser.id && usercourse.complete == true)
        console.log(LoggedinUserCompletedUCs)
        let businessCourseIds = []
        this.props.foundBusiness.courses.map(course => businessCourseIds.push(course.id))
        console.log(businessCourseIds)
        let matchedCourses = LoggedinUserCompletedUCs.filter(usercourse => businessCourseIds.includes(usercourse.course_id))
        console.log(matchedCourses)
        let percentageMatch = matchedCourses.length / businessCourseIds.length
        console.log(parseFloat(percentageMatch * 100)+"%")
        if (percentageMatch !== 0){
            this.createMatch(percentageMatch)
        }

    }
    createMatch = (percentageMatch) => {
            fetch('http://localhost:3000/api/v1/matches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 'accepts': 'application/json',
              },
            body: JSON.stringify({ match: {
                user_id: this.props.loggedInUser.id,
                business_id: this.props.foundBusiness.id,
                status: true
            }})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // this.props.fetchUsers()
        })
         
        
         
    }

    render(){
        let courses = []
        this.props.foundBusiness ?  courses = this.props.foundBusiness.courses.map(course => <Course course={course} key={course.id} />) :  courses = []
        return (
            this.props.business ? 
            <NavLink to={`/businesses/${this.props.business.id}`} >
            <div>
                <h3>{this.props.business.name}</h3>
                <img src={this.props.business.logo} alt={this.props.business.name} width="150" height="150"/>
            </div>
            </NavLink>
            :
            <div>
                <h1>{this.props.foundBusiness.name}</h1>
                <img src={this.props.foundBusiness.logo} alt={this.props.foundBusiness.name} width="200" height="200"/>
                <h2> Industry: {this.props.foundBusiness.industry}</h2>
                <p className='description'>{this.props.foundBusiness.description}</p>
        <button onClick={this.matcher}>Match with {this.props.foundBusiness.name}</button>
                <h3>Current Courses</h3>
                {courses}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUser,
        businesses: state.businesses,
        courses: state.courses, 
        usercourses: state.usercourses,
        users: state.users
    }
    }
const mapDispatchToProps = (dispatch) => {
    return { 
        fetchUsercourses: ()=> dispatch(getUsercourses()),
        fetchUsers: ()=> dispatch(getUsers())
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(Business);