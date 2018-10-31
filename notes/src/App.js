import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {fetchNotes, authCheck, logout} from './actions/index';
import { connect } from 'react-redux';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import NoteEdit from './components/NoteEdit'
import NoteDetails from './components/NoteDetails';
import NoteTags from './components/NoteTags';
import Login from './components/Login';
import Register from './components/Register';
import Navigation from './components/Navigation';


import { Switch, Route, Link, withRouter } from 'react-router-dom';



class App extends Component {


  componentDidMount(){
    this.props.authCheck();
  }

  constructor(props){
    super(props);
  }

  render() {


    // if search, pass search notes
    let currentNotes;
    if(this.props.isSearch){
      currentNotes = this.props.searchNotes;
    } else {
    // else pass all notes
      currentNotes = this.props.notes;
    }


    return (
     <div className='App'>

     <Navigation />
     
      <div className = 'application'>
        <Switch>
          <Route exact path = '/'
          render={(props) => <NoteList {...props} notes={currentNotes} />} />

          <Route exact path = '/login' component = {Login} />
          <Route exact path = '/form' component={NoteForm} />
          <Route exact path='/notes/:id' render={(props) => <NoteDetails {...props} notes={this.props.notes} />} />
          <Route exact path='/notes/edit/:id' render={(props) => <NoteEdit {...props} notes = {this.props.notes} />} />
          <Route exact path = '/notes/tags/:tag' render={(props) => <NoteTags {...props} notes={this.props.notes} />} />
          <Route exact path = '/register' component = {Register} />

        </Switch>
      </div>
      </div>


    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes,
    noteDeleted: state.noteDeleted,
    notesFetched: state.notesFetched,
    needsRefresh: state.needsRefresh,
    isLoggedIn: state.isLoggedIn,
    currentUser: state.currentUser,
    userToken: state.userToken,
    isSearch: state.isSearch,
    searchNotes: state.searchNotes
  }
}

export default withRouter(connect(mapStateToProps, {
  fetchNotes,
  authCheck,
  logout
})(App));
