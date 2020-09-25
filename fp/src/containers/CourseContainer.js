import React from 'react'
import Course from '../components/Course'
import {Route, Switch} from 'react-router-dom'
import { connect } from 'react-redux'
import { getCourses } from '../redux/actions'
import { setCourses } from '../redux/actions'
import FilterSetting from '../components/FilterSetting'
import ReactPaginate from 'react-paginate'


let newArray = []

class CourseContainer extends React.Component {

    state = {
        category: 'all',
        subcategory: 'all',
        offset: 0,
        coursesOnDisplay: [],
        perPage: 10,
        currentPage: 0,
    }

    componentDidMount(){
        // this.props.fetchCourses()
        this.receivedCourses() 
    }

    receivedCourses() {
        if (this.props.courses.length >= 10){
            this.displayCourses(this.props.courses)
        } else {
            fetch("http://localhost:3000/api/v1/courses")
            .then(resp => resp.json())
            .then(data => { 
                this.props.setCourses(data)
                this.displayCourses(data)
            })
        }
         
    }
    displayCourses(data) {
        console.log(this.props.searchValue)
        let coursesThroughSearch =  data.filter(course => 
            course.name.toLowerCase().includes(this.props.searchValue.toLowerCase()))

        let newcategory = []

        if (this.state.category === 'all'){
            newcategory = coursesThroughSearch
        } else {
            this.state.subcategory === 'all' ?
            newcategory = coursesThroughSearch.filter(course =>
                course.category === this.state.category)
                :
            newcategory = coursesThroughSearch.filter(course =>
                course.subcategory === this.state.subcategory)   
        }
            let slice = newcategory.slice(this.state.offset, this.state.offset + this.state.perPage)
            let postData = slice.map(course =>             
                <Course course={course} key={course.id}/>)
                    
                    this.setState({
                    pageCount: Math.ceil(newcategory.length / this.state.perPage),
                    coursesOnDisplay: postData,
                    subcategory: 'all'
                })
        
        
    }


    displaySubFilter = () => {
        console.log("been hit", this.state.category)
        let newCourses = this.props.courses.filter(course => course.category === this.state.category)
        newArray = []
        newCourses.map(newcourse => this.findSingularSub(newcourse))

    }

    findSingularSub = (newcourse) => {
        console.log(newArray)
        if(newArray.includes(newcourse.subcategory)){
            console.log("already in array")    
        } else {
            newArray.push(newcourse.subcategory)
        }
      
    } 
    
    

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.displayCourses(this.props.courses)
        });

    };

    returnCourses = (newcategory) => {
        this.setState({
            category: newcategory
        }, ()=>{
            this.displayCourses(this.props.courses)
            this.displaySubFilter()
        })
        
    }

    returnSubcategories = (newSubcategory) => {
        this.setState({
            subcategory: newSubcategory
        }, ()=>{
            this.displayCourses(this.props.courses)
        })
    }


    
    render(){
        console.log(this.state.coursesOnDisplay)
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
                    let foundCourse = this.props.courses.find((course)=> course.id === id)
                    console.log(foundCourse)
                    return <Course commentCreater={this.commentCreater} foundCourse={foundCourse} userAdder={this.userAdder} />
                }}/>
                <Route path="/courses" render={() => {

                    return (
                        <>  
                        <FilterSetting returnCourses={this.returnCourses} returnSubcategories={this.returnSubcategories} newArray={newArray} displaySubFilter={this.displaySubFilter} category={this.state.category}/>
                        
                  
                        <br></br>
                        <br></br>  
                        <br></br>
                        <br></br>
                            {
                                this.props.courses.length == 0 ? <h1>Loading</h1> :
                                <div id="columnscourses">
                                {this.state.coursesOnDisplay}
                                </div>
                            }
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
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
                                this.state.coursesOnDisplay.length !== 10 ? <h1>Loading</h1> :
                                <div id="columnscourses">
                                {this.state.coursesOnDisplay}
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
    return { fetchCourses: ()=> dispatch(getCourses()),
             setCourses: (data)=>dispatch(setCourses(data))}
  } 
  
  export default connect(mapStateToProps, mapDispatchToProps)(CourseContainer);