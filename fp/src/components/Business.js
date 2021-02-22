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
        // test
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
            this.props.otherBusiness ?
            <NavLink to={`/businesses/${this.props.otherBusiness.id}`} >
            <div class="row index-container">
                <img class="col" id="profsmall" src={this.props.otherBusiness.logo} alt={this.props.otherBusiness.name}/>
                <div class="col index-info">
                <h5>{this.props.otherBusiness.name}</h5>
                <br></br>
                <p>{this.props.otherBusiness.industry}</p>
                </div>
            </div>
            </NavLink>
            :
            this.props.business ? 
            <NavLink to={`/businesses/${this.props.business.id}`} >

            <div class="business-card col span-1-of-6 ">
                    <img src={this.props.business.logo} alt="profile-sample4" class="bus-logo"/>
                    <h3>{this.props.business.name}</h3>
                </div>
            </NavLink>
            :
            <div>
                  <div class="image-container">
                <img class="cover-photo" src={this.props.foundBusiness.cover_photo} />
                <img class="avatar" src={this.props.foundBusiness.logo} alt={this.props.foundBusiness.name}/>

                        <div class="quick-info">
                            <h3>{this.props.foundBusiness.name}</h3>
                            <p>{this.props.foundBusiness.industry}</p>
                        </div> 
                        <button class="btn-small btn-full" onClick={this.matcher}>Match</button>
                </div>

            <div class="about-description">
            <h4>About</h4> 
            <p>{this.props.foundBusiness.description}</p>
            </div>
            <div class="main-info-container">
                <ul class="row toggle-text">
                        <li class="col span-1-of-3" onClick={this.courseToggleHidden.bind(this)}><a>{this.props.foundBusiness.courses.length}  Courses</a></li>
                        <li class="col span-1-of-3" onClick={this.matchToggleHidden.bind(this)}><a>{this.props.foundBusiness.users.length}  User Matches</a></li>
                        <li class="col span-1-of-3" onClick={this.jobToggleHidden.bind(this)}><a>Job Description</a></li>
                    </ul>
                    {this.state.jobisHiddin ? <h1></h1> : <div class="description-profile"> 
                        {this.props.foundBusiness.job}
                         </div> }     
                    {this.state.courseisHidden ? <h1></h1> : <div>
                    {courses}
                    </div>   }
                    {this.state.matchisHiddin ? <h1></h1> : <div> 
                        {this.renderUserMatches()}
                         </div> }
          
                         </div>
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