import React from 'react'

class Search extends React.Component {

    state = {
        searchValue:''
    }
    render() {
        return (
            <div className="searchContainer">
            <form>
                <input id="searchInput" placeholder="Search" value={this.state.searchValue}/>
            </form>
        </div>
        )
    }
}

export default Search 