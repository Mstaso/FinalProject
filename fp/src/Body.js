import React from 'react'
import Course from './Course'

class Body extends React.Component {

    state = {
        courses: []
    }
    componentDidMount(){
        this.fetchCourses()
    }

    fetchCourses = () => {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
// "https://api.coursera.org/api/courses.v1&fields=photoUrl"
        const url = "https://api.coursera.org/api/courses.v1?includes=instructorIds,partnerIds,photoUrl&fields=instructorIds,partnerIds,photoUrl&&limit=10"
        fetch(proxyurl + url)
        .then(data => data.json())
        .then(data => this.setState({courses: data.elements}))
    }

    render(){
        console.log(this.state.courses)
        let courses = this.state.courses.map(course => <Course course={course} id={course.id}/>)
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

export default Body;