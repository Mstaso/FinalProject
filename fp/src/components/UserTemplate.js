import React from 'react'


class UserTemplate extends React.Component {

    render() {
        console.log(this.props)
        return(
             <div>
             <figure class="snip1336two">
                 <img src={this.props.course.cover_photo} alt="sample87" />
                 <figcaption>
                     <h2>{this.props.course.category}<span></span></h2>
                     
                 <p>{this.props.course.name}</p>
                 </figcaption>
                 </figure>
           </div> 
        )
    }
}

export default UserTemplate;