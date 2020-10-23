import { combineReducers } from 'redux'


const defaultState = {
    courses: [],
    businesses: [],
    users: [],
    usercourses: [],
    loggedInUser: {},
    searchValue: "", 
    category: "all"
}

function courseReducer(currentState = defaultState.courses, action){
    switch (action.type) {
        case  "fetched courses" :
            return action.payload
        default :   
            return currentState  
    }
}
function categoryReducer(currentState = defaultState.courses, action){
    switch (action.type) {
        case  "set category" :
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

function userCourseReducer(currentState = defaultState.usercourses, action){
    switch (action.type) {
        case "fetched usercourses" :
            return action.payload
        case "addUC" :
            return [...currentState, action.payload]    
        default :
            return currentState
    }
}

function searchReducer(currentState = defaultState.searchValue, action){
    switch (action.type) {
        case  "search" :
            return action.payload
        default :   
            return currentState  
    }
}    

const rootReducer = combineReducers({
    courses: courseReducer,
    businesses: businessReducer,
    users: userReducer,
    loggedInUser: loggedInUserReducer,
    usercourses: userCourseReducer,
    searchValue: searchReducer,
    category: categoryReducer
})

export default rootReducer