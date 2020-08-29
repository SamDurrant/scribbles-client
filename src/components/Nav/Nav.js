import React, { Component } from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'

export class Nav extends Component {
  render() {
    return (
      <div className="Nav">
        <Link to="/">
          <h1>Scribbles</h1>
        </Link>
      </div>
    )
  }
}

export default Nav
