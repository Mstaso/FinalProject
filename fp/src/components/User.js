import React from 'react'
import {NavLink} from 'react-router-dom'
import Course from './Course'
import Business from './Business'
import { connect } from 'react-redux'
import { getUsercourses } from '../redux/actions'
import { getMatches } from '../redux/actions'
import { getUsers } from '../redux/actions'


class User extends React.Component {

    newUserHandler = () => {
        // this.props.fetchUsercourses()
        console.log(this.props.usercourses, "is new one added?")

        let completeUserCourses = this.props.usercourses.filter(usercourse => usercourse.complete == true)

        // let usercoursesArray = thisArray.filter(userCourse => userCourse.user_id == this.props.loggedInUser.id)
        // console.log(usercoursesArray)

        let usersCompletedUserCourses = completeUserCourses.filter(userCourse => userCourse.user_id == this.props.loggedInUser.id)
        
        // usercoursesArray.filter(usercourse => usercourse.complete == true)
        this.match(usersCompletedUserCourses)
        
     

    }

    // filterCourses = () => {
    //     let usercoursesArray = this.props.usercourses.filter(userCourse => userCourse.user_id == this.props.foundUser.id)
    //     let completedUserCoursesArray = usercoursesArray.filter(usercourse => usercourse.complete == true)
    //     let completedcourses = completedUserCoursesArray.map(completedUserCourse => <Course course={completedUserCourse.course} key={completedUserCourse.course.id}/>)
    //     return completedcourses
    // }

    match = (usersCompletedUserCourses) => {


        // completedUserCoursesArray.map(completedUserCourse => newCourseArray.push(completedUserCourse.course))
      

        let businessmatch = this.props.businesses.find(business => {
            return business.courses.find((course, index) => {
                if (course.id === usersCompletedUserCourses[0].course_id) {
                    return course;
                }
            })
        })
        if (businessmatch !== undefined) {
            console.log(businessmatch)
            this.createMatch(businessmatch)}
        
        // if (newCourseArray.length >= 1)
        // {let businessmatch = this.props.businesses.find(business => {
        //     return business.courses.find((course, index) => {
        //         if (course.id === newCourseArray[0].id) {
        //             return course;
        //         }
        //     })
        // })

        

        // if (newCourseArray.length >= 1){
        //     businessCourses.find(course, index) => {
        //         if (course.id === newCourseArray[0].id) {
        //             return course;
        //         }
        // }

        // if (newCourseArray.length >= 1)
        // {let businessmatch = this.props.businesses.find(business => {
        //     return business.courses.find((course, index) => {
        //         if (course.id === newCourseArray[0].id) {
        //             return course;
        //         }
        //     })
        // })

//Jeffys way
        // let found_course = completedUserCoursesArray.map(completedUserCourse => completedUserCourse.course)

        // console.log(found_course, "course to match")

        // let businessCourses = this.props.businesses.map(business => business.courses)
        // console.log(businessCourses)

        // let selected_course = businessCourses.find(course => course.id === found_course.id)
        // console.log(selected_course)

        // if (selected_course !== undefined){
        //     this.createMatch(selected_course)
        // }
//End Jeffys way

    //     let newCourseArray = []
    //    completedUserCoursesArray.map(completedUserCourse => newCourseArray.push(completedUserCourse.course))
    //    console.log(newCourseArray, "course to match")
    //     if (newCourseArray.length >= 1)
    //     {let businessmatch = this.props.businesses.find(business => {
    //         return business.courses.find((course, index) => {
    //             if (course.id === newCourseArray[0].id) {
    //                 return course;
    //             }
    //         })
    //     })
    //     if (businessmatch !== undefined) {
    //         console.log(businessmatch)
    //         this.createMatch(businessmatch)
    //     }
    // }
    }

    createMatch = (businessmatch) => {
        console.log(this.props.foundUser.businesses)
        if (this.props.foundUser.businesses.map(business => business.id !== businessmatch.id))
        {console.log(this.props.foundUser.id, "user ID from post fetch")
        fetch('http://localhost:3000/api/v1/matches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 'accepts': 'application/json',
              },
            body: JSON.stringify({ match: {
                user_id: this.props.foundUser.id,
                business_id: businessmatch.id,
                status: true
            }})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data, "from post fetch")
            this.props.fetchUsers()
        })
    }
    }

    render(){
        let courses = []
        this.props.foundUser ?  courses = this.props.foundUser.courses.map(course => <Course key={course.id} takencourse={course} newUserHandler={this.newUserHandler}/>) :  courses = []
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
            <h2>Courses</h2>
            {courses}
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