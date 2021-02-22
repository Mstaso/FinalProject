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
        let mappedOtherBusinesses = otherBusinesses.map(business => <Business key={business.id} otherBusiness={business}/>)
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
                        
                        <div class="other-elements">
                            <h4>Related Businesses</h4>
                        {this.displayOtherBusinesses(foundBusiness)}
                        </div>
                        <Business foundBusiness={foundBusiness}/>
                        </div>
                    //     <div>
                    //     <div class="other-elements">
                    //         <h4>Other Users</h4>
                    // {mappedOtherUsers}   
                    //     </div>     
                    // <User userCourseCompleter={this.userCourseCompleter} foundUser={data} />
                    // </div>
                        )
                }}/>
                <Route path="/businesses" render={() => {

                    return (
                        <div class="business-index">
                            {
                                
                                this.props.businesses.length === 0 ? <h1>Loading</h1> :
                                <div class="row">
                                {businesses}
                                </div>
                            }
                        
                        
                        </div>
                    )
                }} />
                <Route path="/home" render={() => {

                    return (
                        <div class="row">
                            {
                                this.props.businesses.length === 0 ? <h1>Loading</h1> :
                                <>
                                {businesses}
                                </>
                            }
                        
                        
                        </div>
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