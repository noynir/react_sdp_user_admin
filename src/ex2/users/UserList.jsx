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