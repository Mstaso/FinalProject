import React from 'react'
import CourseContainer from '../containers/CourseContainer'
import BusinessContainer from '../containers/BusinessContainer'

class Home extends React.Component {

    render(){
        return(
            <div >
            <h2>New Businesses</h2>
            <div id="columns" > 
                <BusinessContainer businesses={this.props.businesses}/>
            </div> 
            <h2>Top Courses</h2>    
            <div id="columnshome">   
                <CourseContainer courses={this.props.courses}/>
            </div>    
            </div> 
        )
    }
}

export default Home;