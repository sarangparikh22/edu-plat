import React from 'react';
import {NavLink} from 'react-router-dom';


export default class Navigation extends React.Component{
    render(){
        return(
            <div>
                <ul>
                    <li><NavLink to="/home">Home</NavLink></li>
                    {this.props.isLoggedIn ? "" : <li><NavLink to="/login">Login</NavLink></li>}
                    {this.props.isLoggedIn ? "" : <li><NavLink to="/register">Register</NavLink></li>}
                </ul>
            </div>
        );
    }
}