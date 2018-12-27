# React User Admin Lab

## step 0

### create react app

- download node and npm
- create your app
    ```sh
    npx create-react-app <app-name>
    ```
- run the app for the first time.
    ```sh
    cd <app-name>
    npm start
    ```

## step 0.5

- in order to make the ui more friendly and neat i will use a third party css package called `bootstrap`.

- add `bootstrap` to your application by run:
    ```sh
    npm i --save bootstrap
    ```
- on the `App.js` add the `bootstrap` css:
    ```jsx
    import 'bootstrap/dist/css/bootstrap.min.css';
    ```

# Exercise 1 - Components Basics
## step 1

### create your first component

- under `src` create new folder, `users`. on that folder create new folder `User` (`src/users/User`).
- in this folder create  `User.jsx` file:

```jsx
/* src/users/User/User.jsx */
import React from 'react'

function User(){

    return (
        <div className="item">
            <div>
                id:1
            </div>
            <div>
                username:johndoe
            </div>
            <div>
                email:johndoe@gmail.com
            </div>
        </div>
    )
}

export default User
```
> don't forget to call to `super()`.
- on the `src/users/User` create new `css` file `user.css`.

```css
/* src/users/User/User.css */
.item{
    width: 300px;
    border-radius: 10px;
    border: solid 1px lightgray;
    padding: 10px;
    text-align: left;
 }
```

- import the `User.css` file from inside the `User.jsx` component.

```jsx
/* src/users/User/User.jsx */
import React, { Component } from 'react'
import './user.css'
...
```

- inside the `App.js` file, import the `User` element.

```jsx
/* src/App.js */
import User from './users/user/User'
```

- update `jsx` returned from the `render` function and return the `User` Element

```jsx
/* src/App.js */
...
render() {
    return (
       <div className="App">
          
        <h1>Users Admin</h1>
        <hr></hr>
        <User></User>
      </div>
    )
}
...
```

## step 2

### pass data from root component to child component.

 on the `User.jsx` file change the hard coded id, username and email to the one that came from a user object recieved as a prop;

```jsx
function User(props) {
    const { user }  = props; 
    return (
        <div className="item">
            <div>
                id:{user.id}
            </div>
            <div>
                username:{user.username}
            </div>
            <div>
                email:{ user.email }
            </div>
        </div>
    )
}
```
- on the `App.js` file pass a hard coded user object with id, username, email to the `User` component.
```jsx
    <User user={user} ></User>
```
## step 3

### stateful components

- under the `src/users` folder create a new component `EditUser.jsx`.
- This component is keeping a local state so it should be a class component.
- the initial state will be setup from a user object passed as a prop.
``` jsx

import React, { Component } from 'react'


class EditUser extends Component {

    constructor(props){
        super(props);
        
        this.state = props.user;
    }

    render(){
        return <div>
            <div className="form-group form-row">
                <div className="col-8">
                    <input className="form-control" 
                        type="text" 
                        name="username" 
                        value={this.state.username}  />
                </div>
            </div> 
            <div className="form-group form-row">
               <div className="col-8">   
                    <input          
                        className="form-control" 
                        type="text" 
                        name="email" 
                        value={this.state.email} />
                        
               </div>
            </div>
            <div className="form-group form-row">
                <button
                    className="btn btn-primary"
                    >Save</button>
             </div>
        </div>
    }
  
}

export default EditUser
```
- add an `onChange` handler to each one of the input fields to update the component's state upon changes of input values.

  ```jsx
    handleChange(event){
        const input = event.target;
        const value = input.value;
        const name = input.name;

        this.setState({ ...this.state, [name]:value })
    }   
  ``` 
  - the component should recieve a `onSave` method prop that should be invoked when the save button is clicked and pass a user object with the updated values.
    ``` jsx
        <div className="form-group form-row">
                <button
                    className="btn btn-primary"
                    onClick={(e) => this.props.onSave(this.state)}
                    >Save</button>
        </div>
    ```
- inside the `App.js` file add the newly created `EditUser.jsx` component and pass the user object as a prop and a `onSave` method the handle the save event.
- the `App.js` component should now the user object as local state and update it when the is updated and saved.
  ``` jsx
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
  ```

# Exercise 2 - Lists, Conditionals & Lifecycle

## step 1
### Lists 

- under the `src/users` folder create a new component `UserList.jsx`
- This component should recieve 3 props
  -  Users array - array of user objects to render.
  -  selectedIndex - (optional) index of the selected list item.  
  -  onSelect method for handling selection event of a user item.
- the component should use the exsiting `User.jsx` component.
-  
```jsx
import React, { Component } from 'react'
import User from '../../ex2/users/User/User';

function UserList(props){
    const users  = props.users || [];
    const { selectedIndex } = props;
    const userElems = users.map( (userItem, inx) => {
        const selected = inx === selectedIndex ? 'active' : ''; 
        return <li 
            onClick={() => props.onSelected(inx) }
            key={userItem.id} 
            className={ `list-group-item ${selected}`} >
            <User user={ userItem } ></User>
        </li>
      }); 

    return (
        <ul className="list-group">
            { userElems }
        </ul>
    )
    
}

export default UserList;
```
## Step 2 

- update the `App.js` so now it will hold the Users list and the selected index as part of it's state.
  ```jsx
    constructor(){
        super();
        this.state = {
            users: [],
            selectedIndex:-1
        }
    }
  ```
- update the `App.js` to render a list of users instead of a single user.
- The `EditUser.jsx` should only be displayed when a user is selected from the list
```jsx
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
```

## Step 3

### Server
- This step requires a local server.
- You will need a package called [json-server](https://github.com/typicode/json-server)
```bash
    npm install -g json-server
```
- copy the [`./data/user.json`](https://github.com/noynir/react_sdp_user_admin/blob/master/data/users.json).
- open a new cmd tab and run the server with the `users.json` file and a new port.
```bash
    json-server ./users.json --port 3001
```
- you now have a running rest api with the following end points:
```
GET    /users
GET    /users/1
POST   /users
PUT    /users/1
PATCH  /users/1
DELETE /users/1
```

## Step 4

### Fetch data

- Inside the `App.js` file create a `componentDidMount` Lifecycle hook and use the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to get the users data from the local users api running from previous step.
- Update the component`s state with the fetched user list.
  ```jsx
    async componentDidMount(){

        const users = await fetch(API_URL)
        .then((res) =>  res.json());

        this.setState({ users });

    }
  ``` 

  ## Step 5

  - update the `App.js` file `saveUser` handler to update the user on the server and update the list upon a succesfull response.
```jsx
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
```





    




