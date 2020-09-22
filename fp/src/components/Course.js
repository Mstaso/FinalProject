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
          content: ''
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

    changeHandler = (e) => {
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
        this.setState({content: ''})
   } 

    // componentDidMount(){
    //     // this.props.fetchUsercourses()
    // }
    enroll = () => {
        console.log(this.props)
        let ucObj = {
            user_id: this.props.loggedInUser.id,
            course_id: this.props.foundCourse.id,
            complete: false,
            name: this.props.foundCourse.name 
        }
        this.props.handleUserCourse(ucObj)
            
    }
    

    completeCourse = (e) => {
        let userCourseToComplete = this.props.usercourses.find(usercourse => usercourse.course_id == this.props.takencourse.id && usercourse.user_id == this.props.loggedInUser.id)
        this.props.userCoursePatcher(userCourseToComplete.id)
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
                <div class="user-course">
                <br></br>
                <h3>{this.props.takencourse.name}</h3>
                <img src={this.props.takencourse.image} alt={this.props.takencourse.name}width="150" height="150"></img>     
                <button onClick={this.completeCourse} > Course in Progress </button>
                 </div>
            
            :
            this.props.course ? 
            <NavLink to={`/courses/${this.props.course.id}`}>
                <div class="course-index">
                    
                        <img class="course-cover" src={this.props.course.cover_photo}  />
                        <img class="course-image" src={this.props.course.image} />  

                            <h3>{this.props.course.name}</h3>
                          
                        {/* <h2>{this.props.course.subcategory}</h2>     */}
                        <p> Category: {this.props.course.category}</p>
                        <p> Sub:{this.props.course.subcategory}</p>
                        
                        
                     <hr></hr>
                </div> 
            </NavLink> 
            
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
                        <br></br>
                        <button onClick={this.enroll}>Enroll</button>
                            <h1>{this.props.foundCourse.name}</h1>
                            <br></br>
                        </div> 
                        
        <div class="description-profile"> <p>{this.props.foundCourse.description}</p></div>
        <br></br>
                    <ul class="data-user">
                        <li onClick={this.businessToggleHidden.bind(this)}><a><strong>{this.props.foundCourse.businesses.length}</strong><span>Businesses</span></a></li>
                        <li onClick={this.userToggleHidden.bind(this)}><a><strong>{this.props.foundCourse.users.length}</strong><span>Users</span></a></li>
                        <li onClick={this.commentToggleHidden.bind(this)}><a><strong>{this.props.foundCourse.comments.length}</strong><span>Comments</span></a></li>
                    </ul>
                    {this.state.businessisHiddin ? <h1></h1> : <div class="description-profile"> 
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
                            <textarea id="userCmnt" placeholder="Write your comment here." name='content' value={this.state.content} onChange={this.changeHandler}></textarea>        
                            </div>
                            <div class="form_grp">
                            <button type="submit">Add Comment</button>
                            </div>
                            </fieldset>
                        </form>
                        <div class="description-profile">
                        {comments}
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

