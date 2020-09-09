import React from 'react'


class Match extends React.Component {

    render () {
        return (
            <div>
                <h5>{this.props.match.user_name}</h5>
                <p>{this.props.match.match_percentage}% </p>
            </div>
        )
    }
}

export default Match;