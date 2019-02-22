import React from 'react';
import {Redirect}  from 'react-router-dom';

export default class Login extends React.Component{

    render(){
        if(this.props.token){
            return <Redirect to="/home" />
        }
        return(
            <div>
                <h3>Login</h3>
                <form onSubmit={(e) => this.props.handleLoginForm(e)}>
                    <label>Username</label>
                    <input type="text" name="username" /><br />
                    <label>Password</label>
                    <input type="password" name="password" /><br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}