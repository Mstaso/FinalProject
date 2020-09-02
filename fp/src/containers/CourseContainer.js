import React from 'react'
import Course from '../components/Course'
import {Route, Switch} from 'react-router-dom'
import { connect } from 'react-redux'
import { getCourses } from '../redux/actions'


class CourseContainer extends React.Component {

    componentDidMount(){
        this.props.fetchCourses()
    }
    
    render(){

        // let courses = this.props.courses.map(course => <Course key={course.id} course={course}/>)
        let courses = this.props.courses.filter(course => course.name.toLowerCase().includes(this.props.searchValue.toLowerCase())).map(course => <Course key={course.id} course={course}/>)
        
        // .map(course => <Course key={course.id} course={course}/>)
        return (
            <>
            {this.props.courses.length === 0 ? <h1>Loading</h1>: 
            
            <>
            <Switch>
                <Route path='/courses/:id' render={({ match }) => {
                    let id = parseInt(match.params.id)
                    let foundCourse = this.props.courses.find((course)=> course.id === id)
                    return <Course foundCourse={foundCourse} />
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

const mapStateToProps = (state) => {
    return {
        courses: state.courses,
        searchValue: state.searchValue
    }
    }
  const mapDispatchToProps = (dispatch) => {
    return { fetchCourses: ()=> dispatch(getCourses())}
  } 
  
  export default connect(mapStateToProps, mapDispatchToProps)(CourseContainer);