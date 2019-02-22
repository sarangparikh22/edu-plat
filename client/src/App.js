import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import RegisterForm from './components/RegisterForm';
import Home from './components/Home';
import Login from './components/Login';
import Error from './components/Error';
import Navigation from './components/Navigation';

const auth = {
  isToken: false
}

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props)=>(
    auth.isToken ? <Component {...props} /> : <Redirect to="/login" />
  )} />
)

class App extends Component {
  constructor(props){
    super(props);
    this.handleLoginForm = this.handleLoginForm.bind(this);
    this.handleRegForm = this.handleRegForm.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);

    this.state = {
      title: "Registration Form",
      token: ""
    }
  }
  componentWillMount(){
    this.setState(()=>{
      return {
        token: localStorage.getItem('token')
      }
    })
    auth.isToken = localStorage.getItem('isToken');
  }
  componentDidUpdate(){
    localStorage.setItem('isToken', auth.isToken);
    localStorage.setItem('token', this.state.token);
  }

  handleLoginForm(e){
    e.preventDefault();
    if(e.target.elements.username.value && e.target.elements.password.value){
      console.log('Checking Username and Password');
      axios.post('http://localhost:5000/login',{"username": e.target.elements.username.value, "password":e.target.elements.password.value})
      .then((response) => {
        if(!response.data.message){
          // console.log(response.data.token);
          auth.isToken = true;
          this.setState(()=>{
            return{
              token: response.data.token
            }
          })
        }else{
          console.log(response.data.message);
        }
      })
    }else{
      console.log('Please Enter Username and Password');
    }
  }
  
  handleRegForm(e){
    e.preventDefault();
    if(e.target.elements.username.value && e.target.elements.password.value){
      console.log('Registering User....');
      axios.post('http://localhost:5000/register',{"username": e.target.elements.username.value, "password":e.target.elements.password.value})
      .then((response) => {
        if(response.data.message){
          console.log(response.data.message);
        }
      })
    }else{
      console.log('Please Enter Username and Password');
    }
  }

  handleLogOut(){
    // localStorage.setItem('isToken', false);
    // localStorage.setItem('token',"");
    auth.isToken = false;
    this.setState(()=>{
      return{
        token: ""
      }
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div>
        <Navigation isLoggedIn = {auth.isToken}/>
          <Switch>
            <PrivateRoute exact path="/" component={() => 
              <Home token = {this.state.token} logOut = {this.handleLogOut}/>
             } />
            <PrivateRoute path="/home" component={() => 
              <Home token = {this.state.token} logOut={this.handleLogOut}/>
            } />
            <Route path="/register" component={
              () => <RegisterForm handleRegForm = {this.handleRegForm}/>
            } />
            <Route path="/login" component={
              () => <Login token = {this.state.token} handleLoginForm = {this.handleLoginForm} />
            } />
            <Route exact component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
