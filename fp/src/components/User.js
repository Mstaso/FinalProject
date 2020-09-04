import React from 'react'
import {NavLink} from 'react-router-dom'
import Business from './Business'
import UserCourse from './UserCourse'
import { connect } from 'react-redux'
import { getUsercourses } from '../redux/actions'
import { getUsers } from '../redux/actions'


class User extends React.Component {

    newUserHandler = () => {
        let usersCompletedUserCourses = this.props.usercourses.filter(usercourse => usercourse.complete == true && usercourse.user_id == this.props.loggedInUser.id)
        this.match(usersCompletedUserCourses)
    }

    // test/reconfigure Match
    match = (usersCompletedUserCourses) => {
        console.log(usersCompletedUserCourses, "from match")
       
       let courseToFind = this.props.courses.filter(course =>{ 
           return usersCompletedUserCourses.filter((usercourse) => {
               if (usercourse.course_id == course.id) {
                   this.findBusinessIdsthroughcourse(course)
               }
           })
        })

        // console.log(courseToFind)


        // let businessmatch = this.props.businesses.find(business => {
        //             return business.courses.find((course, index) => {
        //                 if (course.id === usersCompletedUserCourses[0].course_id) {
        //                     return course;
        //                 }
        //             })
        //         })
        //         if (businessmatch !== undefined) {
        //             // console.log(businessmatch)
        //             this.createMatch(businessmatch)}

        // let businessmatch = this.props.businesses.find(business => {
        //     return business.courses.find((course, index) => {
        //         if (usersCompletedUserCourses.filter(userCourse => userCourse.course_id === course.id)) {
        //             // console.log(course)
        //             return course;
        //         }
        //     })
        // })
        // if (businessmatch !== undefined) {
        //     console.log(businessmatch)
        //     this.createMatch(businessmatch)}
    }

    // unchanged Match
    // match = (usersCompletedUserCourses) => {
    //     console.log(this.props, "from match")
    //     let businessmatch = this.props.businesses.find(business => {
    //         return business.courses.find((course, index) => {
    //             if (course.id === usersCompletedUserCourses[0].course_id) {
    //                 return course;
    //             }
    //         })
    //     })
    //     if (businessmatch !== undefined) {
    //         // console.log(businessmatch)
    //         this.createMatch(businessmatch)}
    // }

    findBusinessIdsthroughcourse = (course) => {
        course.businesses.map(business => this.createMatch(business.id))
    }
    createMatch = (business_id) => {
        if (this.props.foundUser.businesses.find(business => business.id == business_id)){
            console.log("match already created")
        } else {
            fetch('http://localhost:3000/api/v1/matches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 'accepts': 'application/json',
              },
            body: JSON.stringify({ match: {
                user_id: this.props.foundUser.id,
                business_id: business_id,
                status: true
            }})
        })
        .then(response => response.json())
        .then(data => {
            this.props.fetchUsers()
        })
         }
        
         
    }

    coursesInProgressForUser = () => {
        let userCoursesInProgress = this.props.foundUser.user_courses.filter(usercourse => usercourse.complete == false)
        return userCoursesInProgress.map(usercourse => <UserCourse usercourse={usercourse} userCourseCompleter={this.props.userCourseCompleter} key={usercourse.id}/>) 
    }

    completedCoursesForUser = () => {
        let completeduserCourses = this.props.foundUser.user_courses.filter(usercourse => usercourse.complete == true)
        return completeduserCourses.map(usercourse => <UserCourse usercourse={usercourse} key={usercourse.id}/>)
    }

    render(){
        // let userCourses = []
        // // this.props.foundUser ?  userCourses = this.props.foundUser.user_courses.map(usercourse => <UserCourse key={usercourse.id} takenUserCourse={usercourse} newUserHandler={this.newUserHandler}/>) :  userCourses = []
        // this.props.foundUser ? userCourses = this.props.foundUser.user_courses.map(usercourse => <UserCourse UserCourseInProgress={usercourse} key={usercourse.course_id}/>) : userCourses = []
        let businesses = []
        this.props.user ? businesses = [] : businesses = this.props.foundUser.businesses.map(business => <Business business={business} key={business.id}/>)
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
            {this.coursesInProgressForUser()}
            <h2>Completed Courses</h2>
            {this.completedCoursesForUser()}
            <h2>Matches</h2>
            {businesses}
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
        
         


export default connect(mapStateToProps, mapDispatchToProps)(User);