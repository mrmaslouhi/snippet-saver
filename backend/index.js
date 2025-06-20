const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Snippet = require('./models/snippet') // Change this later
require('dotenv').config()
const bcryptjs = require('bcryptjs')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const url = process.env.MONGODB_URI

mongoose.connect(url)

app.use(cors())
app.use(express.json())

app.get('/snippets', async (req, res) => {
    const snippets = await Snippet.find({}).populate('user', { username: 1})
    res.json(snippets)
})

app.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
        .populate('snippets', { title: 1, code: 1 })
    if (user) {
        res.json(user)
    } else {
        res.status(404).end()
    }
})

app.post('/snippets', async (req, res) => {
        const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        req.token = authorization.replace('Bearer ', '')
    } else {
        req.token = null
    }

    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        req.decodedToken = decodedToken
    } catch (error) {
        req.decodedToken = null
    }
    const body = req.body
    const user = await User.findById(req.decodedToken.id)
    const snippet = new Snippet({
        title: body.title,
        code: body.code,
        user: user.id
    })

    console.log('Saved successfully')
    const savedSnippet = await snippet.save()
    user.snippets = user.snippets.concat(savedSnippet._id)
    await user.save()
    res.status(200).json(savedSnippet)
})

app.post('/users', async (req, res) => {
    const { username, password } = req.body
    if (password.length < 3) {
        return res.status(400).json({ error: 'password must be a minimum of 3 letters'})
    }

    const saltRounds = 10
    const passwordHash = await bcryptjs.hash(password, saltRounds)
    
    const user = new User({
        username, passwordHash
    })

    await user.save()
    const userWorthyOfToken = {
        username: user.username,
        id: user._id
    }
    
    const token = jwt.sign(userWorthyOfToken, process.env.SECRET)
    console.log('Signed up successfully, this is user', user)
    res.status(200)
    .send({ token, ...userWorthyOfToken})
})

app.get('/users', async (req, res) => {
    const users = await User.find({}).populate('snippets', { title: 1, code: 1 })
    res.status(200).json(users)
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    const isPasswordCorrect = user === null 
    ? false
    : await bcryptjs.compare(password, user.passwordHash)

    if (!(user && isPasswordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userWorthyOfToken = {
        username: user.username,
        id: user._id
    }
    
    const token = jwt.sign(userWorthyOfToken, process.env.SECRET)
    console.log('Logged in successfully, this is user', user)
    res.status(200)
    .send({ token, ...userWorthyOfToken})
})


const port = process.env.PORT

app.listen(port, () => {
    console.log('Server is running on port', port)
})

