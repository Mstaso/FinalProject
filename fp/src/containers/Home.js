import React from 'react'
import Course from '../components/Course'

class Home extends React.Component {

    render(){
         let courses = this.props.courses.splice(0,9).map(course => <Course course={course} key={course.id}/>)
        return(
            <div>
                <h1>Lets Go</h1>
                    <div>
                      
                      {courses}

                    </div>
            </div>
            
        )
    }
}

export default Home;