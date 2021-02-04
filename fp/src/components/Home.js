import React from 'react'
import CourseContainer from '../containers/CourseContainer'
import BusinessContainer from '../containers/BusinessContainer'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setCategory } from '../redux/actions'

const banner = require('../banner.jpg')

const hero = require('../hero.jpg')

const homebanner1 = require('../homebanner1.png')

const homebanner2 = require('../homebanner2.jpg')

class Home extends React.Component {


    clickHandler = () => {
        this.props.history.push("/signup");
    }

    categoryHandler = (e) => {
        this.props.setCategory(e.target.value)
        this.props.history.push("/courses");
    }
    

    render(){

        return(    
            <div >
               <div className="banner-div">
               <div className="banner-info">
                <h2>Match With Your Next Employer</h2> 
                
                {/* <p>
                    Find and land a new job by taking courses relevant to up and coming businesses
                </p>
          */}
                <a class="btn" onClick={this.clickHandler}>Sign Up</a>
               </div>
                </div>
     
            
            <h3 class="featured"> Featured Businesses</h3>
            
 
           
                <BusinessContainer />
 
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div class="home-courses">
            <h3>Computer Science Courses</h3> 
            <br></br>
            <p>Those studying computer science may end up taking a similarly broad range of career pathways. Many CS majors focus on building skills in software programming, coding, and web development, all of which are highly sought after by a wide variety of companies. However, others may focus on more specialized topics such as algorithmic problem solving, machine learning and artificial intelligence, cybersecurity, and even robotics!</p>
            <br></br>
            <button value="computer-science" onClick={this.categoryHandler}>View Courses</button>
            </div>
            <img class="homebanner1" src={homebanner1}></img>
            <br></br>
            <br></br>  
         
            <div value="business" class="home-courses-2">

            <h3>Business Courses</h3> 
            <br></br>
            <p>If you’re looking to advance your career in business, there are plenty of online courses available that can help you build these skills right away. Courses in finance, accounting, and business modeling can give you the tools you need to manage your cashflow wisely. Business planning, value chain management, and project management can help you optimize your operations for success.  Whatever your business background, online courses can take you further!</p>
            <br></br>
            <button value="business" onClick={this.categoryHandler}>View Courses</button>
            <img src={homebanner2}></img>

            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>  
            <br></br>  
            <br></br>
            <br></br>
            <br></br>
            <br></br>  
            <br></br> 
            <div class="divider">
            <h3>Featured Courses</h3>
            </div>   
            <br></br>
            <br></br>
            <br></br>
            <br></br>  
            <br></br>  
            <br></br>
            <br></br>
            <br></br>
            <br></br>  
            <br></br> 
            <div id="columnshome">   
                <CourseContainer />
            </div>    
            </div> 
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return { setCategory: (category) => dispatch(setCategory(category)) }
  } 

export default withRouter(connect(null, mapDispatchToProps)(Home));