import React from 'react'
import Business from '../components/Business'
import {Route, Switch} from 'react-router-dom'
import { connect } from 'react-redux'
import { getBusinesses } from '../redux/actions'

class BusinessContainer extends React.Component {

    componentDidMount(){
        this.props.fetchBusinesses()
    }

    displayOtherBusinesses(foundBusiness) {
        let otherBusinesses = this.props.businesses.filter(business => business.id !== foundBusiness.id)
        let mappedOtherBusinesses = otherBusinesses.map(business => <Business key={business.id} business={business}/>)
        return mappedOtherBusinesses
    }

    render(){
        let businesses = this.props.businesses.map(business => <Business key={business.id} business={business}/>)
        return (
            <>
            {this.props.businesses.length === 0 ? <h1>Loading</h1>: 
            
            <>
            <Switch>
                <Route path='/businesses/:id' render={({ match }) => {
                    let id = parseInt(match.params.id)
                    let foundBusiness = this.props.businesses.find((business)=> business.id === id)
                    return (
                        <div>
                        
                        <div id="Other-Businesses">
                            <h3>Related Businesses</h3>
                        {this.displayOtherBusinesses(foundBusiness)}
                        </div>
                        <div id="main-business">
                        <Business foundBusiness={foundBusiness}/>
                        </div>
                        </div>
                        )
                }}/>
                <Route path="/businesses" render={() => {

                    return (
                        <>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>  
                        <br></br>
                        <br></br>
                            {
                                
                                this.props.businesses.length === 0 ? <h1>Loading</h1> :
                                <div id="columns">
                                {businesses}
                                </div>
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

const mapStateToProps = (state) => {
    return {businesses: state.businesses}
    }
  const mapDispatchToProps = (dispatch) => {
    return { fetchBusinesses: ()=> dispatch(getBusinesses())}
  } 
  
  export default connect(mapStateToProps, mapDispatchToProps)(BusinessContainer);