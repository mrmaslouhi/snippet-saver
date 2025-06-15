const SignUpPage = ({ handleSignUp, username, setUsername, password, setPassword }) => {
    return (
        <form onSubmit={handleSignUp}>
            <h1>Sign up for an account</h1>
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
            <button type="submit">Sign up</button>
        </form>
    )
}

export default SignUpPage