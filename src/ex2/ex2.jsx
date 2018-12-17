import React, { Component } from 'react';
import User from './users/User/User';
import EditUser from './users/EditUser/EditUser';
import UserList from './users/UserList';

const API_URL = "http://localhost:3001/users";
const USER = {
  id:2,
  username:'johnDoe',
  email:'johndoe@gmail.com'
}

class Ex2 extends Component {

  constructor(){
    super();
    this.state = {
      user: {...USER},
      users: [],
      selectedIndex:-1
    }
  }

  async componentDidMount(){

    const users = await fetch(API_URL)
      .then((res) =>  res.json());

    this.setState({ users });

  }

  render() { 

    const selectedUser = this.state.selectedIndex >= 0 ? 
      this.state.users[this.state.selectedIndex] :
      null;

    return (
      <div className="App">
          
        <h1>User Admin</h1>
        <hr></hr>
        { selectedUser ? 
            <EditUser user={selectedUser}
              key={selectedUser.id } 
              onSave={(user) => this.saveUser(user) } ></EditUser> : ''
        }
        <UserList
          users={ this.state.users } 
          selectedIndex={ this.state.selectedIndex }
          onSelected={(inx) => this.handleSelected(inx) }
          ></UserList>
      </div>
    );
  }

  handleSelected(selectedIndex) {

    this.setState({ selectedIndex });
  }
  async saveUser(user){

    await fetch(`${API_URL}/${user.id}`, {
      method:'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(user)
    }).then( res => res.json());
    const users = [ ...this.state.users];
    users[this.state.selectedIndex] = user;
    this.setState({ users });
  }
}

export default Ex2;
