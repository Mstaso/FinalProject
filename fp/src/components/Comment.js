import React from 'react'
import { connect } from 'react-redux'

class Comment extends React.Component {

    state = {
        content: ''
    }
    changeHandler = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

   commentHandler = (e) => {
       e.preventDefault()
        this.props.commentCreater(this.state.content)
   } 

    render (){
        return(
           
                 
                <p>{this.props.comment.content}</p>  
                
          
        )
    }
}

export default Comment;