import React from 'react'
import Course from '../components/Course'
import {Route, Switch} from 'react-router-dom'
import { connect } from 'react-redux'
import { getCourses } from '../redux/actions'
import { setCourses } from '../redux/actions'
import { setCategory } from '../redux/actions'
import { singleCourse } from '../redux/actions'
import FilterSetting from '../components/FilterSetting'
import ReactPaginate from 'react-paginate'


let newArray = []

class CourseContainer extends React.Component {

    state = {
        subcategory: 'all',
        offset: 0,
        coursesOnDisplay: [],
        perPage: 10,
        currentPage: 0,
    }

    componentDidMount(){
        this.receivedCourses() 

    }

    receivedCourses() {
        if (this.props.courses.length >= 10){
            // let data = []
            // this.props.category === "all" ?  data = this.props.courses : data = this.props.courses.filter(course => course.category === this.props.category)
            // this.displayCourses(data)
            this.props.category.length > 1 ? this.returnCourses(this.props.category) : this.displayCourses(this.props.courses)
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
        let coursesThroughSearch =  data.filter(course => 
            course.name.toLowerCase().includes(this.props.searchValue.toLowerCase()))
            let slice = coursesThroughSearch.slice(this.state.offset, this.state.offset + this.state.perPage)
            let postData = slice.map(course =>             
                <Course course={course} key={course.id}/>)
                    
                    this.setState({
                    pageCount: Math.ceil(coursesThroughSearch.length / this.state.perPage),
                    coursesOnDisplay: postData,
                    subcategory: 'all'
                })
        
    }


    displaySubFilter = (newcategory) => {
        let newCourses = this.props.courses.filter(course => course.category === newcategory)
        newArray = []
        newCourses.map(newcourse => this.findSingularSub(newcourse))

    }

    findSingularSub = (newcourse) => {
        if(newArray.includes(newcourse.subcategory)){
        } else {
            newArray.push(newcourse.subcategory)
        }
      
    } 
    
    

    handlePageClick = (e) => {
        console.log("clicked", this.props.category)
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            if (this.props.category === "all"){
                console.log(this.props.category)
                this.displayCourses(this.props.courses)
            } else {
                if (this.state.subcategory !== "all"){
                    let data = this.props.courses.filter(course => course.subcategory == this.state.subcategory)
                    console.log(data, this.state.subcategory)
                    this.displayCourses(data)
                } else {
                    let data = this.props.courses.filter(course => course.category == this.props.category)
                    console.log(this.props.category)
                    this.displayCourses(data)
                }
            }
        });

    };

    returnCourses = (newcategory) => {
        if(newcategory != this.props.category){
            this.props.setCategory(newcategory) 
        }
        let data = []
        newcategory === "all" ? data = this.props.courses : data = this.props.courses.filter(course => course.category === newcategory)
        this.displayCourses(data)
        this.displaySubFilter(newcategory)
            


        // this.displayCourses(this.props.courses)
        //     this.displaySubFilter()
        // this.setState({
        //     category: newcategory
        // }, ()=>{
            // this.displayCourses(this.props.courses)
            // this.displaySubFilter()
        // })
        
    }

    returnSubcategories = (newSubcategory) => {
        let data = []
        newSubcategory === "all" ? this.props.category === "all" ? data = this.props.courses : data = this.props.courses.filter(course => course.category === this.props.category)
        :
        data = this.props.courses.filter(course => course.subcategory === newSubcategory)
        this.displayCourses(data)
        // this.setState({
        //     subcategory: newSubcategory
        // }, ()=>{
        //     this.displayCourses(this.props.courses)
        // })
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
            
            <>
            <Switch>
                <Route path='/courses/:id' render={({ match }) => {
                    let id = parseInt(match.params.id)
                    if(this.props.courses.length > 0){
                    let foundCourse = this.props.courses.find((course) => course.id === id)
                    console.log(foundCourse)
                    return <Course foundCourse={foundCourse} />
                    } else {
                        fetch(`http://localhost:3000/api/v1/courses${id}`)
                        .then(resp => resp.json())
                        .then(data => { 
                            return <Course foundCourse={data}/>
                         })
                    }
                }}/>
                <Route path="/courses" render={() => {

                    return (
                        <>  
                        <FilterSetting returnCourses={this.returnCourses} returnSubcategories={this.returnSubcategories} newArray={newArray} displaySubFilter={this.displaySubFilter}/>
                        
                  
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
        searchValue: state.searchValue,
        category: state.category
    }
    }

  const mapDispatchToProps = (dispatch) => {
    return { fetchCourses: ()=> dispatch(getCourses()),
             setCourses: (data)=>dispatch(setCourses(data)),
             setCategory: (category) => dispatch(setCategory(category)),
             fetchOneCourse: (id)=> dispatch(singleCourse(id))
            }
  } 

  
  
  export default connect(mapStateToProps, mapDispatchToProps)(CourseContainer);