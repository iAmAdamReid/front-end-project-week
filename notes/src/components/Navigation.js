import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {authCheck, logout, search} from '../actions/index';


class Navigation extends React.Component {

constructor(props){
    super(props)

    this.state = {
        search: ''
    }
}

handleSearchInput = event => {
    event.preventDefault();

    // use async callback to encapsulate the entire search term
    this.setState({
      ...this.state,
      search: event.target.value
    }, () => {
        this.props.search(this.props.notes, this.state.search);
    });
  }

  clearSearch = () => {
    this.setState({
      search: ''
    })
  }

  handleLogout = event => {
    event.preventDefault();
    this.props.logout();
  }

render(){
    if(!this.props.isLoggedIn){
        return (
            <div className = 'navigation'>
            <h1>Lambda Notes</h1>
      <Link to ='/login'>
      <div className = 'nav-link'>
      Login
      </div>
      </Link>      
            </div>
        )
    } else {
    return (
        <div className = 'navigation'>
      <h1>Lambda Notes</h1>
      <Link to ='/'>
      <div className = 'nav-link' onClick={this.clearSearch}>
      View Your Notes
      </div>
      </Link>

      <Link to='/form'>
      <div className = 'nav-link'>
      + Create New Note
      </div>
      </Link>

      <div className = 'nav-link' onClick={this.handleLogout}>
      Logout
      </div>

      <div className = 'search-bar'>
      <input type = 'text' placeholder='Search...' value = {this.state.search} onChange = {this.handleSearchInput} ></input>
      </div>
      </div>
    )
    }
}
}

const mapStateToProps = state => {
    return {
      notes: state.notes,
      isLoggedIn: state.isLoggedIn,
      currentUser: state.currentUser,
      userToken: state.userToken,
      searchNotes: state.searchNotes
    }
  }
  
  export default withRouter(connect(mapStateToProps, {
    authCheck,
    logout,
    search
  })(Navigation));
  