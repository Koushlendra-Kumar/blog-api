const { body, validationResult } = require('express-validator');

const BlogModel = require('../models/Blog');

exports.get_blogs = (req, res, next) => {
    BlogModel.find({}, function(err, docs) {
        if(err) {
            res.status(500).json({msg: 'Error finding Blogs!!'})
        } else {
            res.status(200).json({msg: 'All blogs', docs})
        }
    })
}

exports.post_blog = [
    body('title', 'Title is required').isLength({ min: 1 }).trim().escape(),
    body('content', 'Content length should be 20.').isLength({ min: 20}).trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        let newBlog = new BlogModel({
            title: req.body.title,
            content: req.body.content
        })

        if(errors.isEmpty()) {
            newBlog.save((err) => {
                if(err) {
                    res.status(500).json({msg: 'Error saving new Blog!!', err})
                }
                res.status(200).json({msg: 'New Blog saved successfully.'})
            })
        } else {
            res.status(500).json({msg: 'Error validating input!!', err: errors.array()})
        }
}]

exports.delete_blog = (req, res, next) => {
    BlogModel.findByIdAndDelete(req.params.id).exec(function(err, docs){
        if(err) {
            res.status(500).json({msg: 'Error deleting this blog!!'})
        }
        res.status(200).json({msg: 'Blog deleted successfully.'})
    }) 
}

exports.update_blog = [
    body('title', 'Title is required').trim().isLength({ min: 1 }).escape(),
    body('content', 'Content must be of length 20').trim().isLength({ min: 1 }).escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        let update = {
            title: req.body.title,
            content: req.body.content
        }
        if(errors.isEmpty()){
           BlogModel.findByIdAndUpdate(req.params.id, update).exec(function(err, docs) {
                if(err){
                    res.status(500).json({msg: 'Error update blog in database!', err})
                } else {
                    res.status(200).json({msg: 'Blog updated successfully.'})
                }
            }) 
        } else {
            res.status(500).json({msg: 'Error validating input', err: errors.array()})
        }
}]