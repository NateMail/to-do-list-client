import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link to="/change-password" className="head-link ch">Change Password</Link>
    <Link to="/sign-out" className="head-link out">Sign Out</Link>
    <Link to="/create-items" className="c-to-do">Create to-do</Link>
    <Link to="/items" className="items">To-Do</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up" className="head-link up">Sign Up</Link>
    <Link to="/sign-in" className="head-link in">Sign In</Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <h1>To-Do-List</h1>
    <nav>
      { user && <span>Welcome, {user.email}</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
    </nav>
  </header>
)

export default Header
