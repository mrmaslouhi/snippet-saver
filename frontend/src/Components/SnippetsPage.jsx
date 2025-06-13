import { useState, useEffect } from 'react'
import snippetService from '../services/snippets'

const SnippetsPage = () => {
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
            <input type="text" placeholder="Search Your Snippets" />
            <div className="snippet-container">
                <div className="snippet-title">Title</div>
                {snippets.map(snippet => 
                    <div key={snippet.id} style={{ padding: 5, border: 1, borderStyle: 'solid', borderColor: 'black', fontFamily: 'monospace' }} className="snippet">
                        {snippet.title}
                        {snippet.code}
                    </div>
                )}
            </div>
        </>
    )
}

export default SnippetsPage