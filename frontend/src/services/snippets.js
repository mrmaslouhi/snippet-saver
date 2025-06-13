import axios from 'axios'
const baseUrl = 'http://localhost:3001/snippets'

const getAllSnippets = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const saveSnippet = async newObject => {
    const request = await axios.post(baseUrl, newObject)
    return request.data
}

export default { saveSnippet, getAllSnippets }