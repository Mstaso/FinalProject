import React from 'react'
import Business from '../components/Business'
import {Route, Switch} from 'react-router-dom'

class BusinessContainer extends React.Component {

    render(){
        console.log(this.props)
        let businesses = this.props.businesses.map(business => <Business key={business.id} business={business}/>)
        return (
            <>
            {this.props.businesses.length === 0 ? <h1>Loading</h1>: 
            
            <>
            <Switch>
                <Route path='/businesses/:id' render={({ match }) => {
                    let id = parseInt(match.params.id)
                    let foundBusiness = this.props.businesses.find((business)=> business.id === id)
                    return <Business foundBusiness={foundBusiness}/>
                }}/>
                <Route path="/businesses" render={() => {

                    return (
                        <>
                            {
                                this.props.businesses.length === 0 ? <h1>Loading</h1> :
                                <>
                                {businesses}
                                </>
                            }
                        
                        
                        </>
                    )
                }} />
                <Route path="/home" render={() => {

                    return (
                        <>
                            {
                                this.props.businesses.length === 0 ? <h1>Loading</h1> :
                                <>
                                {businesses}
                                </>
                            }
                        
                        
                        </>
                    )
                }} />
            </Switch>       
            </>
            
            
            }
            </>
        )
    }
}

export default BusinessContainer;