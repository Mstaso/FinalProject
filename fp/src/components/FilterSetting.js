import React from 'react'

class FilterSetting extends React.Component {

    changeHandler = (e) => {
        this.props.returnCourses(e.target.value)
    }

    render(){
        return(
            <form onChange={this.changeHandler}>           
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
        )
    }
}

export default FilterSetting;