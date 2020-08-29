import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import './MainBody.css'
import ScribblesContext from '../../../contexts/ScribblesContext'
import { ButtonBordered } from '../../Utilities/Utilities'

export class MainBody extends Component {
  static contextType = ScribblesContext

  renderNoteTiles = (notes) => {
    return notes.map((note, i) => {
      let date = moment(note.date_created).format('MMM  Do YYYY')
      return (
        <article key={i} className="note-tile">
          <div>
            <Link to={`/note/${note.id}`}>{note.name}</Link>
            <p className="note-tile-date">{date}</p>
          </div>
        </article>
      )
    })
  }

  render() {
    const { notes } = this.context

    let pageNotes
    if (this.props.match.params.folderId) {
      pageNotes = notes.filter(
        (note) => note.folder_id === parseInt(this.props.match.params.folderId)
      )
    } else {
      pageNotes = notes
    }
    return (
      <div className="MainBody">
        <div className="btn-box">
          <NavLink to="/add-note">
            <ButtonBordered light>add note</ButtonBordered>
          </NavLink>
        </div>
        {this.renderNoteTiles(pageNotes)}
      </div>
    )
  }
}

export default MainBody

MainBody.propTypes = {
  context: PropTypes.shape({
    notes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        folder_id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        date_created: PropTypes.string.isRequired,
      }).isRequired
    ),
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      folderId: PropTypes.string,
    }),
  }),
}
