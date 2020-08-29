var fs = require('fs')

const components = [
  'App',
  'MainSidebar',
  'MainBody',
  'NoteSidebar',
  'NoteBody',
  'FolderForm',
  'NoteForm',
  'Utilities',
  'Nav',
]

components.forEach((component) => {
  fs.mkdir(`components/${component}`, function (err) {
    if (err) throw err
    console.log('Directory created successfully!')
  })
})

const test = false

components.forEach((component) => {
  fs.appendFile(
    `components/${component}/${component}.js`,
    `import React, { Component } from 'react';
    import './${component}.css';

    export class ${component} extends Component {
      render() {
        return (
          <div className='${component}'>
            ${component}
          </div>
        );
      }
    }

    export default ${component};`,
    function (err) {
      if (err) throw err
      console.log('File created successfully!')
    }
  )

  if (test) {
    fs.appendFile(`components/${component}/${component}.test.js`, '', function (
      err
    ) {
      if (err) throw err
      console.log('Saved!')
    })
  }

  fs.appendFile(`components/${component}/${component}.css`, '', function (err) {
    if (err) throw err
    console.log('Saved!')
  })
})
