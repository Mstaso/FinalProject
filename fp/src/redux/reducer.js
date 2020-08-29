import { combineReducers } from 'redux'


const defaultState = {
    courses: [],
    businesses: [],
    users: [],
    loggedInUser: {}
}

function courseReducer(currentState = defaultState.courses, action){
    switch (action.type) {
        case  "fetched courses" :
            return action.payload
        default :   
            return currentState  
    }
}

function businessReducer(currentState = defaultState.businesses, action){
    switch (action.type) {
        case  "fetched businesses" :
            return action.payload
        default :   
            return currentState  
    }
}

function userReducer(currentState = defaultState.users, action){
    switch (action.type) {
        case  "fetched users" :
            return action.payload
        default :   
            return currentState  
    }
}

function loggedInUserReducer(currentState = defaultState.loggedInUser, action){
    switch (action.type) {
        case  "userSignUp" :
            return action.payload
        default :   
            return currentState  
    }
}

const rootReducer = combineReducers({
    courses: courseReducer,
    businesses: businessReducer,
    users: userReducer,
    loggedInUser: loggedInUserReducer
})

export default rootReducer