import React from 'react'
import CourseContainer from '../containers/CourseContainer'
import BusinessContainer from '../containers/BusinessContainer'

class Home extends React.Component {

    render(){
        return(
            <div> 
                <h2>Top Courses</h2>    
                <CourseContainer courses={this.props.courses}/>
                <h2>New Businesses</h2>   
                <BusinessContainer businesses={this.props.businesses}/>
            </div>     
        )
    }
}

export default Home;