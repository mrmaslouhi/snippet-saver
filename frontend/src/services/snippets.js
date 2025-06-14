import axios from 'axios'
const baseUrl = 'http://localhost:3001/snippets'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAllSnippets = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const saveSnippet = async newObject => {
    const config = {
        headers: { Authorization: token }
    }

    const request = await axios.post(baseUrl, newObject, config)
    return request.data
}

export default { saveSnippet, getAllSnippets, setToken }