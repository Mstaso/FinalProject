import React from 'react'
import { connect } from 'react-redux'
import { searchAction } from '../redux/actions'
import { withRouter } from 'react-router-dom'

class Search extends React.Component {

    state = {
        searchValue: ""
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.searchNow(this.state.searchValue)
        this.props.history.push("/courses");
        // this.setState({
        //     searchValue: ""
        // })
    } 

    changeHandler = (e) => {
       this.setState({
        searchValue: e.target.value
       })
    }
    render() {
        return (
            <div className="searchContainer">
            <form onSubmit={this.submitHandler}>
                <input id="searchInput" placeholder="Search Course" value={this.state.searchValue} name="searchValue" onChange={this.changeHandler}/>
            </form>
        </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {courses: state.searchValue}
    }

const mapDispatchToProps = (dispatch) => {
    return { searchNow: (searchValue) => dispatch(searchAction(searchValue)) }
  } 
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));