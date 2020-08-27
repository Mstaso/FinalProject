import React from 'react'
import CourseContainer from '../containers/CourseContainer'
import BusinessContainer from '../containers/BusinessContainer'

class Home extends React.Component {

    render(){
        return(
            <div>
                <h1>Lets Go</h1>
                    <div>
                      
                      <CourseContainer courses={this.props.courses} appClickHandler={this.props.appClickHandler}/>
                      <BusinessContainer businesses={this.props.businesses}/>
                    </div>
            </div>
            
        )
    }
}

export default Home;