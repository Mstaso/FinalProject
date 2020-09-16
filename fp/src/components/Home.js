import React from 'react'
import CourseContainer from '../containers/CourseContainer'
import BusinessContainer from '../containers/BusinessContainer'
import UserContainer from '../containers/UserContainer'

class Home extends React.Component {

    render(){
        return(
            <div >
                {/* <div>
                <UserContainer /> 
                </div>  */}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h2>Featured Businesses</h2>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div id="columns" > 
                <BusinessContainer />
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
            <br></br>
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
            <h2>Featured Courses</h2>
            </div>   
            <br></br>
            <br></br>
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