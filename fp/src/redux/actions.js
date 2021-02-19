
// course actions
export const getCourses = () => {
    return function (dispatch) {
        fetch("http://localhost:3000/api/v1/courses")
        .then(resp => resp.json())
        .then(data => dispatch({ type: "fetched courses", payload: data}))
    }  
}

export const singleCourse = (id) => {
    return function (dispatch) {
        fetch(`http://localhost:3000/api/v1/courses/${id}`)
        .then(resp => resp.json())
        .then(data => dispatch({ type: "fetched courses", payload: data}))
    }  
}

export const setCourses = (data) => ({type: "fetched courses", payload: data})

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
        .then(data => {
            dispatch({ type: "fetched users", payload: data})
           
        })
            
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

export const addUC = (ucObj) => ({type: "addUC", payload: ucObj})

export const createUserCourse = (ucObj) => {
    return (dispatch) => fetch("http://localhost:3000/api/v1/user_courses", {
        method: 'POST',
        headers: {
            'accepts': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify({usercourse: ucObj})
    })
    .then(resp => resp.json())
    .then(data => {
        // if (data.status !== 401) {
            
        // }
    })
}

export const userCoursePatcher = (ucId) => {
    return (dispatch) => fetch(`http://localhost:3000/api/v1/user_courses/${ucId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                 'accepts': 'application/json',
              },
            body: JSON.stringify({ usercourse: {
                complete: true
            }})
        })
        .then(response => response.json())
        .then(data => {
            if (data.status !==401) {
                dispatch(getUsers())    
            }
        })
}

// match actions

export const matchPost = (matchObj) => {
      return (dispatch) => fetch('http://localhost:3000/api/v1/matches', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
             'accepts': 'application/json',
          },
        body: JSON.stringify({ match: matchObj })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status !== 401) {
         dispatch(getBusinesses())
        }
     })
     
    
     
}
// Search Actions
export const searchAction = (searchValue) => ({type: "search", payload: searchValue})

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


// Comments Actions

export const postComment = (commentObj) => {
   return (dispatch) => fetch('http://localhost:3000/api/v1/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
             'accepts': 'application/json',
          },
        body: JSON.stringify({ comment: commentObj})
    })
    .then(response => response.json())
    .then(data => {
    //    if (data.status !== 401) {
    //     dispatch(getCourses())
    //    }
    })
}

// Category Actions
export const setCategory = (category) => ({type: "set category", payload: category})

// Subcategory
export const setSubcategory = (subcategory) => ({type: "set subcategory", payload: subcategory})
