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
                <button>Sign Up</button>
               </div>
                </div> 
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
            <div id="columns" > 
                <BusinessContainer />
            </div>
            <div class="home-courses">
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