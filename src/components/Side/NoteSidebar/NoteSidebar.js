import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NoteSidebar.css'
import ScribblesContext from '../../../contexts/ScribblesContext'
import { ButtonBordered } from '../../Utilities/Utilities'

export class NoteSidebar extends Component {
  static contextType = ScribblesContext

  goBack = () => {
    this.props.history.goBack()
  }

  render() {
    const { findNote, findFolder } = this.context
    let pageNote = findNote(this.props.match.params.noteId) || ''
    let pageFolder = findFolder(pageNote.folderId) || ''

    return (
      <div className="NoteSidebar">
        <p className="nav-tile-lg">{pageFolder.name}</p>
        <ButtonBordered onClick={this.goBack}>back</ButtonBordered>
      </div>
    )
  }
}

export default NoteSidebar

NoteSidebar.propTypes = {
  context: PropTypes.shape({
    findNote: PropTypes.func.isRequired,
    findFolder: PropTypes.func.isRequired,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      noteId: PropTypes.string.isRequired,
    }),
  }),
  history: PropTypes.object.isRequired,
}
