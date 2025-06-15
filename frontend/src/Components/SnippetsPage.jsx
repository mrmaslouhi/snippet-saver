import { useState, useEffect } from 'react'
import signupService from '../services/signup' // Ghayr hadha mn ba3do inshaAllah

const SnippetsPage = ({ user, searchKeyword, setSearchKeyword }) => {
    const [snippets, setSnippets] = useState([])
    useEffect(() => {
        const getSnippets = async () => {
            const data = await signupService.getSnippetsByUserId(user.id)
            setSnippets(data.snippets)
        } // AI Code
        getSnippets()
    }, [])
    return (
        <>
            <h1>Welcome, {user.username}</h1>
            <input type="text"
             placeholder="Search Your Snippets"
             onChange={({ target }) => setSearchKeyword(target.value)} />
            <div className="snippet-container">
                <div className="snippet-title">Title</div>
                {searchKeyword === '' ?
                snippets.map(snippet => 
                    <div key={snippet.id} style={{ padding: 5, border: 1, borderStyle: 'solid', borderColor: 'black', fontFamily: 'monospace' }} className="snippet">
                        {snippet.title}
                        <br />
                        {snippet.code}
                    </div>
                ) : 
                snippets.map(snippet => snippet.code.toLowerCase().includes(searchKeyword.toLowerCase()) ? 
                    <div key={snippet.id} style={{ padding: 5, border: 1, borderStyle: 'solid', borderColor: 'black', fontFamily: 'monospace' }} className="snippet">
                        {snippet.title}
                        <br />
                        {snippet.code}
                    </div> 
                    : '')}
            </div>
        </>
    )
}

export default SnippetsPage