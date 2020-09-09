import React from 'react'
import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom'
import { addUC } from '../redux/actions'

class UserCourse extends React.Component {

    completeUserCourse = (e) => {
        // console.log(this.props.usercourse.id, this.props.loggedInUser, this.props.businesses)
        fetch(`http://localhost:3000/api/v1/user_courses/${this.props.usercourse.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                 'accepts': 'application/json',
              },
            body: JSON.stringify({ usercourse: {
                complete: true
            }})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.props.patchUC(data)
            this.props.userCourseCompleter()
        })
    }

    render() {
        return (
            this.props.usercourse.complete == false ?
        <div>
        <NavLink to={`/courses/${this.props.usercourse.course_id}`}>
        <h4>{this.props.usercourse.name}</h4>
        </NavLink>
        <button class="profile-user-page" onClick={this.completeUserCourse}>Complete</button>
        <br></br>
        </div>

        :
        <div>
        <NavLink to={`/courses/${this.props.usercourse.course_id}`}>
        <h4>{this.props.usercourse.name}</h4>
        <br></br>
        </NavLink>
        </div>


        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUser,
    }
    }
const mapDispatchToProps = (dispatch) => {
    return { 
        patchUC: (ucObj) => dispatch(addUC(ucObj))
    }
        
    }     


export default connect(mapStateToProps, mapDispatchToProps)(UserCourse);
