import React from 'react'

class Course extends React.Component {
    render(){
        return (
        <div>
            <br></br>
            <h3>{this.props.course.name}</h3>
            <img src={this.props.course.image} width="150" height="150"></img>
        </div>
        )
    }
}

export default Course;