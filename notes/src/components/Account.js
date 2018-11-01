import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {authCheck, getUserInfo, changeUserName, changeUserPassword} from '../actions/index';

class Account extends React.Component {

    componentDidMount(){
        const id = localStorage.getItem('user_id');
        this.props.getUserInfo(id);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.currentUser !== this.props.currentUser){
            this.setState({
                username: nextProps.currentUser.username,
            })
        }
    }

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password1: '',
            password2: ''
        }
    }

    // methods
    handleInput = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleDelete = event => {
        // call delete user action
    }

    handleNameChange = event => {
        // call the name change action
        event.preventDefault();
        const id = localStorage.getItem('user_id');
        const newName = {
            username: this.state.username
        }

        this.props.changeUserName(id, newName);
    }

    handlePasswordChange = event => {
        // call the password change action
    }

    render(){
        console.log(this.state.username);
        return(
            <div className = 'account'>
            <div className = 'user-details'>
            <h1>Account Information</h1>
            <h2>Username: {this.props.currentUser.username}</h2>
            <h3>User ID: {this.props.currentUser.id}</h3>
            <h3>Account Type: {this.props.currentUser.privileges}</h3>
            </div>

            <div className = 'change-username'>
            <form onSubmit = {this.handleNameChange}>
                Change Username
                <input type = 'text' name='username' onChange = {this.handleInput} value = {this.state.username}></input>
                <button type = 'submit'>Submit</button>
            </form>
            </div>

            <div className = 'change-password'>
            Change Password
                <form>
                    Please type your new password into each field.
                    <input type = 'password' name = 'password1' onChange = {this.handleInput}></input>
                    <input type = 'password' name = 'password2' onChange = {this.handleInput}></input>
                </form>
            </div>

            <div className = 'delete-user'></div>
            
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
      isLoggedIn: state.isLoggedIn,
      currentUser: state.currentUser,
    }
  }

export default withRouter(connect(mapStateToProps, {
    authCheck,
    getUserInfo,
    changeUserName,
    changeUserPassword
})(Account));



  