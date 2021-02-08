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

    render(){
        let title = "All Categories"
        let optionsToRender = []
    this.props.subCategoryArray.length >= 3 ? optionsToRender = this.props.subCategoryArray.map(option => <option key={option} value={option}>{option}</option>) : optionsToRender = []
        return(
            <div class="filter">
                <h3>
                    {this.props.category.length > 3 ?
                    title = this.props.category
                    :
                    title = "All Categories"
                    }
                  
                </h3>
                <div class="row category1">
                <div class="col span-1-of-3 box">
                <Search handleSearch={this.props.handleSearch}/>
                </div>
            <form class="col span-1-of-3 box" onChange={this.categoryHandler}>
                <label>main</label>           
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
            <form class="col span-1-of-3 box" onChange={this.subcategoryHandler}>
            <label>sub</label>
                <select name="subcategory">  
                <option value="all">All</option>
                {optionsToRender}
                </select>
            </form>

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
