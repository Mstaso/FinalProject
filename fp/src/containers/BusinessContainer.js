import React from 'react'
import Business from '../components/Business'

class BusinessContainer extends React.Component {

    render(){
        console.log(this.props)
        let businesses = this.props.businesses.map(business => <Business key={business.id} business={business}/>)
        return(
            <div>
                {businesses}
            </div>
        )
    }
}

export default BusinessContainer;