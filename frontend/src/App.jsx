import { useEffect, useState } from 'react';
import SavePage from './Components/SavePage'
import SnippetsPage from './Components/SnippetsPage';
import SignUpPage from './Components/SignUpPage';
import LoginPage from './Components/LoginPage'
import snippetService from './services/snippets'
import signupService from './services/signup'
import { 
  Routes, Route, useNavigate 
} from 'react-router-dom'
import './style.css';

const App = () => {
  const [code, setCode] = useState(`<h1>Asalamu Alaykum!</h1>`)
  const [selectedValue, setSelectedValue] = useState('')
  const [title, setTitle] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('Real Value')
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log(user)
      snippetService.setToken(user.token)
    }
  }, [])
  
  const handleSelectChange = event => setSelectedValue(event.target.value)

  const handleSave = (event) => {
    event.preventDefault()
    snippetService.saveSnippet({
      title, code
    })
    setTitle('')
    setCode('')
    navigate('/snippets')
  }

  const handleSignUp = async (event) => {
    event.preventDefault()
    const user = await signupService.signup({
      username, password
    })
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(user)
    )

    snippetService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
    navigate('/save-page')
  }

  return (
    <>
      <nav>Navigation</nav>
      <Routes>
        <Route path="signup-page" element={<SignUpPage user={user} handleSignUp={handleSignUp} username={username} password={password} setPassword={setPassword} setUsername={setUsername}  />} />
        <Route path="/save-page" element={<SavePage user={user} setTitle={setTitle} setCode={setCode} handleSelectChange={handleSelectChange} handleSave={handleSave} selectedValue={selectedValue} title={title} code={code} />} />
        <Route path="/snippets" element={<SnippetsPage setSearchKeyword={setSearchKeyword} searchKeyword={searchKeyword} />} />
        <Route path="/login-page" element={<LoginPage user={user} handleSignUp={handleSignUp} username={username} password={password} setPassword={setPassword} setUsername={setUsername}  />} />
      </Routes>
      <footer>1447, Snippet-Saver</footer>
    </>
  );
}

export default App
