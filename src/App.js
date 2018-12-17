import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
// import Ex1 from './ex1/ex1';
import Ex2 from './ex2/ex2';

const USER = {
  id:2,
  username:'johnDoe',
  email:'johndoe@gmail.com'
}
class App extends Component {

  constructor(){
    super();
    this.state = {
      user: {...USER}
    }
  }
  render() { 
    return (
      // <Ex1></Ex1>
      <Ex2></Ex2>
    );
  }
}

export default App;
