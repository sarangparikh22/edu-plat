import React from 'react';

export default class RegisterForm extends React.Component{
    render(){
        return (
            <div>
                <h3>Registeration Page</h3>
                <form onSubmit={(e) => this.props.handleRegForm(e)}>
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