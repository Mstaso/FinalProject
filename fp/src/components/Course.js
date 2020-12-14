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
            <div class="other-course">
                <img src={this.props.otherCourse.image}></img>
                <h4>{this.props.otherCourse.name}</h4>
            </div>
            </NavLink>
        
            
            :
            this.props.course ? 
            
                <div class="course-index">
                        <NavLink to={`/courses/${this.props.course.id}`}>
                        <img class="course-cover" src={this.props.course.cover_photo}  />
                        <img class="course-image" src={this.props.course.image} />  

                            <h3>{this.props.course.name}</h3>
                          
                        
                        <p> {this.props.course.category} | {this.props.course.subcategory} | {this.props.course.workload} </p>
                            
                        </NavLink> 
                        {this.props.userCourseCompleter ?
                        <button onClick={this.completeCourse} class="view-course"> Complete Course </button>
                        :
                        <NavLink to={`/courses/${this.props.course.id}`}>
                        <button class="view-course"> View Course </button>
                        </NavLink> 
                        }
                        
                     <hr></hr>
                </div> 
           
            
            :
            <div>
                <div class="content-profile-page">
                <div class="profile-user-page card">
                    <div class="img-user-profile">
                        <img class="profile-bgHome" src={this.props.foundCourse.cover_photo} />
                        <img class="avatar" src={this.props.foundCourse.image} alt={this.props.foundCourse.image}/>
                        </div>
                        <div class="user-profile-data">
                            <br></br>
                            <br></br>
                            <br></br>
                            <h1>{this.props.foundCourse.name}</h1>
                            <p>{this.props.foundCourse.category}</p>                           
                            <button onClick={this.enroll}>Enroll</button>
                        </div> 
                        
                    <div class="description-profile"> 
                    <br></br>
                    <p>{this.props.foundCourse.description}</p>
                    </div>
                    <br></br>
                    <ul class="data-user">
                        <li onClick={this.businessToggleHidden.bind(this)}><a><strong>{this.props.foundCourse.businesses.length}</strong><span>Businesses</span></a></li>
                        <li onClick={this.userToggleHidden.bind(this)}><a><strong>{this.props.foundCourse.users.length}</strong><span>Users</span></a></li>
                        <li onClick={this.commentToggleHidden.bind(this)}><a><strong>{this.props.foundCourse.comments.length}</strong><span>Comments</span></a></li>
                    </ul>
                    {this.state.businessisHiddin ? <h1></h1> : 
                    <div > 
                        <h2>Businesses</h2>
                        {courseBusinesses}
                    </div> }
                    {this.state.userisHidden ? <h1></h1> : <div> 
                        <h2>Users</h2>
                        {users}
                        </div>}
                    {this.state.commentisHiddin ? <h1></h1> : <div > 
                        <form id={this.props.foundCourse.id} onSubmit={this.commentHandler}>
                            <fieldset id="commentFieldset">
                            <div class="form_grp">
                            <textarea id="userCmnt"placeholder="Write your comment here." name='content' value={this.state.content} onChange={this.commentChangeHandler}></textarea>        
                            </div>
                            <div class="form_grp">
                            <button type="submit" id="comment-button">Add Comment</button>
                            </div>
                            </fieldset>
                        </form>
                        <div>
                        {this.renderComments()}
                        </div>
                        </div>}            
                    </div>
                    </div>
                        
            <div/>    
            <div/>
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

