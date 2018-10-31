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
    CLEAR_SEARCH
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
                isLoggingIn: true
            })

        case LOGGED_IN:
            return Object.assign({}, state, {
                isLoggingIn: false,
                isLoggedIn: true,
                userToken: action.payload.token,
                currentUserName: action.payload.username,
                currentUserId: action.payload.user_id
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

        default:
            return state;
    }
}