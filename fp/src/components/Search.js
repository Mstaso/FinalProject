import React from 'react'
import { connect } from 'react-redux'
import { searchAction } from '../redux/actions'
import { withRouter } from 'react-router-dom'

class Search extends React.Component {

    state = {
        searchValue: ""
    }

    // changeHandler = (e) => {
    //     e.preventDefault()
    //     this.props.searchNow(this.state.searchValue)
    //     this.props.history.push("/courses");
    // } 

    changeHandler = (e) => {
       this.setState({
        searchValue: e.target.value
       })
       this.props.searchNow(this.state.searchValue)
       this.props.handleSearch(this.state.searchValue)
    }
    render() {
        return (
            <div className="searchContainer">
            <form onChange={this.changeHandler}>
                <input id="searchInput" placeholder="Search All Courses" value={this.state.searchValue} name="searchValue" onChange={this.changeHandler}/>
            </form>
        </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return { searchNow: (searchValue) => dispatch(searchAction(searchValue)) }
  } 
  
  export default withRouter(connect(null, mapDispatchToProps)(Search));