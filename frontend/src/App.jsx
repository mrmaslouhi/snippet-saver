import { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/themes/prism.css';
import prismLanguages from './prismLanguages';
import './style.css'


const App = () => {
  const [code, setCode] = useState(
    `console.log("Hello, World!")`
  )

  return (
    <>
      <label htmlFor='lang'>Language</label>
      <select name='lang' id='lang'>
        {Object.entries(prismLanguages).map()}
      </select>
      <Editor
        className='code-input'
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => highlight(code, languages.markup)}
        padding={12}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
    </>

  );
}

export default App
