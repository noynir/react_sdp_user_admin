import React from 'react'
import './User.css';

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

export default User