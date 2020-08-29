import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import './App.css'
import ScribblesContext from '../../contexts/ScribblesContext'

// components
import { Sidebar, Main } from '../Utilities/Utilities'
import Nav from '../Nav/Nav'
import MainSideBar from '../Side/MainSidebar/MainSidebar'
import NoteSidebar from '../Side/NoteSidebar/NoteSidebar'
import MainBody from '../Main/MainBody/MainBody'
import NoteBody from '../Main/NoteBody/NoteBody'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import foldersApiService from '../../services/folders-api-service'
import notesApiService from '../../services/notes-api-service'

export class App extends Component {
  static contextType = ScribblesContext

  componentDidMount() {
    foldersApiService
      .getAllFolders()
      .then((res) => {
        this.context.setFolderList(res)
      })
      .catch((error) => {
        console.log(error)
      })

    notesApiService
      .getAllNotes()
      .then((res) => {
        this.context.setNoteList(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      // pass object to context
      <div className="App">
        <Nav />
        <Switch>
          <>
            <div className="App-content">
              <Sidebar>
                {['/', '/folder/:folderId'].map((path, i) => (
                  <Route exact key={i} path={path} component={MainSideBar} />
                ))}
                <Route exact path="/note/:noteId" component={NoteSidebar} />
                <Route exact path="/add-folder" component={AddFolder} />
              </Sidebar>
              <Main>
                {['/', '/folder/:folderId', '/add-folder'].map((path, i) => (
                  <Route exact key={i} path={path} component={MainBody} />
                ))}
                <Route exact path="/note/:noteId" component={NoteBody} />
                <Route exact path="/add-note" component={AddNote} />
              </Main>
            </div>
          </>
        </Switch>
      </div>
    )
  }
}

export default App

App.propTypes = {
  context: PropTypes.shape({
    folders: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    notes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        folderId: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      })
    ).isRequired,
    error: PropTypes.any.isRequired,
  }),
}
