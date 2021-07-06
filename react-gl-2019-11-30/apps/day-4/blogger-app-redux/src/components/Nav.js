import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <ul className="nav nav-pills mb-3 mt-2">
      <li className="nav-item">
        <NavLink exact className="nav-link" activeClassName="active" to="/">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" activeClassName="active" to="/posts">Posts</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" activeClassName="active" to="/new-post">New Post</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" activeClassName="active" to="/login">Login</NavLink>
      </li>
    </ul>
  );
};

export default Nav;
