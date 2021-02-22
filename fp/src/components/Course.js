import React from 'react'
import {NavLink} from 'react-router-dom'
import Business from './Business'
import User from './User'
import Comment from './Comment'
import { connect } from 'react-redux'
import { getUsercourses } from '../redux/actions'
import { createUserCourse } from '../redux/actions'
import { addUC } from '../redux/actions'
import { userSignUp } from '../redux/actions'
import { postComment } from '../redux/actions'
import { userCoursePatcher } from '../redux/actions'



class Course extends React.Component {

    constructor () {
        super()
        this.state = {
          businessisHiddin: true,
          userisHidden: true,
          commentisHiddin: true,
          content: '',
          users: []
        }
      }

    businessToggleHidden (e) {
        this.setState({
            userisHidden: true,
            commentisHiddin: true
        })
        this.setState({
            businessisHiddin: !this.state.businessisHiddin  
        })
    }
    userToggleHidden (e) {
        this.setState({
            businessisHiddin: true,
            commentisHiddin: true
        })
        this.setState({
            userisHidden: !this.state.userisHidden  
        })
    }
    commentToggleHidden (e) {
        this.setState({
            businessisHiddin: true,
            userisHidden: true
        })
        this.setState({
            commentisHiddin: !this.state.commentisHiddin  
        })
    }

    commentChangeHandler = (e) => {
        this.setState({content:e.target.value})
    }

   commentHandler = (e) => {
       e.preventDefault()
       let commentObj = {
        content: this.state.content,
        user_id: this.props.loggedInUser.id,
        course_id: this.props.foundCourse.id
       }
        this.props.commentCreater(commentObj)
        this.renderComments(commentObj)
   } 

   renderComments = (commentObj) => {
       if (commentObj){
        this.props.foundCourse.comments.push(commentObj)
        this.setState({content: ''})
       }
       let comments = this.props.foundCourse.comments.map(comment => <Comment commentCreater={this.commentCreater} comment={comment} key={comment.id}/>)
       return comments
   }

    enroll = () => {
        console.log(this.props.loggedInUser.id)
        let ucObj = {
            user_id: this.props.loggedInUser.id,
            course_id: this.props.foundCourse.id,
            complete: false,
            name: this.props.foundCourse.name 
        }
        this.props.handleUserCourse(ucObj)
        this.users(this.props.loggedInUser)    
    }
    

    completeCourse = (e) => {
        this.props.userCourseCompleter(this.props.course.id)
    }


    // responsible for displaying users enrolled in the course
    users = (newUser) => {
        let users = this.props.foundCourse.users
        if (newUser){
            users.push(newUser)
        }
      let usersToDisplay = users.map(user => <User user={user} key={user.id}/>)
        this.setState({
            users: usersToDisplay,
            businessisHiddin: true,
            commentisHiddin: true
        })
        this.setState({ userisHidden: false})
    }

    render(){
        let courseBusinesses = []
        this.props.foundCourse ? courseBusinesses = this.props.foundCourse.businesses.map(business => <Business business={business} key={business.id}/>) : courseBusinesses = []
        let users = []
        this.props.foundCourse ? users = this.props.foundCourse.users.map(user => <User user={user} key={user.id}/>) : users = []
        return (
            this.props.otherCourse ?
            <NavLink to={`/courses/${this.props.otherCourse.id}`}>
            <div class="row index-info-course">
                <img class="col" id="profsmall" src={this.props.otherCourse.image}></img>
                <div class="col">
                <h5>{this.props.otherCourse.name}</h5>
                </div>
            </div>
            </NavLink>
        
            
            :
            this.props.course ? 
            
                <div class="row course-index">
                        <NavLink to={`/courses/${this.props.course.id}`}>
                            <div class="course-image-holder">
                        <img class="course-cover" src={this.props.course.cover_photo}  />
                        <img class="course-image" src={this.props.course.image} />  
                        </div>
                        <div class="course-info">
                        <h5>{this.props.course.name}</h5>
                        <p> {this.props.course.category} | {this.props.course.subcategory} | {this.props.course.workload} </p>
                        </div>  
                        </NavLink> 
                        {this.props.userCourseCompleter ?
                        <div class="course-btn-holder">
                        <button onClick={this.completeCourse} class="btn btn-full"> Complete </button>
                        </div>
                        :
                        <div></div>
                        }
                        
                     <hr></hr>
                </div> 
           
            
            :
            <div>
                <div class="image-container">
                <img class="cover-photo" src={this.props.foundCourse.cover_photo} />
                <img class="avatar" src={this.props.foundCourse.image} alt={this.props.foundCourse.name}/>

                        <div class="quick-info">
                            <h3>{this.props.foundCourse.name}</h3>
                            <p>{this.props.foundCourse.category}</p>
                            {/* <p>{this.props.foundUser.github}</p>       */}
                        </div> 
                        {/* good space for a button */}
                        <button class="btn-small btn-full" onClick={this.enroll}>Enroll</button>
                </div>
                <div class="about-description">
                    <h4>Description</h4>
                <p>
                {this.props.foundCourse.description}
                </p>
                </div>
                <div class="main-info-container">
                <ul class="row toggle-text">
                        <li class="col span-1-of-3" onClick={this.businessToggleHidden.bind(this)}><a>{this.props.foundCourse.businesses.length} Businesses Using This Course</a></li>
                        <li class="col span-1-of-3" onClick={this.userToggleHidden.bind(this)}><a>{this.props.foundCourse.users.length} Users enrolled </a></li>
                        <li class="col span-1-of-3" onClick={this.commentToggleHidden.bind(this)}><a>{this.props.foundCourse.comments.length} Comments</a></li>
                    </ul>
                    {this.state.businessisHiddin ? <h1></h1> : 
                    <div class="row bump"> 
                        {courseBusinesses}
                    </div> }
                    {this.state.userisHidden ? <h1></h1> : <div> 
                        {users}
                        </div>}
                    {this.state.commentisHiddin ? <h1></h1> : <div > 
                        <form class="comment-form" id={this.props.foundCourse.id} onSubmit={this.commentHandler}>
                    
                            <div class="form_grp">
                            <textarea class="comment-box" id="userCmnt" name='content' value={this.state.content} onChange={this.commentChangeHandler}></textarea>        
                            </div>
                            <div class="form_grp">
                            <button type="submit" class="comment-btn btn-full">Add Comment</button>
                            </div>
                       
                        </form>
                        <hr></hr>
                        <div>
                        {this.renderComments()}
                        </div>
                        </div>} 
                    <div class="rounder"></div>
                </div>  
            </div>
        )
    }
}

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
        patchUC: (ucObj) => dispatch(addUC(ucObj)),
        postUser: (userObj) => dispatch(userSignUp(userObj)),
        handleUserCourse: (ucObj) => dispatch(createUserCourse(ucObj)),
        commentCreater: (commentObj) => dispatch(postComment(commentObj)),
        userCoursePatcher: (ucId) => dispatch(userCoursePatcher(ucId))
    }
        
    }     


export default connect(mapStateToProps, mapDispatchToProps)(Course);

