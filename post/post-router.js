const express = require('express')
const router = express.Router()
const Post = require('../data/db')

router.post('/', (req, res) => {
    const postInfo = req.body
    if(!postInfo.title || !postInfo.contents){
        res.status(400).json({
            errorMessage: 'Please provide title and contents for the post'
        })
    }
    Post.insert(postInfo)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({
                errorMessage: 'Error adding to Posts'
            })
        })
})


router.post('/:id/comments', (req, res) => {
    const commentInfo = req.body
    const postId= req.params.id
    Post.findById(postId)
    .then(param =>{
        if(param.length === 0){
            res.status(404).json({
                errorMessage: 'The post with the specified ID does not exist'
            })
        }
       else if(commentInfo.text){
        console.log(commentInfo)
            Post.insertComment(commentInfo)
            .then(post =>{
                console.log(post)
                res.status(201).json(post)
            })
            .catch(err =>{
                res.status(500).json({
                    errorMessage:'There was an error while saving the comment to the database'
                })
            })
        }else{
        res.status(400).json({
            errorMessage:'Please provide text for the comment.'
        })
    }
    })
    .catch(err =>{
        res.status(500).json({
            errorMessage: 'oops'
        })
        console.log(err)
    })
})

router.get('/', (req, res) => {
    Post.find()
    .then(param =>{
        res.status(200).json(param)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            errorMessage: 'The posts information could not be retrieved'
        })
    })
})

router.get('/:id', (req, res) => {
    Post.findById(req.param.id)
    .then(param =>{
        if(param){
            res.status(200).json(param)
        }else{
            res.status(404).json({
                errorMessage: 'The post with the specified ID does not exist'
            })
        }
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            errorMessage: 'The post information could not be retrieved'
        })
    })
})

router.get('/:id/comments', (req, res) => {
    
})


module.exports = router