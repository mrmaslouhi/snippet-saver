import axios from 'axios'
const baseUrl = 'http://localhost:3001/login'

const login = async (credentials) => {
    const res = await axios.post(baseUrl, credentials)
    console.log('This is the response in login service', res.data)
    return res.data
}

export default { login }