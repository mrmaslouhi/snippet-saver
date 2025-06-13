import { useState, useEffect } from 'react'
import snippetService from '../services/snippets'

const SnippetsPage = ({ searchKeyword, setSearchKeyword }) => {
    const [snippets, setSnippets] = useState([])
    useEffect(() => {
        const getSnippets = async () => {
            const data = await snippetService.getAllSnippets()
            setSnippets(data)
        } // AI Code
        getSnippets()
    }, [])

    return (
        <>
            <h1>Welcome, User</h1>
            <input type="text"
             placeholder="Search Your Snippets"
             onChange={({ target }) => setSearchKeyword(target.value)} />
            <div className="snippet-container">
                <div className="snippet-title">Title</div>
                {searchKeyword === '' ?
                snippets.map(snippet => 
                    <div key={snippet.id} style={{ padding: 5, border: 1, borderStyle: 'solid', borderColor: 'black', fontFamily: 'monospace' }} className="snippet">
                        {snippet.title}
                        {snippet.code}
                    </div>
                ) : 
                snippets.map(snippet => snippet.code.toLowerCase().includes(searchKeyword.toLowerCase()) ? 
            <div key={snippet.id}>
                {snippet.title}
                <br />
                <hr />
                {snippet.code}
            </div> : '')}
            </div>
        </>
    )
}

export default SnippetsPage