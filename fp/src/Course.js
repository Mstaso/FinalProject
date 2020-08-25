import React from 'react'

class Course extends React.Component {
    render(){
        return (
        <div>
            <br></br>
            {this.props.course.name}
            <img src={this.props.course.photoUrl} width="150" height="150"></img>
        </div>
        )
    }
}

export default Course;