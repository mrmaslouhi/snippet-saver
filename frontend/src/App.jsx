import { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import './style.css'
import Dropdown from './Components/Dropdown';


const App = () => {
  const [code, setCode] = useState(
    `<h1>Asalamu Alaykum!</h1>`
  )
  const [selectedValue, setSelectedValue] = useState('')
  // const [isLangLoading, setIsLangLoading] = useState(false)

  const handleSelectChange = (event) => {
    return setSelectedValue(event.target.value)
  }

  // useEffect(() => {
  //   console.log('effect ran')
  //   const langImport = async () => {
  //     if (selectedValue) {
  //       console.log('This is selectedValue', selectedValue, 'the value of that one', isLangLoading)
  //       setIsLangLoading(true)
  //       await import(/* @vite-ignore */ `prismjs/components/prism-${selectedValue}`)
  //       setIsLangLoading(false)
  //     }
  //   }
  //   langImport()
  // }, [selectedValue])


return (
  <>
    <Dropdown
      selectedValue={selectedValue}
      handleSelectChange={handleSelectChange}
    />
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
  </>

);
}

export default App
