import axios from 'axios'
const baseUrl = 'http://localhost:3001/snippets'

const getAllSnippets = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const saveSnippet = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

export default { saveSnippet, getAllSnippets }