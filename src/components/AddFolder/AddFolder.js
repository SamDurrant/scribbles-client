import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './AddFolder.css'
import { NavLink } from 'react-router-dom'
import ScribblesContext from '../../contexts/ScribblesContext'
import foldersApiService from '../../services/folders-api-service'
import { ButtonBordered, BasicInput } from '../Utilities/Utilities'
import { validateName } from '../Utilities/Validator'

export class AddFolder extends Component {
  static contextType = ScribblesContext
  state = {
    error: null,
  }

  handleAddFolder = (e) => {
    e.preventDefault()
    const { name } = e.target
    const err = validateName(name.value)
    if (err) {
      this.setState({ error: err })
      return
    }
    this.setState({ error: null })

    const newFolder = {
      name: name.value,
    }

    foldersApiService
      .postFolder(newFolder)
      .then((data) => {
        // clear input value
        name.value = ''
        // redirect the user to home page
        this.props.history.push('/')
        // push to context
        this.context.addFolder(data)
      })
      .catch((error) => {
        // set error message which will be displayed for user
        this.setState({ error: error.message })
      })
  }

  render() {
    return (
      <div className="AddFolder">
        <NavLink to="/">
          <ButtonBordered>go back</ButtonBordered>
        </NavLink>
        <form onSubmit={this.handleAddFolder}>
          <label htmlFor="name">name:</label>
          <BasicInput
            type="text"
            name="name"
            id="name"
            placeholder="name"
            required
          />
          {/* this shows error message if only spaces in title */}
          {this.state.error && <p className="error-msg">{this.state.error}</p>}
          <ButtonBordered>add</ButtonBordered>
        </form>
      </div>
    )
  }
}

export default AddFolder

AddFolder.propTypes = {
  context: PropTypes.shape({
    addFolder: PropTypes.func.isRequired,
  }),
  history: PropTypes.object.isRequired,
}
