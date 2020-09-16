import React from 'react'
import {NavLink} from 'react-router-dom'
import Course from './Course'
import Match from './Match'
import { connect } from 'react-redux'
import { getUsercourses } from '../redux/actions'
import { getUsers } from '../redux/actions'

class Business extends React.Component {

    constructor () {
        super()
        this.state = {
          courseisHidden: true,
          matchisHiddin: true,
          jobisHiddin: true
        }
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
        let LoggedinUserCompletedUCs = this.props.usercourses.filter(usercourse => usercourse.user_id == this.props.loggedInUser.id && usercourse.complete == true)
        console.log(LoggedinUserCompletedUCs)
        let businessCourseIds = []
        this.props.foundBusiness.courses.map(course => businessCourseIds.push(course.id))
        console.log(businessCourseIds)
        let matchedCourses = LoggedinUserCompletedUCs.filter(usercourse => businessCourseIds.includes(usercourse.course_id))
        console.log(matchedCourses)
        let percentageMatch = matchedCourses.length / businessCourseIds.length
        console.log(parseFloat(percentageMatch * 100)+"%")
        if (percentageMatch !== 0){
            this.createMatch(percentageMatch)
        }

    }
    createMatch = (percentageMatch) => {
        console.log(this.props, percentageMatch)
            fetch('http://localhost:3000/api/v1/matches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 'accepts': 'application/json',
              },
            body: JSON.stringify({ match: {
                user_id: this.props.loggedInUser.id,
                business_id: this.props.foundBusiness.id,
                user_name: this.props.loggedInUser.username,
                business_name: this.props.foundBusiness.name,
                match_percentage: percentageMatch * 100
            }})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.props.businessFetcher()
        })
         
        
         
    }

    renderMatches = () => {
        let usermatches = []
        this.props.foundBusiness.matches.length >= 1 ? usermatches = this.props.foundBusiness.matches.map(match => <Match match={match} key={match.id}/>) : usermatches = []
        return usermatches
    }

    render(){
        let courses = []
        this.props.foundBusiness ?  courses = this.props.foundBusiness.courses.map(course => <Course course={course} key={course.id} />) :  courses = []
        return (
            this.props.business ? 
            <NavLink to={`/businesses/${this.props.business.id}`} >
           <div>
            <figure class="business-card">
                <img src={this.props.business.cover_photo} alt="sample87" class="bus-cover"/>
                
                    <img src={this.props.business.logo} alt="profile-sample4" class="bus-logo"/>
                    <h2>{this.props.business.name}</h2>
                    <p>{this.props.business.industry}</p>
               
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
                        </div> 
                        <br></br>
                            <button onClick={this.matcher}> Match</button>
                        <br></br>
        <div class="description-profile"> <p>{this.props.foundBusiness.description}</p></div>
                    <ul class="data-user">
                        <li onClick={this.courseToggleHidden.bind(this)}><a><strong>{this.props.foundBusiness.courses.length}</strong><span>Courses</span></a></li>
                        <li onClick={this.matchToggleHidden.bind(this)}><a><strong>{this.props.foundBusiness.matches.length}</strong><span>User Matches</span></a></li>
                        <li onClick={this.jobToggleHidden.bind(this)}><a><strong>1</strong><span>Job Description</span></a></li>
                    </ul>
                    {this.state.jobisHiddin ? <h1></h1> : <div class="description-profile"> 
                        <h2>Job Description</h2>
                        {this.props.foundBusiness.job}
                         </div> }     
                    {this.state.courseisHidden ? <h1></h1> : <div>
                    <h2>Courses</h2>
                    <br></br>
                    {/* <div id="columnscourses"> */}
                    {courses}
                    {/* </div> */}
                    </div>   }
                    {this.state.matchisHiddin ? <h1></h1> : <div> 
                        <h2>User Matches</h2>
                        {this.renderMatches()}
                         </div> }
                    </div>
                    </div>
                        
                {/* <footer>
                <h4>Design by <a href="https://twitter.com/jofpin" target="_blank" title="José Pino">@jofpin</a></h4>
                </footer> */}
            <div/>    
            <div/>
            </div>
        //     <div>
        //         <h1>{this.props.foundBusiness.name}</h1>
        //         <img src={this.props.foundBusiness.logo} alt={this.props.foundBusiness.name} width="200" height="200"/>
        //         <h2> Industry: {this.props.foundBusiness.industry}</h2>
        //         <p className='description'>{this.props.foundBusiness.description}</p>
        // <button onClick={this.matcher}>Match with {this.props.foundBusiness.name}</button>
        //         <h3>Current Courses</h3>
        //         {courses}
        //         <h3>User Matches</h3>
        //         {this.renderMatches()}
        //     </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUser,
        businesses: state.businesses,
        courses: state.courses, 
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

export default connect(mapStateToProps, mapDispatchToProps)(Business);