import React from 'react'

class FilterSetting extends React.Component {

    categoryHandler = (e) => {
        this.props.returnCourses(e.target.value)
        // this.props.displaySubFilter()
    }

    subcategoryHandler = (e) => {
        this.props.returnSubcategories(e.target.value)
    }



    render(){
        let optionsToRender = []
    this.props.newArray.length >= 3 ? optionsToRender = this.props.newArray.map(option => <option key={option} value={option}>{option}</option>) : optionsToRender = []
        return(
            <div class="filter">     
            <br></br>  
            <br></br>
            <form class="choosecategory" onChange={this.categoryHandler}>           
                <select name="category"> 
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
         
            <br></br>
            <form class="subcategory" onChange={this.subcategoryHandler}>
                <select name="subcategory">
                <option value="all">All</option>
                {optionsToRender}
                </select>
            </form>
        
        
            
        
        
           
            </div>

        )
    }
}

export default FilterSetting;

