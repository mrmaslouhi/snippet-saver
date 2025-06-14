const LoginPage = ({ user, username, setUsername, password, setPassword, handleLogin }) => {
    console.log('rendered component')
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
      </>
    )
}



export default LoginPage