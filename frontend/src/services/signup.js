import axios from 'axios'
const baseUrl = 'http://localhost:3001/users'

const signup = async credentials => {
    const res = await axios.post(baseUrl, credentials)
    return res.data
}

const getSnippetsByUserId = async id => {
    const req = await axios.get(`${baseUrl}/${id}`)
    return req.data
}

export default { signup, getSnippetsByUserId }