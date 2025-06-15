import { useEffect, useState } from 'react';
import SavePage from './Components/SavePage'
import SnippetsPage from './Components/SnippetsPage';
import SignUpPage from './Components/SignUpPage';
import LoginPage from './Components/LoginPage'
import snippetService from './services/snippets'
import signupService from './services/signup'
import loginService from './services/login'
import { 
  Routes, Route, useNavigate, Navigate
} from 'react-router-dom'
import './style.css';

const App = () => {
  const [code, setCode] = useState(`<h1>Asalamu Alaykum!</h1>`)
  const [selectedValue, setSelectedValue] = useState('')
  const [title, setTitle] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      try {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      snippetService.setToken(user.token)
      } catch (error) {
        console.log('An error happend while fetching user', error)
      }
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      snippetService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem(
      'loggedUser', JSON.stringify(user)
    )
      setUsername('')
      setPassword('')
      navigate('/save-page')
    }
    catch (error) {
      console.error('Login fail',error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    navigate('/login-page')
  }

  const handleSignUp = () => console.log('react')

  return (
    <>
      <nav>Navigation</nav>
      <Routes>
        <Route path="signup-page" element={!user ? <SignUpPage user={user} handleSignUp={handleSignUp} username={username} password={password} setPassword={setPassword} setUsername={setUsername}  /> : <Navigate replace to={'/save-page'} />} />
        <Route path="/snippets" element={user ? <SnippetsPage user={user} setSearchKeyword={setSearchKeyword} searchKeyword={searchKeyword} /> : <Navigate replace to={"/login-page"} />} />
        <Route path="/save-page" element={user ? <SavePage handleLogout={handleLogout} user={user} setTitle={setTitle} setCode={setCode} handleSelectChange={handleSelectChange} handleSave={handleSave} selectedValue={selectedValue} title={title} code={code} /> : <Navigate replace to={"/login-page"} />} />
        <Route path="/login-page" element={!user ?  <LoginPage user={user} handleLogin={handleLogin} username={username} password={password} setPassword={setPassword} setUsername={setUsername}/> : <Navigate replace to={'/save-page'} />} />
      </Routes>
      <footer>1447, Snippet-Saver</footer>
    </>
  );
}

export default App
