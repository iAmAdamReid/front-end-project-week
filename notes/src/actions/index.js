import axios from 'axios';

export const FETCHED = 'FETCHED';
export const FETCHING = 'FETCHING';
export const POSTED = 'POSTED';
export const POSTING = 'POSTING';
export const ERROR = 'ERROR';
export const DELETING = 'DELETING';
export const DELETED = 'DELETED';
export const EDITING = 'EDITING';
export const EDITED = 'EDITED';
export const FETCHING_SINGLE = 'FETCHING_SINGLE';
export const FETCHED_SINGLE = 'FETCHED_SINGLE';
export const LOGGING_IN = 'LOGGING_IN';
export const LOGGED_IN = 'LOGGED_IN';
export const AUTH_TRUE = 'AUTH_TRUE';
export const AUTH_FALSE = 'AUTH_FALSE';
export const LOGGING_OUT = 'LOGGING_OUT';
export const LOGGED_OUT = 'LOGGED_OUT';

// this will run before all component mountings
export const authCheck = (jwt) => {
    if(jwt){
        return dispatch => {
            dispatch({type: AUTH_TRUE})
        }
    } else {
        return dispatch => {
            dispatch({type: AUTH_FALSE})
        }
    }
}


export const fetchNotes = () => {
    const token = localStorage.getItem('jwt');
    const options = {
        headers: {
            Authorization: token,
        },
    }
    const endpoint = `http://localhost:9000/api/notes`;
    const fetchAllRequest = axios.get(endpoint, options);

    return dispatch => {
        dispatch({type: FETCHING})

        fetchAllRequest.then(res => {
            dispatch({type: FETCHED, payload: res.data})
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}

export const addNote = note => {

    const token = localStorage.getItem('jwt');
    const options = {
        headers: {
            Authorization: token,
        },
    }
    const endpoint = `http://localhost:9000/api/notes`;
    
    const addNoteRequest = axios.post(endpoint, note, options);

    return dispatch => {

        dispatch({type: POSTING});

        addNoteRequest.then(res => {
            dispatch({type: POSTED, payload: res.data})
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        });

    }
   
}

export const deleteNote = id => {

    const token = localStorage.getItem('jwt');
    const options = {
        headers: {
            Authorization: token,
        },
    }
    const endpoint = `http://localhost:9000/api/notes/${id}`;

    const deleteNoteRequest = axios.delete(endpoint, options);

    return dispatch => {

        dispatch({type: DELETING});

        deleteNoteRequest.then(res => {
            dispatch({type: DELETED, payload: res.data})
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}

export const editNote = (id, newNote) => {

    const token = localStorage.getItem('jwt');
    const options = {
        headers: {
            Authorization: token,
        },
    }
    const endpoint = `http://localhost:9000/api/notes/${id}`;

    const editNoteRequest = axios.put(endpoint, newNote, options);

    return dispatch => {

        dispatch({type: EDITING});

        editNoteRequest.then(res => {
            dispatch({type: EDITED, payload: res.data})
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}

export const fetchSingleNote = (id) => {

    const token = localStorage.getItem('jwt');
    const options = {
        headers: {
            Authorization: token,
        },
    }
    const endpoint = `http://localhost:9000/api/notes/${id}`;


    const fetchSingleRequest = axios.get(endpoint, options);

    return dispatch => {
        dispatch({type: FETCHING_SINGLE});

        fetchSingleRequest.then(res => {
            dispatch({type: FETCHED_SINGLE, payload: res.data})
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}

export const login = (user) => {
    const sendUserLogin = axios.post(`http://localhost:9000/api/users/login`, user);

    return dispatch => {
        dispatch({type: LOGGING_IN});

        sendUserLogin.then(res => {
            localStorage.setItem('jwt', res.data.token);
            localStorage.setItem('user_id', res.data.user_id);
            dispatch({type: LOGGED_IN, payload: res.data})
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}

export const logout = () => {
    return dispatch => {
        dispatch({type: LOGGING_OUT});

        localStorage.removeItem('jwt');
        localStorage.removeItem('user_id');
        
        dispatch({type: LOGGED_OUT});

        window.location.reload();
    }


}

export const register = (user) => {
    const sendUserRegistration = axios.post(`http://localhost:9000/api/users/register`, user);

    return dispatch => {
        dispatch({type: LOGGING_IN});

        sendUserRegistration.then(res => {
            localStorage.setItem('jwt', res.data.token);
            localStorage.setItem('user_id', res.data.user_id);
            dispatch({type: LOGGED_IN, payload: res.data})
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}