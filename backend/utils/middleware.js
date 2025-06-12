const requestLogger = (req, res, next) => {
    console.log('Method:', request.method)
    console.log('Path:', request.path)
    console.log('Body:', request.body)
    console.log('---------')
    next()
}

const unknownRoute = (req, res) => {
    response.status(404).send({ error: '404 Unknown endpoint' })
}

module.exports = {
    requestLogger, unknownRoute
}