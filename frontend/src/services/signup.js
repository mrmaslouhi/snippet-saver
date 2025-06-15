import axios from 'axios'
const baseUrl = 'http://localhost:3001/users'

const signup = async credentials => {
    const res = await axios.post(baseUrl, credentials)
    return res.data
}

export default { signup }