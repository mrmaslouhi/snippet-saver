import { useState } from 'react';
import SavePage from './Components/SavePage'
import SnippetsPage from './Components/SnippetsPage';
import snippetService from './services/snippets'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import './style.css';

const App = () => {
  const [code, setCode] = useState(`<h1>Asalamu Alaykum!</h1>`)
  const [selectedValue, setSelectedValue] = useState('')
  const [title, setTitle] = useState('')
  
  const handleSelectChange = event => setSelectedValue(event.target.value)

  const handleSave = (event) => {
    event.preventDefault()
    snippetService.saveSnippet({
      title, code
    })
    setTitle('')
    setCode('')  
  }

  return (
    <Router>
      <nav>Navigation</nav>

      <Routes>
        <Route path="/save-page" element={<SavePage handleSelectChange={handleSelectChange} handleSave={handleSave} selectedValue={selectedValue} title={title} code={code} />} />
        <Route path="/snippets" element={<SnippetsPage />} />
      </Routes>
      <footer>1447, Snippet-Saver</footer>
    </Router>
  );
}

export default App
