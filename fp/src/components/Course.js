import React from 'react'
import {NavLink} from 'react-router-dom'
import Business from './Business'
import User from './User'
import Comment from './Comment'
import { connect } from 'react-redux'
import { getUsercourses } from '../redux/actions'
import { addUC } from '../redux/actions'


class Course extends React.Component {



    state = {
        content: ''
    }
    changeHandler = (e) => {
        this.setState({content:e.target.value})
    }

   commentHandler = (e) => {
       e.preventDefault()
       let foundcourse_id = e.target.id
        this.props.commentCreater(this.state.content, foundcourse_id)
   } 

    // componentDidMount(){
    //     // this.props.fetchUsercourses()
    // }
    enroll = () => {
        fetch("http://localhost:3000/api/v1/user_courses", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 'accepts': 'application/json',
              },
            body: JSON.stringify({ usercourse: {
                user_id: this.props.loggedInUser.id,
                course_id: this.props.foundCourse.id,
                complete: false,
                name: this.props.foundCourse.name 
            }})
        })
        .then(response => response.json())
        .then(data => 
            {console.log(data) 
            this.props.patchUC(data)})
    }
    

    completeCourse = (e) => {
        // console.log(this.props.usercourse.id, this.props.loggedInUser, this.props.businesses)
        e.target.innerText = "Course Complete"
        let userCourseToComplete = this.props.usercourses.find(usercourse => usercourse.course_id == this.props.takencourse.id && usercourse.user_id == this.props.loggedInUser.id)
        fetch(`http://localhost:3000/api/v1/user_courses/${userCourseToComplete.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                 'accepts': 'application/json',
              },
            body: JSON.stringify({ usercourse: {
                complete: true
            }})
        })
        .then(response => response.json())
        // .then(data => this.props.fetchUsercourses())
        .then(data => {
            this.props.patchUC(data)
            this.props.newUserHandler()
        })

        // console.log(this.props.usercourses)
        // checks if completed course is in list of businesses courses
        // let checkCourses = this.props.businesses.map(business => business.courses.find(course => course.id == this.props.usercourse.id))
        // let verifiedCourse = checkCourses.find(checkcourse => checkcourse !== undefined)   
        // console.log(verifiedCourse)
    }

    // filterCourses = () => {
    //     let usercoursesArray = this.props.usercourses.filter(userCourse => userCourse.user_id == this.props.loggedInUser.id)
    //     console.log(usercoursesArray)
    //     let completedUserCoursesArray = usercoursesArray.filter(usercourse => usercourse.complete == true)
    //     console.log(completedUserCoursesArray)
    //     return completedUserCoursesArray
    // }
    render(){
        let courseBusinesses = []
        this.props.foundCourse ? courseBusinesses = this.props.foundCourse.businesses.map(business => <Business business={business} key={business.id}/>) : courseBusinesses = []
        let comments = []
        this.props.foundCourse ? comments = this.props.foundCourse.comments.map(comment => <Comment commentCreater={this.commentCreater} comment={comment} key={comment.id}/>) : comments = []
        let users = []
        this.props.foundCourse ? users = this.props.foundCourse.users.map(user => <User user={user} key={user.id}/>) : users = []
        return (
            this.props.takencourse ? 
                <div>
                <br></br>
                <h3>{this.props.takencourse.name}</h3>
                <img src={this.props.takencourse.image} alt={this.props.takencourse.name}width="150" height="150"></img>     
                <button onClick={this.completeCourse} > Course In Progress </button>
                 </div>
            
            :
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
            <h3>Type: {this.props.foundCourse.category}</h3>
            <p className='description'>{this.props.foundCourse.description}</p>
            <button onClick={this.enroll}> Enroll </button>
            <form id={this.props.foundCourse.id} onSubmit={this.commentHandler}>
                <fieldset id="commentFieldset">
                <div class="form_grp">
                <textarea id="userCmnt" placeholder="Write your comment here." name='content' value={this.state.content} onChange={this.changeHandler}></textarea>        
                </div>
                <div class="form_grp">
                <button type="submit">Add Comment</button>
                </div>
                </fieldset>
            </form>
            {comments}
            <h5>Businesses that use this course</h5>
            <ul>
            <li>{courseBusinesses}</li>  
            </ul>
            <h5>Users who have taken this course</h5>
            <ul>
            <li>{users}</li>  
            </ul>
            </div>
        )
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return { postUser: (userObj) => dispatch(userSignUp(userObj)) }
//   } 
const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUser,
        businesses: state.businesses, 
        usercourses: state.usercourses
    }
    }
const mapDispatchToProps = (dispatch) => {
    return { 
        fetchUsercourses: ()=> dispatch(getUsercourses()),
        patchUC: (ucObj) => dispatch(addUC(ucObj))
    }
        
    }     


export default connect(mapStateToProps, mapDispatchToProps)(Course);

