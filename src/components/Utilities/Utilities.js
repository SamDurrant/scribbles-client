import React from 'react'
import './Utilities.css'

export function Sidebar({ className, ...props }) {
  const classes = ['Sidebar', className].filter(Boolean).join(' ')
  return <section className={classes} {...props} />
}

export function Main({ className, grid, ...props }) {
  const classes = ['Main', grid && 'Main--grid', className]
    .filter(Boolean)
    .join(' ')
  return <section className={classes} {...props} />
}

export function ButtonBordered({ className, light, ...props }) {
  const classes = ['Button', light && 'Button--light', className]
    .filter(Boolean)
    .join(' ')
  return <button className={classes} {...props} />
}

export function BasicInput({ className, ...props }) {
  const classes = ['BasicInput', className].filter(Boolean).join(' ')
  return <input className={classes} {...props} />
}
