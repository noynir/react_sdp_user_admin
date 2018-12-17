import React, { Component } from 'react';
import User from './users/User/User';
import EditUser from './users/EditUser/EditUser';

const USER = {
  id:2,
  username:'johnDoe',
  email:'johndoe@gmail.com'
}
class Ex1 extends Component {

  constructor(){
    super();
    this.state = {
      user: {...USER}
    }
  }
  render() { 

   
    return (
      <div className="App">
          
        <h1>User Admin</h1>
        <hr></hr>
        <EditUser user={this.state.user} 
          onSave={(user) => this.saveUser(user) } ></EditUser>
        <User user={this.state.user} ></User>
      
      </div>
    );
  }

  saveUser(user){
    this.setState({ user });
  }
}

export default Ex1;
