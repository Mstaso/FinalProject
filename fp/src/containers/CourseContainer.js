import React from 'react'
import Course from '../components/Course'
import {Route, Switch} from 'react-router-dom'

class CourseContainer extends React.Component {
    
    render(){
        let courses = this.props.courses.map(course => <Course key={course.id} course={course} appClickHandler={this.props.appClickHandler}/>)
        return (
            <>
            {this.props.courses.length === 0 ? <h1>Loading</h1>: 
            
            <>
            <Switch>
                <Route path='/courses/:id' render={({ match }) => {
                    let id = parseInt(match.params.id)
                    let foundCourse = this.props.courses.find((course)=> course.id === id)
                    return <Course foundCourse={foundCourse} appClickHandler={this.props.appClickHandler}/>
                }}/>
                <Route path="/courses" render={() => {

                    return (
                        <>
                            {
                                this.props.courses.length === 0 ? <h1>Loading</h1> :
                                <>
                                {courses}
                                </>
                            }
                        
                        
                        </>
                    )
                }} />
                <Route path="/home" render={() => {

                    return (
                        <>
                            {
                                this.props.courses.length === 0 ? <h1>Loading</h1> :
                                <>
                                {courses.splice(0,9)}
                                </>
                            }
                        
                        
                        </>
                    )
                }} />
            </Switch>       
            </>
            
            
            }
            </>
        )
    }
}

export default CourseContainer;