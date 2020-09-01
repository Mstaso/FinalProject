
// course actions
export const getCourses = () => {
    return function (dispatch) {
        fetch("http://localhost:3000/api/v1/courses")
        .then(resp => resp.json())
        .then(data => dispatch({ type: "fetched courses", payload: data}))
    }  
}

// business actions
export const getBusinesses = () => {
    return function (dispatch) {
        fetch("http://localhost:3000/api/v1/businesses")
        .then(resp => resp.json())
        .then(data => dispatch({ type: "fetched businesses", payload: data}))
    }  
}

// user actions
export const getUsers = () => {
    return function (dispatch) {
        fetch("http://localhost:3000/api/v1/users")
        .then(resp => resp.json())
        .then(data => dispatch({ type: "fetched users", payload: data}))
    }  
}


export const userSignUp = (userObj) => ({type: "userSignUp", payload: userObj})


// usercourse actions
export const getUsercourses = () => {
    return function (dispatch) {
        fetch("http://localhost:3000/api/v1/user_courses")
        .then(resp => resp.json())
        .then(data => dispatch({ type: "fetched usercourses", payload: data}))
    }  
}

// match actions
export const getMatches = () => {
    return function (dispatch) {
        fetch("http://localhost:3000/api/v1/matches")
        .then(resp => resp.json())
        .then(data => dispatch({ type: "fetched matches", payload: data}))
    }  
}


// export const userSignUp = (userObj) => {
//     console.log(userObj)
//     return function(dispatch) {}
// }

// ({type: "userSignUp", payload: userObj})

// = (userObj) => {
//     return function (dispatch) {
//         console.log(userObj)
//        dispatch({ type: "userSignUp"})
//     }  
// }