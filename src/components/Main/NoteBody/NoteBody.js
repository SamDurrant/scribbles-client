import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import './NoteBody.css'
import ScribblesContext from '../../../contexts/ScribblesContext'
import { ButtonBordered } from '../../Utilities/Utilities'

export class NoteBody extends Component {
  static contextType = ScribblesContext

  handleDelete = (noteId) => {
    this.context.deleteNote(noteId)
    this.props.history.push('/')
  }

  componentDidMount() {
    const pageNote = this.context.findNote(
      parseInt(this.props.match.params.noteId)
    )

    if (!pageNote) {
      this.props.history.push('/')
    }
  }

  render() {
    const { findNote } = this.context
    const pageNote = findNote(parseInt(this.props.match.params.noteId)) || null

    if (!pageNote) {
      this.props.history.push('/')
    }
    const date = moment(pageNote.date_created).format('MMM  Do YYYY') || null

    return (
      <div className="NoteBody">
        <article className="note-tile-full">
          <h3>{pageNote.name}</h3>
          {date}
        </article>
        <p>{pageNote.content}</p>
        <ButtonBordered light onClick={() => this.handleDelete(pageNote.id)}>
          delete
        </ButtonBordered>
      </div>
    )
  }
}

export default NoteBody

NoteBody.propTypes = {
  context: PropTypes.shape({
    findNote: PropTypes.func.isRequired,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      noteId: PropTypes.string.isRequired,
    }),
  }),
  history: PropTypes.object.isRequired,
}
