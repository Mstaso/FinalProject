import React from 'react'
import CourseContainer from '../containers/CourseContainer'
import BusinessContainer from '../containers/BusinessContainer'

const banner = require('../banner.jpg')

class Home extends React.Component {


    render(){
        return(
            <div >
               <div className="banner-div">
               <img id="banner" src={banner}/>
                </div> 
            <div class="divider">
            <h2>Featured Businesses</h2>
            </div>
            <br></br>
            <br></br>
            <div id="columns" > 
                <BusinessContainer />
            </div>
            
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