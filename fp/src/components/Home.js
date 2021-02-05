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
                <a class="btn btn-full" onClick={this.clickHandler}>Sign Up</a>
                <a class="btn btn-ghost" href="#">Learn More</a>
               </div>
                </div>
            <div class="how-it-works">
                <div class="row">
                    <h2>How it Works</h2> 
                    <p class="long-copy">Browse, take courses and match with companies by completing one or more of their selected courses </p>        
                </div>
                <div class="row">
                    <div class="col span-1-of-3 box">
                        <ion-icon name="infinite-outline" class="icon-big" ></ion-icon>
                        <h3>Courses</h3>
                        <p>
                           1000+ courses available on the platform
                        </p>
                    </div>
                   
                    <div class="col span-1-of-3 box">
                         <ion-icon name="business-outline" class="icon-big"></ion-icon>
                        <h3>Companies</h3>
                        <p>
                            Post job descriptions and select courses that are relevant to the position.
                            {/* Complete courses selected by companies to be able to connect with them.   */}
                        </p>
                    </div>
                    <div class="col span-1-of-3 box">
                        <ion-icon name="bulb-outline" class="icon-big"></ion-icon>
                        <h3>Match</h3>
                        <p>
                           Connect with a company by completing one or more of their selected courses.  
                        </p>
                    </div>
                </div>
            </div>
            <div class="featured-courses">
            <div class="row">
                <div class="col span-1-of-2 box">
                    <figure class="homebanner1-holder">
                <img class="homebanner1" src={homebanner1} alt='cs-course-image'></img>
                </figure>
                </div>
                <div class="col span-1-of-2 box">
                    <h3>Computer-Science  Courses</h3>
                    <p>Those studying computer science may end up taking a similarly broad range of career pathways. Many CS majors focus on building skills in software programming, coding, and web development, all of which are highly sought after by a wide variety of companies. However, others may focus on more specialized topics such as algorithmic problem solving, machine learning and artificial intelligence, cybersecurity, and even robotics!</p>
                    <button class="btn btn-full" value="computer-science" onClick={this.categoryHandler}>View</button>
                </div>
            </div>
            <div class="row">
                <div class="col span-1-of-2 box">
                <h3>Business Courses</h3>
                <p>If you’re looking to advance your career in business, there are plenty of online courses available that can help you build these skills right away. Courses in finance, accounting, and business modeling can give you the tools you need to manage your cashflow wisely. Business planning, value chain management, and project management can help you optimize your operations for success.  Whatever your business background, online courses can take you further!</p>
                <button class="btn btn-full" value="business" onClick={this.categoryHandler}>View </button>
                </div>
                <div class="col span-1-of-2 box">
                <figure class="homebanner2-holder">
                <img class="homebanner2" src={homebanner2}></img>
                </figure>
                </div>
            </div>
            </div>
            <div class="featured-companies">
            <h2> Featured Companies</h2>
                <BusinessContainer />
            </div>
            </div> 
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return { setCategory: (category) => dispatch(setCategory(category)) }
  } 

export default withRouter(connect(null, mapDispatchToProps)(Home));