import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const SignUpPage = ({ user, handleSignUp, username, setUsername, password, setPassword }) => {
    const navigate = useNavigate()
        if (user) {
            useEffect(() => navigate('/save-page'), [])
        } else {
        return (
            <form onSubmit={handleSignUp}>
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
}

export default SignUpPage