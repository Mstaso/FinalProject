import React from 'react'
import Course from '../components/Course'
import {Route, Switch} from 'react-router-dom'
import { connect } from 'react-redux'
import { getCourses } from '../redux/actions'
import FilterSetting from '../components/FilterSetting'


class CourseContainer extends React.Component {

    state = {
        category: ''
    }
    componentDidMount(){
        this.props.fetchCourses()
    }

    commentCreater = (content, foundcourse_id) => {
        fetch('http://localhost:3000/api/v1/comments',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 'accepts': 'application/json',
              },
            body: JSON.stringify({ comment: {
                content: content,
                user_id: this.props.loggedInUser.id,
                course_id: foundcourse_id
            }})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.props.fetchCourses()
        })
    }

    returnCourses = (newcategory) => {
        console.log(newcategory)
        let courses = this.props.courses.filter(course => 
            course.name.toLowerCase().includes(this.props.searchValue.toLowerCase()))
       if (newcategory){
        console.log(newcategory)
        this.setState({category: newcategory})
         let filteredCourses = courses.filter(course => course.category === this.state.category).map(course => <Course course={course} key={course.id}/>)
         console.log(filteredCourses)
         return filteredCourses       
       } else {
        console.log(courses)
       return courses.map(course => <Course course={course} key={course.id}/>)
       }
    }

    
    render(){
        // let courses = this.props.courses.map(course => <Course key={course.id} course={course}/>)
        let coursesToDisplay = []
        let courses = this.props.courses.filter(course => 
            course.name.toLowerCase().includes(this.props.searchValue.toLowerCase()))
        console.log(this.state.category)
        this.state.category == '' ? 
        coursesToDisplay = courses.map(course => 
            <Course key={course.id} course={course}/>)   
            :
        coursesToDisplay = courses.filter(course =>
            course.category === this.state.category).map(course => 
            <Course key={course.id} course={course}/>)      

        // .map(course => <Course key={course.id} course={course}/>)
        let homeCourses = this.props.courses.splice(0,12).map(course => <Course key={course.id} course={course}/>)
        return (
            <>
            {this.props.courses.length === 0 ? <h1>Loading</h1>: 
            
            <>
            <Switch>
                <Route path='/courses/:id' render={({ match }) => {
                    let id = parseInt(match.params.id)
                    let foundCourse = this.props.courses.find((course)=> course.id === id)
                    return <Course commentCreater={this.commentCreater} foundCourse={foundCourse} userAdder={this.userAdder} />
                }}/>
                <Route path="/courses" render={() => {

                    return (
                        <>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>  
                        <br></br>
                        <br></br>
                        <FilterSetting returnCourses={this.returnCourses} />
                        <br></br>
                        <br></br>  
                        <br></br>
                        <br></br>
                            {
                                this.props.courses.length === 0 ? <h1>Loading</h1> :
                                <div id="columnscourses">
                                {coursesToDisplay}
                                </div>
                            }
                        
                        
                        </>
                    )
                }} />
                <Route path="/home" render={() => {

                    return (
                        <>
                            {
                                this.props.courses.length === 0 ? <h1>Loading</h1> :
                                <div id="columnscourses">
                                {homeCourses}
                                </div>
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
        loggedInUser: state.loggedInUser,
        searchValue: state.searchValue
    }
    }
  const mapDispatchToProps = (dispatch) => {
    return { fetchCourses: ()=> dispatch(getCourses())}
  } 
  
  export default connect(mapStateToProps, mapDispatchToProps)(CourseContainer);