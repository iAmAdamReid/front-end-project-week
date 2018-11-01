import {
    FETCHING, 
    FETCHED, 
    POSTING, 
    POSTED, 
    FETCHING_SINGLE, 
    FETCHED_SINGLE, 
    EDITING, 
    EDITED, 
    DELETING, 
    DELETED, 
    ERROR, 
    LOGGING_IN, 
    LOGGED_IN, 
    AUTH_TRUE, 
    AUTH_FALSE,
    LOGGING_OUT,
    LOGGED_OUT,
    SEARCH,
    CLEAR_SEARCH,
    LOGIN_FAILURE,
    REGISTER_FAILURE,
    FETCHING_USER,
    FETCHED_USER,
    CHANGING_NAME,
    CHANGING_PASSWORD,
    NAME_CHANGED,
    PASSWORD_CHANGED
} from '../actions/index';

const initialState = {
    fetchingNotes: false,
    notesFetched: false,
    postingNote: false,
    notePosted: false,
    error: null,
    notes: [],
    searchNotes: [],
    deletingNote: false,
    noteDeleted: false,
    editingNote: false,
    noteEdited: false,
    fetchingSingle: false,
    singleFetched: false,
    currentNote: {},
    needsRefresh: false,
    isLoggingIn: false,
    isLoggedIn: false,
    userToken: '',
    currentUserName: 'Guest',
    currentUserId: 0,
    loggingOut: false,
    loggedOut: true,
    isSearch: false,
    loginFailure: false,
    registerFailure: false,
    fetchingUser: false,
    fetchedUser: false,
    currentUser: {},
    changingName: false,
    nameChanged: false,
    changingPassword: false,
    passwordChanged: false
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCHING:
            return Object.assign({}, state, {
                fetchingNotes: true
            })

        case FETCHED:
            return Object.assign({}, state, {
                fetchingNotes: false, 
                notesFetched: true,
                notes: action.payload,
                currentNote: {},
                singleFetched: false
            })

        case POSTING:
            return Object.assign({}, state, {
                postingNote: true
            })

        case POSTED:
            let newNotes = state.notes.map(note => {
                return note;
            });

            return Object.assign({}, state, {
                notePosted: true, 
                postingNote: false, 
                notes: newNotes
            })

        case DELETING:
            return Object.assign({}, state, {
                deletingNote: true
            })

        case DELETED:
            return Object.assign({}, state, {
                deletingNote: false, noteDeleted: true, needsRefresh: true
            })

        case ERROR:
            return Object.assign({}, state, {
                error: "Operation failed."
            })
        
        case EDITING:
            return Object.assign({}, state, {
                editingNote: true
            })

        case EDITED:
            let updatedNotes = state.notes.map(note => {
                return note;
            });
            return Object.assign({}, state, {
                editingNote: false, 
                noteEdited: true,
                notes: updatedNotes
            })

        case FETCHING_SINGLE:
            return Object.assign({}, state, {
                fetchingSingle: true
            })

        case FETCHED_SINGLE:
            return Object.assign({}, state, {
                fetchingSingle: false,
                singleFetched: true,
                currentNote: action.payload
            })

        case LOGGING_IN:
            return Object.assign({}, state, {
                isLoggingIn: true,
                loginFailure: false
            })

        case LOGGED_IN:
            return Object.assign({}, state, {
                isLoggingIn: false,
                isLoggedIn: true,
                loginFailure: false,
                registerFailure: false,
                userToken: action.payload.token,
                currentUserName: action.payload.username,
                currentUserId: action.payload.user_id
            })

        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                loginFailure: true,
                isLoggingIn: false
            })

        case REGISTER_FAILURE:
            return Object.assign({}, state, {
                registerFailure: true,
                isLoggingIn: false,
            })

        case AUTH_TRUE:
            return Object.assign({}, state, {
                isLoggedIn: true
            })

        case AUTH_FALSE:
            return Object.assign({}, state, {
                isLoggedIn: false
            })

        case LOGGING_OUT:
            return Object.assign({}, state, {
                loggingOut: true
            })

        case LOGGED_OUT:
            return Object.assign({}, state, {
                loggingOut: false,
                loggedOut: true,
                isLoggedIn: false,
                userToken: '',
                currentUserName: 'Guest',
                currentUserId: 0
            })

        case SEARCH:
            return Object.assign({}, state, {
                searchNotes: action.payload,
                isSearch: true
            })

        case CLEAR_SEARCH: 
            return Object.assign({}, state, {
                isSearch: false,
                searchNotes: action.payload
            })

        case FETCHING_USER:
            return Object.assign({}, state, {
                fetchingUser: true
            })

        case FETCHED_USER:
            return Object.assign({}, state, {
                fetchingUser: false,
                fetchedUser: true,
                currentUser: action.payload
            })

        case CHANGING_NAME:
        return Object.assign({}, state, {
            changingName: true
        })

        case NAME_CHANGED:
        return Object.assign({}, state, {
            changingName: false,
            nameChanged: true
        })

        case CHANGING_PASSWORD:
        return Object.assign({}, state, {
            changingPassword: true
        })

        case PASSWORD_CHANGED:
        return Object.assign({}, state, {
            passwordChanged: true,
            changingPassword: false
        })

        default:
            return state;
    }
}