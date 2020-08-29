import React, { Component } from 'react'

const ScribblesContext = React.createContext({
  folders: [],
  notes: [],
  error: null,
})

export default ScribblesContext

export class ScribblesProvider extends Component {
  state = {
    folders: [],
    notes: [],
    error: null,
  }

  setFolderList = (folders) => {
    this.setState({ folders })
  }

  findFolder = (folderId) => {
    return this.state.folders.find((folder) => folder.id === folderId)
  }

  addFolder = (newFolder) => {
    this.setState({ folders: [...this.state.folders, newFolder] })
  }

  deleteFolder = (folderId) => {
    const filteredFolders = this.state.folders.filter(
      (folder) => folder.id !== folderId
    )
    this.setState({ folders: filteredFolders })
  }

  editFolder = (editedFolder) => {
    const newFolders = this.state.folders.map((folder) => {
      if (folder.id === editedFolder.id) {
        return {
          ...folder,
          ...editedFolder,
        }
      } else {
        return folder
      }
    })
    this.setState({ folders: newFolders })
  }

  setNoteList = (notes) => {
    this.setState({ notes })
  }

  findNote = (noteId) => {
    console.log(this.state.notes.find((note) => note.id === noteId))
    return this.state.notes.find((note) => note.id === noteId)
  }

  addNote = (newNote) => {
    this.setState({ notes: [...this.state.notes, newNote] })
  }

  deleteNote = (noteId) => {
    const filteredNotes = this.state.notes.filter((note) => note.id !== noteId)
    this.setState({ notes: filteredNotes })
  }

  deleteFolderNotes = (folderId) => {
    const filteredNotes = this.state.notes.filter(
      (note) => note.folderId !== folderId
    )

    this.setState({ notes: filteredNotes })
  }

  editNote = (editedNote) => {
    const newNotes = this.state.notes.map((note) => {
      if (note.id === editedNote.id) {
        return {
          ...note,
          ...editedNote,
        }
      } else {
        return note
      }
    })
    this.setState({ notes: newNotes })
  }

  render() {
    const value = {
      folders: this.state.folders,
      setFolderList: this.setFolderList,
      findFolder: this.findFolder,
      addFolder: this.addFolder,
      deleteFolder: this.deleteFolder,
      editFolder: this.editFolder,
      notes: this.state.notes,
      setNoteList: this.setNoteList,
      findNote: this.findNote,
      addNote: this.addNote,
      deleteNote: this.deleteNote,
      deleteFolderNotes: this.deleteFolderNotes,
      editNote: this.editNote,
    }

    return (
      <ScribblesContext.Provider value={value}>
        {this.props.children}
      </ScribblesContext.Provider>
    )
  }
}
