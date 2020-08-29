import React from 'react'

export const validateName = (nameInput) => {
  const name = nameInput.trim()
  if (name.length === 0) {
    return 'Name is required'
  } else if (name.length < 3) {
    return 'Name must be at least 3 characters long'
  }
}

export const validatePassword = (passwordInput) => {
  const password = passwordInput.trim()
  if (password.length === 0) {
    return 'Password is required'
  } else if (password.length < 6 || password.length > 72) {
    return 'Password must be between 6 and 72 characters long'
  } else if (!password.match(/[0-9]/)) {
    return 'Password must contain at least one number'
  }
}

export const validateRepeatPassword = (passwordInput, passwordMatch) => {
  if (passwordInput.trim() !== passwordMatch.trim()) {
    return 'Passwords do not match'
  }
}

export const validateContent = (contentInput) => {
  const content = contentInput.trim()
  if (content.length === 0) {
    return 'Without content, note cannot exist'
  }
}

export const ValidationError = (message) => {
  if (message) {
    return <div className="error">{message}</div>
  }

  return <></>
}
// <ValidationError message={Validator.validateName(name)}/>
