import React from 'react'
import UserTemplate from '../components/UserTemplate'

class UserTemplateContainer extends React.Component {

    render () {
        // let filteruser = this.props.businesses.filter(business => business.id === 5)
        let courses = this.props.courses.filter(course => course.id < 13).map(course => <UserTemplate course={course} key={course.id}/>)
        return (
           
        <div id="columnscourses"> 
               {courses}
        </div>
            
         
        )
    }
}

export default UserTemplateContainer;