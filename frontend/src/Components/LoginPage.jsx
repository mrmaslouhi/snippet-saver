import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const LoginPage = ({ user, username, setUsername, password, setPassword, handleLogin }) => {
    const navigate = useNavigate()
    console.log('rendered component')
    {
        if (user) {
            useEffect(() => navigate('/save-page'), [])
        } else {
            return (
                <>
                    <h1>Log in in to your account</h1>
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
                        <button type="submit">Log up</button>
                    </form>
                </>
            )
        }
    }
}

export default LoginPage