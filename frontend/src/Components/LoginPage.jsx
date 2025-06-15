import { Link } from 'react-router-dom'

const LoginPage = ({ username, setUsername, password, setPassword, handleLogin }) => {
    console.log('loginpage rendered!')
    return (
      <>
        <h1>Log in to your account</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username</label>
          <input type="text"
            placeholder="Enter your username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required />
          <label htmlFor="password">Password</label>
          <input type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required />
          <button type="submit">Log in</button>
        </form>
        <p>Don't have an account?</p>
        <Link to="/signup-page">Sign up</Link>
      </>
    )
}



export default LoginPage