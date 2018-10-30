import React from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {register} from '../actions/index'

class Register extends React.Component {
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

    handleRegister = event => {
        event.preventDefault();
        let user = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.register(user);

        setTimeout(() => this.props.history.push('/'), 1500);
    }


    render() {
        return (
            <div className = 'login-container'>
            <h1>Register</h1>
            <form onSubmit = {this.handleRegister}>
            <input type = 'text' name='username' value={this.state.username} onChange={this.handleInput} placeholder='Username'></input>
            <input type = 'password' name = 'password' value={this.state.password} onChange={this.handleInput} placeholder='Password'></input>
            <button type = 'submit'>Register</button>
            </form>
    
            <p>Already have an account? Login <NavLink to = '/login'>here!</NavLink></p>
    
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}


export default withRouter(connect(mapStateToProps, {
    register
})(Register));