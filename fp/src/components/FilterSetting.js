import React from 'react'
import { connect } from 'react-redux'
import Search from './Search'

class FilterSetting extends React.Component {

    categoryHandler = (e) => {
        this.props.filterMainCategory(e.target.value)
    }

    subcategoryHandler = (e) => {
        this.props.returnSubcategories(e.target.value)
    }

    subcategoryOptions = () => {
        if (this.props.category === "business"){
            return (
                <form class="col span-1-of-3 box" onChange={this.subcategoryHandler}>
                <label>sub</label>
                    <select name="subcategory">
                <option value="all">All</option>
                <option value="finance">Finance</option>
                <option value="business-strategy">Business Strategy</option>
                <option value="marketing">Marketing</option>
                <option value="entrepreneurship">Entrepreneurship</option>
                <option value="business-essentials">Business Essentials</option>
                <option value="leadership-and-management">Leadership and Management</option>
                    </select>
                </form>
            )
            
        } else if (this.props.category === "data-science") {
            return (
                <form class="col span-1-of-3 box" onChange={this.subcategoryHandler}>
                <label>sub</label>
                    <select name="subcategory">
                <option value="all">All</option>
                <option value="data-analysis">Data Analysis</option>
                <option value="machine-learning">Machine Learning</option>
                <option value="probability-and-statistics">Probability and Statistics</option>
                    </select>
                </form>
            )
        } else if (this.props.category === "computer-science"){
            return (
                <form class="col span-1-of-3 box" onChange={this.subcategoryHandler}>
                <label>sub</label>
                    <select name="subcategory">
                <option value="all">All</option>
                <option value="software-development">Software Development</option>
                <option value="design-and-product">Design and Product</option>
                <option value="algorithms">Algorithms</option>
                <option value="mobile-and-web-development">Mobile and Web Development</option>
                <option value="computer-security-and-networks">Computer Security and Networks</option>
                    </select>
                </form>
            )
        } else if (this.props.category === "life-sciences"){
            return (
                <form class="col span-1-of-3 box" onChange={this.subcategoryHandler}>
                <label>sub</label>
                    <select name="subcategory">
                <option value="all">All</option>
                <option value="patient-care">Patient Care</option>
                <option value="healthcare-management">Healthcare Management</option>
                <option value="public-health">Public Health</option>
                <option value="health-informatics">Health Informatics</option>
                <option value="psychology">Psychology</option>
                <option value="basic-science">Basic Science</option>
                <option value="research">Research</option>
                <option value="nutrition">Nutrition</option>
                <option value="animal-health">Animal Health</option>
                <option value="psychology">Psychology</option>
                    </select>
                </form>
            )
        } else if (this.props.category === "social-sciences"){
            return(
                <form class="col span-1-of-3 box" onChange={this.subcategoryHandler}>
                <label>sub</label>
                    <select name="subcategory">
                <option value="education">Education</option>
                <option value="governance-and-society">Governance and Society</option>
                <option value="law">Law</option>
                <option value="economics">Economics</option>
                <option value="all">All</option>
                    </select>
                </form>
            )
        } else if (this.props.category === "information-technology"){
            return (
                <form class="col span-1-of-3 box" onChange={this.subcategoryHandler}>
                <label>sub</label>
                    <select name="subcategory">
                <option value="cloud-computing">Cloud Computing</option>
                <option value="security">Security</option>
                <option value="support-and-operations">Support and Operations</option>
                <option value="data-management">Data Management</option>
                <option value="networking">Networking</option>
                <option value="all">All</option>
                    </select>
                </form>
            )
           
        } else if (this.props.category === "physical-science-and-engineering"){
            return (
                <form class="col span-1-of-3 box" onChange={this.subcategoryHandler}>
                <label>sub</label>
                    <select name="subcategory">
                <option value="all">All</option>
                <option value="physics-and-astronomy">Physics and Astronomy</option>
                <option value="mechanical-engineering">Mechanical Engineering</option>
                <option value="environmental-science-and-sustainability">Environmental Science and Sustanibility</option>
                <option value="electrical-engineering">Electrical Engineering</option>
                <option value="chemistry">Chemistry</option>
                <option value="research-methods">Research Methods</option>

                    </select>
                </form>
            ) 
        } else if (this.props.category === "arts-and-humanities"){
            return (
                <form class="col span-1-of-3 box" onChange={this.subcategoryHandler}>
                <label>sub</label>
                    <select name="subcategory">
                <option value="all">All</option>     
                <option value="music-and-art">Music and Art</option>
                <option value="history">History</option>
                <option value="philosophy">philosophy</option>
                    </select>
                </form>
            )
        } else if (this.props.category === "language-learning"){
            return (
                <form class="col span-1-of-3 box" onChange={this.subcategoryHandler}>
                <label>sub</label>
                    <select name="subcategory">
                <option value="all">All</option>       
                <option value="math-and-logic">Math and Logic</option>
                <option value="other-languages">Other Languages</option>
                <option value="learning-english">Learning English</option>
                    </select>
                </form>
            )
        } else {
            return (
            <form class="col span-1-of-3 box" onChange={this.subcategoryHandler}>
             <label>sub</label>
                 <select name="subcategory">
             <option value="all">All</option>
                 </select>
             </form>
            )
        }
    }

    render(){
        let title = "All Categories"
        let optionsToRender = []
    this.props.subCategoryArray.length >= 3 ? optionsToRender = this.props.subCategoryArray.map(option => <option key={option} value={option}>{option}</option>) : optionsToRender = []
        return(
            <div class="filter">

                <div class="category1">
                <div class="row">
                <h2>Find Courses</h2>
                </div>
                <div class="row">
                <div class="col span-1-of-3 box">
                <Search handleSearch={this.props.handleSearch}/>
                </div>
            <form class="col span-1-of-3 box" onChange={this.categoryHandler}>
                <label>Main </label>           
                <select class="course-select" name="category"> 
                <option value="all">All Categories</option>
                <option value="business">Business</option>
                <option value="data-science">Data-Science</option>
                <option value="computer-science">Computer-Science</option>
                <option value="life-sciences">Life-Sciences</option>
                <option value="social-sciences">Social-Sciences</option>
                <option value="information-technology">Information-Technology</option>
                <option value="physical-science-and-engineering">Physical-Science-and-Engineering</option>
                <option value="arts-and-humanities">Arts-and-Humanities</option>
                <option value="personal-development">Personal-Development</option>
                <option value="math-and-logic">Math-and-Logic</option>
                <option value="language-learning">Language-Learning</option>
                </select>
            </form>
    
                {this.props.category === "all" ? 
             <form class="col span-1-of-3 box" onChange={this.subcategoryHandler}>
             <label class="sub-label">sub</label>
                 <select class="course-select" name="subcategory">
             <option value="all">All</option>
                 </select>
             </form>
             :
             this.subcategoryOptions()
                }
    
                
                </div>
            </div>
        
            
        
        
           
            </div>

        )
    }
}

// export default FilterSetting;

const mapStateToProps = (state) => {
    return {
        category: state.category
    }
}

export default connect(mapStateToProps, null)(FilterSetting);
