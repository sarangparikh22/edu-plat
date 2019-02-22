import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';


export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.checkToken = this.checkToken.bind(this);
        this.state = {
            username: undefined,
            wallet: undefined,
            error: false
        }
    }
    checkToken(){
        axios.get('http://localhost:5000/home', { headers: {"Authorization" : `Bearer ${this.props.token}`} })
        .then((response) => {
            if(response){
                // console.log(response);
                this.setState(()=>{
                    return{
                        username: response.data.username,
                        wallet: response.data.wallet
                    }  
                })
            }
        }).catch(e => this.props.logOut())
    }
    
    componentWillMount(){
        this.checkToken();
    }
    
    render(){
        
        return(
            <div>
                <p>Welcome {this.state.username} Wallet {JSON.stringify(this.state.wallet)}</p>
                <button onClick={this.props.logOut}>Log Out</button>
            </div>
        );
    }
}