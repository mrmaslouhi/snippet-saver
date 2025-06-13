import axios from 'axios'
const baseUrl = 'http://localhost:3001/users'

const login = async credentials => {
    const request = axios.post(baseUrl, credentials)
    return request.data
}

export default { login }