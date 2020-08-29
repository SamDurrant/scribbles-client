import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <h2>could not display this item</h2>
    }
    return this.props.children
  }
}
