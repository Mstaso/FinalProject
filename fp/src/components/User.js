import React from 'react'
import {NavLink} from 'react-router-dom'
import Business from './Business'
import UserCourse from './UserCourse'
import { connect } from 'react-redux'
import { getUsercourses } from '../redux/actions'
import { getUsers } from '../redux/actions'


class User extends React.Component {

    constructor () {
        super()
        this.state = {
          CourseProgressisHidden: true,
          CompletedCoursesisHiddin: true,
          businessMatchisHiddin: true
        }
      }

    courseProgressToggleHidden (e) {
        console.log("been clicked")
        this.setState({
            CompletedCoursesisHiddin: true,
            businessMatchisHiddin: true
        })
        this.setState({
            CourseProgressisHidden: !this.state.CourseProgressisHidden  
        })
    }
    
    completedCourseToggleHidden (e) {
        console.log("been clicked")
        this.setState({
            CourseProgressisHidden: true,
            businessMatchisHiddin: true
        })
        this.setState({
            CompletedCoursesisHiddin: !this.state.CompletedCoursesisHiddin  
        })
    }  

    businessMatchToggleHidden (e) {
        console.log("been clicked")
        this.setState({
            CourseProgressisHidden: true,
            CompletedCoursesisHiddin: true,
        })
        this.setState({
            businessMatchisHiddin: !this.state.businessMatchisHiddin  
        })
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
        console.log(this.props)
        // let userCourses = []
        // // this.props.foundUser ?  userCourses = this.props.foundUser.user_courses.map(usercourse => <UserCourse key={usercourse.id} takenUserCourse={usercourse} newUserHandler={this.newUserHandler}/>) :  userCourses = []
        // this.props.foundUser ? userCourses = this.props.foundUser.user_courses.map(usercourse => <UserCourse UserCourseInProgress={usercourse} key={usercourse.course_id}/>) : userCourses = []
        let businesses = []
        this.props.foundUser !== undefined ? businesses = this.props.foundUser.businesses.map(business => <Business business={business} key={business.id}/>) : businesses = [] 
        return (
            this.props.user ? 
            <NavLink to={`/users/${this.props.user.id}`}>
                <div>
                <br></br>
                <h3 class="userfloatname">{this.props.user.username}</h3>
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
        <div class="description-profile">  <a href={this.props.foundUser.email} title={this.props.foundUser.email}><strong>{this.props.foundUser.email}</strong></a> | {this.props.foundUser.description}</div>
                    <ul class="data-user">
                        <li name="CourseProgressisHidden" onClick={this.courseProgressToggleHidden.bind(this)}><a><strong>{this.coursesInProgressForUser().length}</strong><span>Courses in Progress</span></a></li>
                        <li name="CompletedCoursesisHiddin" onClick={this.completedCourseToggleHidden.bind(this)}><a><strong>{this.completedCoursesForUser().length}</strong><span>Completed Courses</span></a></li>
                        <li name="businessMatchisHiddin" onClick={this.businessMatchToggleHidden.bind(this)}><a><strong>{this.props.foundUser.businesses.length}</strong><span>Business Matches</span></a></li>
                    </ul>
                    {this.state.CourseProgressisHidden ? <h1></h1> : <div>
                    <h2>Courses in Progress</h2>
                    <br></br>
                    {this.coursesInProgressForUser()}
                    </div>   }
                    {this.state.CompletedCoursesisHiddin ? <h1></h1> : <div>
                        <h2>Completed Courses</h2>
                        <br></br>
                        {this.completedCoursesForUser()}
                    </div>   }
                    {this.state.businessMatchisHiddin ? <h1></h1> : <div>
                        <h2>Business Matches</h2>
                        <br></br>
                        {businesses}
                    </div>   }
                    </div>
                    </div >
                        
                {/* <footer>
                <h4>Design by <a href="https://twitter.com/jofpin" target="_blank" title="José Pino">@jofpin</a></h4>
            </footer> */}
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
        fetchUsers: ()=> dispatch(getUsers())
        }
    }
        
         


export default connect(mapStateToProps, mapDispatchToProps)(User);