import React from 'react'
import CourseContainer from '../containers/CourseContainer'
import BusinessContainer from '../containers/BusinessContainer'

const banner = require('../banner.jpg')

const homebanner1 = require('../homebanner1.png')

class Home extends React.Component {


    render(){
        return(
            <div >
               <div className="banner-div">
               <img id="banner" src={banner}/>
               <div className="banner-info">
                <h3>Match With Your Next Employer</h3> 
                <br></br>
                <p>Find and land job openings by taking courses that businesses find integral</p>
                <br></br>
                <button>Sign Up</button>
               </div>
                </div> 
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            <div class="divider">
            <h3>Featured Businesses</h3>
            <br></br>
            <br></br>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div id="columns" > 
                <BusinessContainer />
            </div>
            <div class="home-courses">
            <h3>Computer Science</h3> 
            <br></br>
            <p>Those studying computer science may end up taking a similarly broad range of career pathways. Many CS majors focus on building skills in software programming, coding, and web development, all of which are highly sought after by a wide variety of companies. However, others may focus on more specialized topics such as algorithmic problem solving, machine learning and artificial intelligence, cybersecurity, and even robotics!</p>
            <br></br>
            <button>View Courses</button>
            </div>
            <img class="homebanner1" src={homebanner1}></img>
            <br></br>
            <br></br>  
            <div class="divider">
            <h2>Featured Courses</h2>
            </div>   
            <br></br>
            <br></br>
            <br></br>
            <br></br>  
            <br></br>  
            <div id="columnshome">   
                <CourseContainer />
            </div>    
            </div> 
        )
    }
}

export default Home;