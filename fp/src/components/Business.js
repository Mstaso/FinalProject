import React from 'react'
import {NavLink} from 'react-router-dom'
import Course from './Course'
import User from './User'
import { connect } from 'react-redux'
import { getUsercourses } from '../redux/actions'
import { matchPost } from '../redux/actions'

class Business extends React.Component {

    constructor () {
        super()
        this.state = {
          courseisHidden: false,
          matchisHiddin: true,
          jobisHiddin: true
        }
      }

    componentDidMount() {
        this.props.fetchUsercourses()
        // try and have loggedinuser initialized with usercourses so you dont have to fetch in cdm.
    }  
    
    courseToggleHidden (e) {
        this.setState({
            matchisHiddin: true,
            jobisHiddin: true
        })
        this.setState({
            courseisHidden: !this.state.courseisHidden  
        })
    }
    matchToggleHidden (e) {
        this.setState({
            courseisHidden: true,
            jobisHiddin: true
        })
        this.setState({
            matchisHiddin: !this.state.matchisHiddin  
        })
    }
    jobToggleHidden (e) {
        this.setState({
            courseisHidden: true,
            matchisHiddin: true
        })
        this.setState({
            jobisHiddin: !this.state.jobisHiddin  
        })
    }
    matcher = () => {
        let matchedCourses = [];
        console.log(this.props.loggedInUser.user_courses)
        for(let usercourse of this.props.loggedInUser.user_courses) {
            for(let course of this.props.foundBusiness.courses){
                if (usercourse.complete && usercourse.course_id === course.id){
                    matchedCourses.push(course)
                }
            }
            
        }

        let percentageMatch = matchedCourses.length / this.props.foundBusiness.courses.length

        if (percentageMatch !== 0){
            let matchObj = {
                user_id: this.props.loggedInUser.id,
                business_id: this.props.foundBusiness.id,
                user_name: this.props.loggedInUser.username,
                business_name: this.props.foundBusiness.name,
                match_percentage: percentageMatch * 100
            }
            this.props.createMatch(matchObj)
            this.setState({
                courseisHidden: true,
                jobisHiddin: true
            })
            this.setState({
                matchisHiddin: false  
            })
        }

    }

    renderUserMatches = () => {
        let users = []
        this.props.foundBusiness.users.length >= 1 ? users = this.props.foundBusiness.users.map(user => <User user={user} key={user.id}/>) : users = []
        return users
    }


    render(){
        let courses = []
        this.props.foundBusiness ?  courses = this.props.foundBusiness.courses.map(course => <Course course={course} key={course.id} />) :  courses = []
        return (
            this.props.business ? 
            <NavLink to={`/businesses/${this.props.business.id}`} >
           <div>
            <figure class="business-card">         
                    <img src={this.props.business.logo} alt="profile-sample4" class="bus-logo"/>
                    <h2>{this.props.business.name}</h2>
                    <p>
                        {this.props.business.industry}
                    <br></br>
                    <br></br>
                    <br></br>
                    </p>
                    
                </figure>
            </div>
            </NavLink>
            :
            <div>
                <div class="content-profile-page">
                <div class="profile-user-page card">
                    <div class="img-user-profile">
                        <img class="profile-bgHome" src={this.props.foundBusiness.cover_photo} />
                        <img class="avatar" src={this.props.foundBusiness.logo} alt={this.props.foundBusiness.logo}/>
                        </div>
                        
                        <div class="user-profile-data">
                            <h1>{this.props.foundBusiness.name}</h1>
                            <p>{this.props.foundBusiness.industry}</p>
                        </div> 
                      
                            <button onClick={this.matcher}> Match</button>
                        <br></br>
            <div class="description-profile"> 
            <p>{this.props.foundBusiness.description}</p>
            </div>
                    <ul class="data-user">
                        <li onClick={this.courseToggleHidden.bind(this)}><a><strong>{this.props.foundBusiness.courses.length}</strong><span>Courses</span></a></li>
                        <li onClick={this.matchToggleHidden.bind(this)}><a><strong>{this.props.foundBusiness.users.length}</strong><span>User Matches</span></a></li>
                        <li onClick={this.jobToggleHidden.bind(this)}><a><strong>1</strong><span>Job Description</span></a></li>
                    </ul>
                    {this.state.jobisHiddin ? <h1></h1> : <div class="description-profile"> 
                    <br></br>
                    <br></br>
                    <br></br>
                        <h2>Job Description</h2>
                        {this.props.foundBusiness.job}
                         </div> }     
                    {this.state.courseisHidden ? <h1></h1> : <div>
                    <h2>Courses</h2>
                    <br></br>
                 
                    {courses}
                 
                    </div>   }
                    {this.state.matchisHiddin ? <h1></h1> : <div> 
                        <h2>User Matches</h2>
                        {this.renderUserMatches()}
                         </div> }
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
        usercourses: state.usercourses,
    }
    }
const mapDispatchToProps = (dispatch) => {
    return { 
        fetchUsercourses: ()=> dispatch(getUsercourses()),
        createMatch: (matchObj) => dispatch(matchPost(matchObj))
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(Business);