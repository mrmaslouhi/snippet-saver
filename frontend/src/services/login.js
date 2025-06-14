import axios from 'axios'
const baseUrl = 'http://localhost:3001/login'

const login = async (credentials) => {
    const res = await axios.post(baseUrl, credentials)
    return res.data
}

export default { login }