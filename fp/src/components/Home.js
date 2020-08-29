import React from 'react'
import CourseContainer from '../containers/CourseContainer'
import BusinessContainer from '../containers/BusinessContainer'

class Home extends React.Component {

    render(){
        return(
            <div>     
                <CourseContainer courses={this.props.courses}/>
                <BusinessContainer businesses={this.props.businesses}/>
            </div>     
        )
    }
}

export default Home;