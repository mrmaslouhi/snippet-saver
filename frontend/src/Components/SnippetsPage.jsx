const SnippetsPage = () => {
    return (
        <>
            <h1>Welcome, User</h1>
            <input type="text" placeholder="Search Your Snippets" />
            <div className="snippet-container">
                <div className="snippet-title">Title</div>
                <div className="snippet">console.log('hello, world')</div>
            </div>
        </>
    )
}

export default SnippetsPage