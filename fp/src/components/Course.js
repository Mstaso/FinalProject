import React from 'react'
import {NavLink} from 'react-router-dom'
import Business from './Business'
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
        this.commentCreater(this.state.content)
   } 

    componentDidMount(){
        this.props.fetchUsercourses()
    }
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
                complete: false
            }})
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }

    commentCreater = (content) => {
        console.log(content)
        fetch('http://localhost:3000/api/v1/comments',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 'accepts': 'application/json',
              },
            body: JSON.stringify({ comment: {
                content: content,
                user_id: this.props.loggedInUser.id,
                course_id: this.props.foundCourse.id
            }})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
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
        // let businesses = []
        // this.props.foundCourse : courses = this.props.foundCourse.businesses.map(business => <B)
        let comments = []
        this.props.foundCourse ? comments = this.props.foundCourse.comments.map(comment => <Comment commentCreater={this.commentCreater} comment={comment} key={comment.id}/>) : comments = []
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
            <form id="cmnt" onSubmit={this.commentHandler}>
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

