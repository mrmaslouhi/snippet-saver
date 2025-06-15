import Dropdown from "./Dropdown"
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

const SavePage = ({ handleLogout, code, setCode, title, setTitle, selectedValue, handleSelectChange, handleSave }) => {
  return (
    <>
      <p>Log out</p>
      <button onClick={handleLogout}>Log out</button>
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
          required
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
          required
          />
        <button type='submit'>Save</button>
      </form>
    </>
  )
}

export default SavePage