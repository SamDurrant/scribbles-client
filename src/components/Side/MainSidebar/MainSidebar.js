import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './MainSidebar.css'
import { NavLink } from 'react-router-dom'
import ScribblesContext from '../../../contexts/ScribblesContext'
import { ButtonBordered } from '../../Utilities/Utilities'

export class MainSidebar extends Component {
  static contextType = ScribblesContext

  renderNavTiles = (tiles) => {
    return tiles.map((tile, i) => (
      <NavLink key={i} to={`/folder/${tile.id}`} className="nav-tile">
        {tile.name}
      </NavLink>
    ))
  }

  render() {
    const { folders } = this.context

    return (
      <div className="MainSidebar">
        <div className="sidebar-button">
          <NavLink to="/add-folder">
            <ButtonBordered>add folder</ButtonBordered>
          </NavLink>
        </div>
        <div className="sidebar-tiles">{this.renderNavTiles(folders)}</div>
      </div>
    )
  }
}

export default MainSidebar

MainSidebar.propTypes = {
  context: PropTypes.shape({
    folders: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired
    ),
  }),
}
