const express = require('express')

const server = express()

const postRouter = require('../post/post-router.js')


server.use(express.json())

server.get('/', (req, res) =>{
    const query = req.query

    console.log(query)

    res.status(200).json(query)
})

server.use('/api/posts', postRouter)

module.exports = server