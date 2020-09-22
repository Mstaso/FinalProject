import React from 'react'
import Course from '../components/Course'
import {Route, Switch} from 'react-router-dom'
import { connect } from 'react-redux'
import { getCourses } from '../redux/actions'
import FilterSetting from '../components/FilterSetting'
import ReactPaginate from 'react-paginate'


class CourseContainer extends React.Component {

    state = {
        category: '',
        offset: 0,
        courses: [],
        perPage: 10,
        currentPage: 0,
        pageCount: 100
    }

    componentDidMount(){
        this.props.fetchCourses()
        this.receivedCoursestwo() 
    }

    // receivedCourses() {
    //     fetch("http://localhost:3000/api/v1/courses")
    //     .then(resp => resp.json())
    //     .then(data => {
    //         const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    //         const postData = slice.map(course => 
                
    //             <Course course={course} key={course.id}/>)
    //             this.setState({
    //                 pageCount: Math.ceil(this.props.courses.length / this.state.perPage),
    //                 courses: postData
    //             })

    //     })
         
    // }
    receivedCoursestwo() {
       
            const slice = this.props.courses.slice(this.state.offset, this.state.offset + this.state.perPage)
            const postData = slice.map(course => 
                
                <Course course={course} key={course.id}/>)
                    
                    this.setState({
                    pageCount: Math.ceil(1000 / this.state.perPage),
                    courses: postData
                })
        
    }


    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedCoursestwo()
        });

    };



    // commentCreater = (content, foundcourse_id) => {
    //     fetch('http://localhost:3000/api/v1/comments',{
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //              'accepts': 'application/json',
    //           },
    //         body: JSON.stringify({ comment: {
    //             content: content,
    //             user_id: this.props.loggedInUser.id,
    //             course_id: foundcourse_id
    //         }})
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data)
    //         this.props.fetchCourses()
    //     })
    // }

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
        // let coursesToDisplay = []
        // let courses = this.props.courses.filter(course => 
        //     course.name.toLowerCase().includes(this.props.searchValue.toLowerCase()))
        // this.state.category == '' ? 
        // coursesToDisplay = courses.map(course => 
        //     <Course key={course.id} course={course}/>)   
        //     :
        // coursesToDisplay = courses.filter(course =>
        //     course.category === this.state.category).map(course => 
        //     <Course key={course.id} course={course}/>)      

        // // .map(course => <Course key={course.id} course={course}/>)
        // let homeCourses = this.props.courses.splice(0,12).map(course => <Course key={course.id} course={course}/>)
        return (
            <>
            {/* {this.props.courses.length === 0 ? <h1>Loading</h1>:  */}
            
            <>
            <Switch>
                <Route path='/courses/:id' render={({ match }) => {
                    let id = parseInt(match.params.id)
                    console.log(id, this.props.courses)
                    let foundCourse = this.props.courses.find((course)=> course.id === id)
                    console.log(foundCourse)
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
                                // this.props.courses.length === 0 ? <h1>Loading</h1> :
                                <div id="columnscourses">
                                {this.state.courses}
                                </div>
                            }
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.postData}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
                        
                        </>
                    )
                }} />
                <Route path="/home" render={() => {

                    return (
                        <>
                            {
                                this.props.courses.length === 0 ? <h1>Loading</h1> :
                                <div id="columnscourses">
                                {this.state.courses}
                                </div>
                            }
                        
                        
                        </>
                    )
                }} />

            </Switch>       
            </>
            
            
            
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