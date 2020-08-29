import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './AddNote.css'
import { validateName, validateContent } from '../Utilities/Validator'
import notesApiService from '../../services/notes-api-service'
import ScribblesContext from '../../contexts/ScribblesContext'
import { ButtonBordered, BasicInput } from '../Utilities/Utilities'
import { NavLink } from 'react-router-dom'

export class AddNote extends Component {
  static contextType = ScribblesContext

  state = {
    error: null,
    nameError: null,
    contentError: null,
    name: {
      value: '',
      touched: false,
    },
    content: {
      value: '',
      touched: false,
    },
    folder: {
      value: 'None',
      touched: false,
    },
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: {
        value: e.target.value,
        touched: true,
      },
    })
  }

  handleAddNote = (e) => {
    e.preventDefault()
    const folderId = this.context.folders.find(
      (folder) => folder.name === this.state.folder.value
    ).id

    const nameError = validateName(this.state.name.value)
    if (nameError) {
      this.setState({ nameError: nameError })
      return
    }
    const contentError = validateContent(this.state.content.value)
    if (contentError) {
      this.setState({ contentError: contentError })
      return
    }

    this.setState({ error: null })

    const newNote = {
      name: this.state.name.value,
      content: this.state.content.value,
      folder_id: folderId,
    }

    notesApiService
      .postNote(newNote)
      .then((data) => {
        // clear input value
        this.setState({
          name: {
            value: '',
            touched: false,
          },
          content: {
            value: '',
            touched: false,
          },
          folderId: {
            value: 'None',
            touched: false,
          },
        })
        // redirect the user to home page
        this.props.history.push('/')

        // push to context
        this.context.addNote(data)
      })
      .catch((error) => {
        // set error message which will be displayed for user
        this.setState({ error: error.message })
      })
  }

  render() {
    const { folders } = this.context
    const options = folders.map((folder, i) => (
      <option value={folder.name} key={i}>
        {folder.name}
      </option>
    ))

    const nameError = validateName(this.state.name.value)
    const contentError = validateContent(this.state.content.value)

    return (
      <div className="AddNote">
        <NavLink to="/">
          <ButtonBordered light>go back</ButtonBordered>
        </NavLink>
        <article className="note-tile-full">
          <form onSubmit={this.handleAddNote}>
            <label htmlFor="name">name:</label>
            {this.state.name.touched && (
              <p className="error-msg">{nameError}</p>
            )}
            <BasicInput
              type="text"
              name="name"
              id="name"
              placeholder="name"
              value={this.state.name.value}
              onChange={this.handleChange}
              required
            />
            <label htmlFor="content">content:</label>
            {this.state.content.touched && (
              <p className="error-msg">{contentError}</p>
            )}
            <BasicInput
              type="text"
              name="content"
              id="content"
              placeholder="content"
              value={this.state.content.value}
              onChange={this.handleChange}
              required
            />
            <label htmlFor="content">folder:</label>
            <select
              className="SelectInput"
              id="folder"
              name="folder"
              onChange={this.handleChange}
              required
            >
              <option value="None">Select a folder...</option>
              {options}
            </select>
            {/* this shows error message if only spaces in title */}
            {this.state.error && (
              <p className="error-msg">{this.state.error}</p>
            )}
            <ButtonBordered>add note</ButtonBordered>
          </form>
        </article>
      </div>
    )
  }
}

export default AddNote

AddNote.propTypes = {
  context: PropTypes.shape({
    folders: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    addNote: PropTypes.func.isRequired,
  }),
  history: PropTypes.object.isRequired,
}
