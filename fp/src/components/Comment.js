import React from 'react'

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
           
                <div class="comment-content" id={this.props.comment.id}>
                <p>{this.props.comment.content}</p>  
                </div> 
          
        )
    }
}

export default Comment;