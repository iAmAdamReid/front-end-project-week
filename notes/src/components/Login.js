import React from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {login} from '../actions/index'

class Login extends React.Component {

    componentWillReceiveProps(nextProps){
        if(nextProps.isLoggedIn){
            this.props.history.replace('/')
        } else if(nextProps.loginFailure){
            window.alert('Bad User Credentials')
        }
    }

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleInput = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleLogin = event => {
        event.preventDefault();
        let user = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.login(user);
    }


    render() {
        return (
            <div className = 'login-container'>
            <h1>Log In</h1>
            <form onSubmit = {this.handleLogin}>
            <input type = 'text' name='username' value={this.state.username} onChange={this.handleInput} placeholder='Username'></input>
            <input type = 'password' name = 'password' value={this.state.password} onChange={this.handleInput} placeholder='Password'></input>
            <button type = 'submit'>Login</button>
            </form>
    
            <p>New user? Create an account <NavLink to = '/register'>here!</NavLink></p>
    
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        userToken: state.userToken,
        isLoggedIn: state.isLoggedIn,
        loginFailure: state.loginFailure
    }
}


export default withRouter(connect(mapStateToProps, {
    login
})(Login));