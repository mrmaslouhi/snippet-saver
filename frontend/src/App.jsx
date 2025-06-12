import { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import './style.css'
import Dropdown from './Components/Dropdown';
import snippetService from './services/snippets'


const App = () => {
  const [code, setCode] = useState(
    `<h1>Asalamu Alaykum!</h1>`
  )
  const [selectedValue, setSelectedValue] = useState('')
  const [title, setTitle] = useState('')
  const handleSelectChange = (event) => {
    return setSelectedValue(event.target.value)
  }

  const handleSave = (event) => {
    event.preventDefault()
    snippetService.saveSnippet({
      title,
      code
    })
    setTitle('')
    setCode('')
    
  }

  return (
    <>
      <h1>Create a snippet</h1>
      <p>This information will be displayed publicly so be careful what you share. Ensure you are not sharing sensitve information or private information.</p>
      <form onSubmit={handleSave}>
        <label htmlFor="title">Title</label>
        <input
          placeholder='Enter title'
          name="title"
          id="title"
          onChange={({ target }) => setTitle(target.value)}
          value={title}
        />

        <Dropdown
          selectedValue={selectedValue}
          handleSelectChange={handleSelectChange}
        />
        <label htmlFor="editor">Code</label>
        <Editor
          className='code-input'
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => highlight(code, selectedValue ? languages[selectedValue] : languages.markup)}
          padding={12}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
        <button type='submit'>Save</button>
      </form>
    </>

  );
}

export default App
