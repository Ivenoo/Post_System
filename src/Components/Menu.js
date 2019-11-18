import React from 'react';
import '../Styles/Menu.css';
import UsersList from './UsersList.js';
import PostsList from './PostsList.js';

const Menu = (props) => {

    return (
      <div className="menu">
        <div className="menu__user-list-button">
        <button onClick={() =>{props.usersListComponent(<UsersList loaderOn={props.loaderOn} loaderOff={props.loaderOff} userView={props.userView} token={props.token}/>,'UserList')}} className="selection-button"> USERS </button>
        </div>
        <div className="menu__info-user">
        </div>
        <div className="menu__post-list-button">
          <button onClick={() =>{props.usersListComponent(<PostsList postListButton='0' loaderOn={props.loaderOn} loaderOff={props.loaderOff}  token={props.token}/>,'PostList')}} className="selection-button"> POSTS </button>
        </div>

      </div>

    );
}

export default Menu;
