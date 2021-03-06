import React from 'react'
import {NavLink} from 'react-router-dom'
import Business from './Business'
import Course from './Course'
import { connect } from 'react-redux'
import { getUsercourses } from '../redux/actions'
import { getUsers } from '../redux/actions'
import { userCoursePatcher } from '../redux/actions'


class User extends React.Component {

    constructor () {
        super()
        this.state = {
          CourseProgressisHidden: false,
          CompletedCoursesisHiddin: true,
          businessMatchisHiddin: true,
        }
      }

    courseProgressToggleHidden () {
        this.setState({
            CompletedCoursesisHiddin: true,
            businessMatchisHiddin: true
        })
        this.setState({
            CourseProgressisHidden: !this.state.CourseProgressisHidden  
        })
    }
    
    completedCourseToggleHidden () {
        this.setState({
            CourseProgressisHidden: true,
            businessMatchisHiddin: true
        })
        this.setState({
            CompletedCoursesisHiddin: !this.state.CompletedCoursesisHiddin  
        })
    }  

    businessMatchToggleHidden () {
        this.setState({
            CourseProgressisHidden: true,
            CompletedCoursesisHiddin: true,
        })
        this.setState({
            businessMatchisHiddin: !this.state.businessMatchisHiddin  
        })
    }  

    userCourseCompleter = (id) => {
        let userCourseToComplete = this.props.foundUser.user_courses.find(usercourse => usercourse.course_id === id)
        this.props.userCoursePatcher(userCourseToComplete.id)
        userCourseToComplete.complete = true
        console.log(userCourseToComplete)
        this.props.loggedInUser.user_courses.push(userCourseToComplete)
        
    }

    render(){
        let userCoursesInProgress = [];
        let completeduserCourses = [];
        if(this.props.foundUser) { 
            for (let course of this.props.foundUser.courses){
                for(let usercourse of this.props.foundUser.user_courses){
                    if (!usercourse.complete && course.id === usercourse.course_id){
                        userCoursesInProgress.push(course)
                    } else if (usercourse.complete && course.id === usercourse.course_id) {
                        completeduserCourses.push(course)
                    }   
                }
            }
        }
      
        return (
            this.props.user ? 
            <NavLink to={`/users/${this.props.user.id}`}>
                <div>
                <br></br>
                <br></br>
                <h3 class="userfloatname">{this.props.user.username}</h3>
                <img class="profsmall" src={this.props.user.profile_image} alt={this.props.user.username} style={{height: "50px", width: "50px"}}/>
                <br></br>
                <br></br>
                 </div>
            </NavLink> 
            
            :
            <div>
                <div class="content-profile-page">
                <div class="profile-user-page card">
                    <div class="img-user-profile">
                        <img class="profile-bgHome" src={this.props.foundUser.cover_photo} />
                        <img class="avatar" src={this.props.foundUser.profile_image} alt={this.props.foundUser.username}/>
                        </div>
                        
                        <div class="user-profile-data">
                            <h1>{this.props.foundUser.username}</h1>
                            <p>{this.props.foundUser.github}</p>
               
                        </div> 
                        <br></br>
                        <br></br>
                        <br></br>
                    <div class="description-profile">  <a href={this.props.foundUser.email} title={this.props.foundUser.email}><strong>{this.props.foundUser.email}</strong></a> | {this.props.foundUser.description}</div>
                        <br></br>
                        <br></br>
                        <br></br>    
                        <br></br>
                        <br></br>
                        <br></br> 
                        <br></br>
                        <br></br>
                        <br></br> 
                    <ul class="data-user">
                        <li name="CourseProgressisHidden" onClick={this.courseProgressToggleHidden.bind(this)}><a><strong>{userCoursesInProgress.length}</strong><span>Courses in Progress</span></a></li>
                        <li name="CompletedCoursesisHiddin" onClick={this.completedCourseToggleHidden.bind(this)}><a><strong>{completeduserCourses.length}</strong><span>Completed Courses</span></a></li>
                        <li name="businessMatchisHiddin" onClick={this.businessMatchToggleHidden.bind(this)}><a><strong>{this.props.foundUser.businesses.length}</strong><span>Business Matches</span></a></li>
                    </ul>
                    {this.state.CourseProgressisHidden ? <h1></h1> : <div>
                    <h2>Courses in Progress</h2>
                    <br></br>
                    {userCoursesInProgress.map(course => <Course userCourseCompleter={this.userCourseCompleter} key={course.id} course={course} />)}
                    </div>   }
                    {this.state.CompletedCoursesisHiddin ? <h1></h1> : <div>
                        <h2>Completed Courses</h2>
                        <br></br>
                        {completeduserCourses.map(course => <Course course={course} key={course.id}/>)}
                    </div>   }
                    {this.state.businessMatchisHiddin ? <h1></h1> : <div>
                        <h2>Business Matches</h2>
                        <br></br>
                        {this.props.foundUser.businesses.map(business => <Business business={business} key={business.id}/>)}
                    </div>   }
                    </div>
                    </div >
                        
            <div/>
            
            <div/>
            
           
            </div>
  
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUser,
        usercourses: state.usercourses,
        users: state.users
    }
    }
const mapDispatchToProps = (dispatch) => {
    return { 
        fetchUsercourses: ()=> dispatch(getUsercourses()),
        fetchUsers: ()=> dispatch(getUsers()),
        userCoursePatcher: (ucId) => dispatch(userCoursePatcher(ucId))
        }
    }
        
         


export default connect(mapStateToProps, mapDispatchToProps)(User);