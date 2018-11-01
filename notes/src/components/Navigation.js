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
            
      <Link to ='/login'>
      <div className = 'nav-link'>
      Login
      </div>
      </Link>

      
    <Link to = '/register'><div className = 'nav-link'>Register</div></Link>
      
            </div>
        )
    } else {
    return (
        <div className = 'navigation'>
      
      <Link to ='/'>
      <div className = 'nav-link' onClick={this.clearSearch}>
      Home
      </div>
      </Link>

      <Link to='/form'>
      <div className = 'nav-link'>
      Add Note
      </div>
      </Link>


      <Link to = '/account'><div className = 'nav-link'>
      My Account
      </div></Link>

      <div className = 'nav-link' onClick={this.handleLogout}>
      Logout
      </div>

      <div className = 'search-bar'>
      <input type = 'search' placeholder='Search...' value = {this.state.search} onChange = {this.handleSearchInput} ></input>
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
  